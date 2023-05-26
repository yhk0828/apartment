import styled from "styled-components";
import {useEffect} from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {Apartment, ClickedState, dataState, formatPrice, InfoState,isLoggedInState2, keywordState, NumberState, NumberState2, NumberState3} from '../recoil/atom';
import { faAngleRight,faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useLocation, useNavigate, useParams} from "react-router-dom";

const SidebarBottom = styled.div`
    background-color: white;
    padding: 12px;
    color:black;
    z-index: 11;
`
const ListTitle = styled.h3`
  font-size: 16px;
  margin: 20px 0;
`
const Sideli = styled.li`
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  &:hover{
    background-color: whitesmoke;
    cursor: pointer;
  }
`
const Sidelidiv = styled.div`
  &:first-child{
    width: 20%;
  }
  &:nth-child(2){
    width: 50%;
    padding-right: 10px;
  }
  &:nth-child(3){
    width: 20%;
  }
  &:nth-child(4){
    width: 10%;
  }
  
`
const ListNumber = styled.div`
  display:flex;
  justify-content: center;
`
const InListNumber = styled.div`
  margin-right: 10px;
  &:last-child{
    margin:0;
  }
  &:hover{
    cursor: pointer;
  }
`

function Bottom() {
    const [clicked, setClicked] = useRecoilState(ClickedState);
    const [dataNum, setDataNum] = useRecoilState(NumberState);
    const [dataNum2, setDataNum2] = useRecoilState(NumberState2);
    const setDataNum3 = useSetRecoilState(NumberState3);
    const data = useRecoilValue(dataState);
    const setInfo = useSetRecoilState<Apartment[]>(InfoState);
    const isLoggedIn2 = useRecoilValue(isLoggedInState2);
    const navigate = useNavigate();
    const location = useLocation();
    const [keyword, setkeyword] = useRecoilState(keywordState);

    function prev () {
        if(clicked === 1){
            alert ("최종입니다.")
        }else{
            setClicked(clicked-1);
            setDataNum(dataNum - 12);
            setDataNum2(dataNum2 - 12);
        }
    }
    function next () {
        if(clicked === Math.ceil(data.length/12)){
            alert ("최종입니다.")
        }else{
            setClicked(clicked+1);
            setDataNum(dataNum + 12);
            setDataNum2(dataNum2 + 12);
        }
    }
    function controlList (item: any,index: number) {
      setDataNum3(index);
      setInfo([item]);
      if(isLoggedIn2 === true){
        navigate(`/search/${keyword}/${dataNum + index}`);
      }else if(isLoggedIn2 === false){
        navigate(`/Login`);
      }
    }
    useEffect(()=>{
      setClicked(1);
      setDataNum(0);
      setDataNum2(12);
    },[location]);

    return (
        <>
        <SidebarBottom>
          <div>
            <ListTitle style={{marginBottom:"20px"}}>아파트</ListTitle>
              {data.slice(dataNum,dataNum2).map((item:any, index:any) => (
                <ul id={`${dataNum + index}ul`} key={`${dataNum + index}ul`}>
                    <Sideli 
                    id={`${dataNum + index}list`}
                    key={dataNum + index} 
                    onClick={() => controlList(item,index)}>
                        <Sidelidiv key={index + 400}>{item.법정동}</Sidelidiv>
                        <Sidelidiv key={index}>{item.아파트}</Sidelidiv>
                        <Sidelidiv key={index + 100}>{formatPrice(parseInt(item.거래금액))}</Sidelidiv>
                        <Sidelidiv key={index + 200}>{Math.floor(item.전용면적/3.31)}평</Sidelidiv>
                    </Sideli>
                </ul>
              ))}
          </div>
          <ListNumber>
            <InListNumber onClick={prev}><FontAwesomeIcon icon={faAngleLeft} /></InListNumber>
            <InListNumber>{clicked}/{Math.ceil(data.length/12)}</InListNumber>
            <InListNumber onClick={next}><FontAwesomeIcon icon={faAngleRight} /></InListNumber>
          </ListNumber>
        </SidebarBottom>
        </>
    )
}

export default Bottom;

