import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth} from "./fbase";
import * as L from "./StyledLogIn";
import { Apartment, emailState, InfoState, isLoggedInState2, passwordState } from "../../recoil/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const MyInfoOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* 투명도를 조절하여 어두움의 정도를 설정합니다 */
  z-index: 12;
`;

const LoginForm = () => {
  const [email, setEmail] = useRecoilState(emailState);
  const [password, setPassword] = useRecoilState(passwordState);
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const setIsLoggedIn2 = useSetRecoilState(isLoggedInState2);
  const setInfo = useSetRecoilState<Apartment[]>(InfoState);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 로그인 상태 확인
        setIsLoggedIn2(true);
        setInfo([]);
      } else {
        // 로그아웃 상태
        setIsLoggedIn2(false);
      }
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
  }, [setIsLoggedIn2, setInfo]);

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
    setError("");
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (newAccount) {
        // 회원가입
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        navigate(-1);
      } else {
        // 로그인
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        navigate(-1);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <L.Container>
        <L.Exit onClick={handleBack}>
          <FontAwesomeIcon icon={faXmark} />
        </L.Exit>
        {newAccount ? <L.Sign>회원가입</L.Sign> : <L.Sign>로그인</L.Sign>}
        <L.LForm onSubmit={handleSubmit}>
          <L.LInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <L.LInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <L.LSubmit type="submit">{newAccount ? "Create Account" : "Log in"}</L.LSubmit>
          {error && <span className="authError">{error}</span>}
        </L.LForm>
        <L.LoginorAccount onClick={toggleAccount} className="authSwitch">
          {newAccount ? "Log in" : "Create Account"}
        </L.LoginorAccount>
      </L.Container>
      <MyInfoOverlay></MyInfoOverlay>
    </>
  );
};

export default LoginForm;