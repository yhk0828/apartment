import styled from "styled-components";

export const LForm = styled.form`
  margin-top: 30px;
`
export const Exit = styled.div`
  font-size: 20px;
  position:fixed;
  right: 50px;
  top: 50px;
  &:hover{
    cursor: pointer;
  }
`
export const Sign = styled.div`
  margin-top: 10px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  
`
export const LInput = styled.input`
  width: 100%;
  height: 50px;
  margin: 10px 0;
  font-size: 16px;
  border: 0px;
  border-bottom: 3px solid #E11299;
`
export const LSubmit = styled.button`
  margin: 30px 0;
  width: 100%;
  height: 50px;
  background: linear-gradient(to right, #99004d 0%, #ff0080 100%);
  color: white;
  :hover{
    cursor: pointer;
    text-decoration : underline;
    box-shadow: 2px 2px 2px gray;
  }
`
export const LoginorAccount = styled.div`
  margin: 0 auto;
  width: 100px;
  height: 50px;
  font-size: 14px;
  text-align: center;
  text-decoration : underline;
  color: gray;
  :hover{
    cursor: pointer;
  }
`
export const Container = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transform
    height: 70vh;
    padding: 100px;
    width: 600px;
    background-color: white;
    z-index: 999;

`
export const AContainer = styled.div`
  color: black;
`
export const SocialAccount = styled.button`
  width: 100%;
  margin: 5px 0;
  height: 50px;
  background: linear-gradient(to right, #F55237 0%, #F57189 100%);
  color: white;
  :hover{
    cursor: pointer;
    text-decoration : underline;
    box-shadow: 2px 2px 2px gray;
  }
  `
  export const SocialAccount2 = styled.button`
  width: 100%;
  margin: 5px 0;
  height: 50px;
  background: linear-gradient(to right, #4F6BF6 0%, #9382F5 100%);
  color: white;
  :hover{
    cursor: pointer;
    text-decoration : underline;
    box-shadow: 2px 2px 2px gray;
  }
`