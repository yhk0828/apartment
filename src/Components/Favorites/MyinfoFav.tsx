import { useState, useEffect, useCallback } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db, auth } from "../LogIn/fbase";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { favlocationState } from "recoil/atom";
import { useNavigate } from "react-router-dom";

interface Favorite {
  id: string;
  title: string;
  dong: string;
  link: string;
}

const FavoriteContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 15px;
`;

const Favoritedong = styled.div`
  width: 20%;
`;

const Favoritetitle = styled.div`
  text-align: left;
  width: 70%;
  &:hover {
    cursor: pointer;
  }
`;

const Favoritedelete = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const MyinfoFav = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const favlocation = useRecoilValue(favlocationState);
  const navigate = useNavigate();

  const fetchData = useCallback(() => {
    if (!auth.currentUser) {
      return;
    }
    const userId = auth.currentUser.uid;
    const collectionRef = collection(db, "users", userId, "favorites");
    getDocs(collectionRef)
      .then((querySnapshot) => {
        const favoritesData: Favorite[] = [];
        querySnapshot.forEach((doc) => {
          favoritesData.push({
            id: doc.id,
            title: doc.data().title,
            dong: doc.data().dong,
            link: doc.data().link,
          });
        });
        setFavorites(favoritesData);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      });
  }, [favlocation]);

  const deleteFavorite = async (id: string) => {
    if (!auth.currentUser) {
      return;
    }
    const userId = auth.currentUser.uid;
    const favoriteRef = doc(db, "users", userId, "favorites", id);
    try {
      await deleteDoc(favoriteRef);
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.id !== id
      );
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("문서 삭제 중 오류가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      fetchData();
    }
  }, [fetchData]);

  return (
    <div>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            <FavoriteContainer>
              <Favoritedong>{favorite.dong}</Favoritedong>
              <Favoritetitle
                onClick={() => {
                  navigate(favorite.link);
                }}
              >
                {favorite.title}
              </Favoritetitle>
              <Favoritedelete onClick={() => deleteFavorite(favorite.id)}>
                <FontAwesomeIcon icon={faX} />
              </Favoritedelete>
            </FavoriteContainer>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyinfoFav;