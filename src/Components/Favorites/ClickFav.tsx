import { useState, useEffect } from "react";
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db, auth } from "../LogIn/fbase";
import {useRecoilState, useRecoilValue } from "recoil";
import { favlocationState, InfoState } from "recoil/atom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

interface Favorite {
  id: string;
  title: string;
  dong: string;
  link: string;
}
const FavoriteButton = styled.button`
  color: black;
  &:hover{
    cursor: pointer;
  }
`
const NoFavoriteButton = styled.button`
  color: #ffd700;
  &:hover{
    cursor: pointer;
  }
`
const ClickFav = () => {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const info = useRecoilValue(InfoState);
    const location = useLocation();
    const [favlocation,setfavlocation] = useRecoilState(favlocationState)
  const fetchData = async () => {
    setfavlocation(decodeURIComponent(location.pathname));
    if (!auth.currentUser) {
      return;
    }
    const userId = auth.currentUser.uid;
    const collectionRef = collection(db, "users", userId, "favorites");
    const querySnapshot = await getDocs(collectionRef);
    const favoritesData: Favorite[] = [];
    querySnapshot.forEach((doc) => {
      favoritesData.push({
        id: doc.id,
        title: doc.data().title,
        dong: doc.data().dong,
        link: doc.data().link
      });
    });
    setFavorites(favoritesData);
  };

  const addFavorite = async () => {
    if (!auth.currentUser) {
      return;
    }
    const userId = auth.currentUser.uid;
    const collectionRef = collection(db, "users", userId, "favorites");
    setfavlocation(decodeURIComponent(location.pathname));
    try {
      const docRef = await addDoc(collectionRef, { title: info[0].아파트, dong: info[0].법정동,link: favlocation });
      const newFavorite: Favorite = {
        id: docRef.id,
        title: info[0].아파트,
        dong: info[0].법정동,
        link: favlocation
      };
      setFavorites([...favorites, newFavorite]);
    } catch (error) {
      console.error("문서 추가 중 오류가 발생했습니다:", error);
    }
  };

  const deleteFavorite = async (id: string) => {
    if (!auth.currentUser) {
      return;
    }
    const userId = auth.currentUser.uid;
    const favoriteRef = doc(db, "users", userId, "favorites", id);
    try {
      await deleteDoc(favoriteRef);
      const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
      setFavorites(updatedFavorites);
      
    } catch (error) {
      console.error("문서 삭제 중 오류가 발생했습니다:", error);
    }
  };
  const sameFavApart = favorites.filter((favorite) => favorite.title === info[0].아파트);

  useEffect(() => {
    if (auth.currentUser) {
      fetchData();
    }
  }, [fetchData]);

  return (
    <div>
      {sameFavApart.length !== 1 ? (
        <FavoriteButton onClick={addFavorite}><FontAwesomeIcon icon={farStar} /></FavoriteButton>
      ) : (
          <NoFavoriteButton onClick={() => {
            deleteFavorite(sameFavApart[0].id);
        }}><FontAwesomeIcon icon={fasStar} /></NoFavoriteButton>
      )}
    </div>
  );
};

export default ClickFav;