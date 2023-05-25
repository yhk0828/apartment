import styled from "styled-components";
import "./Home.css";
import Top from "../Components/Top";
import { useRecoilValue } from 'recoil';
import {dataState,isLoadingState, isLoggedInState2} from '../recoil/atom';
import Bottom from "../Components/bottom";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import InfoBottom from "../Components/InfoBottom";
import LoginForm from "../Components/LogIn/LoginForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretDown} from "@fortawesome/free-solid-svg-icons";
import Myinfo from "./Myinfo";
import MapApi from "../Components/MapApi";

declare global {
  interface Window {
    kakao: any;
  }
}

const Loading = styled.div`
  text-align: center;
  font-size: 30px;
  color: black;
`;

const Sidebar = styled.div`
  width: 400px;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  background-color: white;
  color: black;
`;

const MyInfo = styled.div`
  position: fixed;
  right: 30px;
  top: 30px;
  z-index: 10;
  width: 30px;
  height: 30px;
  font-size: 24px;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

function Home() {
  const isLoading = useRecoilValue(isLoadingState);
  const data = useRecoilValue(dataState);
  const isLoggedIn2 = useRecoilValue(isLoggedInState2);
  const navigate = useNavigate();

  function ControlMyinfo() {
    if (isLoggedIn2 === false) {
      navigate("/Login");
    } else if (isLoggedIn2 === true) {
      navigate("/MyInfo");
    }
  }
  return (
    <>
      {data && isLoading ? (
        <Loading>정보를 불러오는 중</Loading>
      ) : (
        <>
        <Sidebar>
            <Top></Top>
          <Routes>
            <Route path="/" element={<div />} />
            <Route path="/MyInfo" element={<Myinfo />} />
            <Route path="/Login" element={<LoginForm />} />
            <Route path="/search/:kkeyword" element={<Bottom/>} />
            <Route path="/search/:kkeyword/:iindex" element={<InfoBottom />} />
            <Route path="/search/:kkeyword/:iindex/:key" element={<InfoBottom />} />
            <Route path="*" element={<div>경로가 틀렸습니다.</div>} />
          </Routes>
        </Sidebar>
          <MyInfo onClick={ControlMyinfo}><FontAwesomeIcon icon={faSquareCaretDown} /></MyInfo>
          <MapApi></MapApi>
        </>
      )}
    </>
  );
}

export default Home;