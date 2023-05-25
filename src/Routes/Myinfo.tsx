import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { emailState, isLoggedInState2, passwordState } from "recoil/atom";
import { signOut } from "firebase/auth";
import { auth } from "../Components/LogIn/fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import MyinfoFav from "../Components/Favorites/MyinfoFav";

const MContainer = styled.div`
  width: 400px;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  background-color: white;
  color: black;
  background-color whitesmoke;
`;
const MTop = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  padding: 10px;
  text-align: center;
  justify-content: space-between;
  background-color: white;
  font-size: 18px;
  font-weight: 700;
  & > * {
    padding-top: 20px;
  }
`;
const MTop11 = styled.div`
  margin-right: 160px;
`;
const Hoverpointer = styled.div`
  padding: 20px 10px;
  &:hover{
    cursor: pointer;
  }
`
const MTop2 = styled.div`
  width: 100%;
  background-color: white;
  margin-bottom: 10px;
  padding: 10px;
`;
const MTop21 = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 700;
`;
const MTop211 = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;
const Logout = styled.div`
  padding: 10px;
  width: 25%;
  &:hover{
    cursor: pointer;
    
  }
`
function Myinfo() {
  const [email, setEmail] = useRecoilState(emailState);
  const setPassword = useSetRecoilState(passwordState);
  const setIsLoggedIn2 = useSetRecoilState(isLoggedInState2);
  const navigate = useNavigate();

  const handleback = () => {
    navigate(-1);
  };

  const handleLogout = async (e:any) => {
    e.preventDefault();
    try {
        await signOut(auth);
        setIsLoggedIn2(false);
        setEmail("");
        setPassword("");
        navigate("/");
        window.location.reload();
    } catch (error) {
        console.error("로그아웃 중 오류가 발생했습니다:", error);
    }
  };
  return (
    <>
      <MContainer>
        <MTop>
          <Hoverpointer onClick={handleback}><FontAwesomeIcon icon={faArrowLeft} /></Hoverpointer>
          <MTop11>내 메뉴</MTop11>
        </MTop>
        <MTop2>
          <MTop21>이메일</MTop21>
          <MTop211>{email}</MTop211>
        </MTop2>
        <MTop2>
          <MTop21>내 관심 아파트</MTop21>
          <MyinfoFav></MyinfoFav>
        </MTop2>
        <Logout onClick={handleLogout}>로그아웃</Logout>
      </MContainer>
    </>
  );
}

export default Myinfo;