import { useRecoilState, useRecoilValue } from "recoil";
import {useState} from "react";
import styled from "styled-components";
import { Apartment, dataState, formatPrice, formatPrice2, IindexState, InfoState, zero,} from "../recoil/atom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {useNavigate, useParams } from "react-router-dom";
import LineChart6 from "./chart/Charts6";
import LineChart3 from "./chart/Charts3";

const SidebarBottom = styled.div`
    background-color: white;
    padding: 12px;
    height: 83vh;
    overflow-y: auto;
`
const B1 = styled.div`
    margin-top: 20px;
    margin-bottom: 30px;
    display:flex;
    justify-content: space-between;
`
const B4 = styled.div`
    width: 80px;
    height: 30px;
    padding: 3px;
    font-size: 18px;
    font-weight: 700;
    color: #2252ef;
    border:2px solid black;
    text-align:center;
    &:hover{
        cursor: pointer;
    }
`
const B11 = styled.div`
    font-size: 14px;
    font-weight: 700;
`
const B12 = styled.p`
    font-size: 24px;
    font-weight: 700;
    margin-top: 5px;
`
const B13 = styled.p`
    font-size: 24px;
    font-weight: 700;
    margin-top: 5px;
    margin-left: 20px;
    color:blue;
`
const B2 = styled.div`
    margin-bottom: 20px;
`
const B21 = styled.ul`
    width: 100%;
    display: flex;
    justify-content: space-between;
    text-align:center;
    border:1px solid whitesmoke;
`
const B22 = styled.div`
    width: 30%;
    height: 40px;
    padding-top: 10px;
    &:nth-child(2){
        font-weight: 700;
    }
`
const B23 = styled.div`
    width: 20%;
    height: 40px;
    padding-top: 10px;
`
const B5 = styled.div`
    width: 200px;
`
const B51 = styled.div<{ isClicked: boolean }>`
    width: 40%;
    text-align:center;
    border-bottom: 1px solid ${props => props.isClicked ? 'silver' : 'black'};
    padding-bottom: 10px;
    margin-bottom: 10px;
    margin-right: 5%;
    &:hover{
        cursor:pointer;
    }
`
const B52 = styled.div<{ isClicked: boolean }>`
    width: 40%;
    text-align:center;
    border-bottom: 1px solid ${props => props.isClicked ? 'black' : 'silver'};
    padding-bottom: 10px;
    margin-bottom: 10px;
    margin-right: 5%;
    &:hover{
        cursor:pointer;
    }
`
const Sul = styled.ul`
    position: relative;
    right: 5px;
    top: 4px;
    z-index: 999999;
`
const Sli = styled.li`
    background-color:white;
    width: 80px;
    height: 30px;
    padding: 3px;
    font-size: 18px;
    font-weight: 700;
    color: #2252ef;
    border:2px solid black;
    text-align:center;
    &:hover{
        cursor: pointer;
        background-color: whitesmoke;
    }

`
function InfoBottom() {
    const Info = useRecoilValue<Apartment[]>(InfoState);
    const navigate = useNavigate();
    //내가 클릭한 아파트이름에 맞는 아파트내용
    const data = useRecoilValue(dataState);
    const [clickm2, setClickm2] = useState(false);
    const [click6M, setclick6M] = useState(false);
    const [iindex, setIindex] = useRecoilState(IindexState);
    const {kkeyword} = useParams();
    //동일로 207길의 아파트
    const sameApartment:Apartment[] = data.filter((item: Apartment) => item.아파트.includes(Info[0]?.아파트));

    //동일로 207길의 아파트 중에 전용면적이 같은 데이터를 만들어주는 함수 reduce는 누적값 덧셈만 하는게 아니다.
    const sameArea = sameApartment.reduce((acc: Apartment[][], curr: Apartment) => {
        const sameSizeArr = acc.find((arr) => Math.floor(arr[0].전용면적/3.31) === Math.floor(curr.전용면적/3.31));
        if (sameSizeArr) {
            sameSizeArr.push(curr);
        } else {
            acc.push([curr]);
        }
        return acc;
    }, []);

    // sameArea는 서로 같은 면적을 지닌 것들을 묶어놓음
    // sameArea.length = 14평 15평같은 평수 자체가 전체 몇 개 있느냐
    // 결국 sameArea.length = foundArray.length 는 서로 같다. 서로의 길이는 같다라고 볼수 있음.
    // foundArray = 4월의 내용만 가져온다.
    // newfoundArray = 

    const foundArray:Apartment[] = sameArea.sort((a, b) => a[0].전용면적 - b[0].전용면적).map((item:any)=> item.filter((item:any)=> item.월 === 4));
    const foundArray2:Apartment[] = sameArea.sort((a, b) => a[0].전용면적 - b[0].전용면적).map((item:any)=> item.filter((item:any)=> item.월 === 3));
    const foundArray3:Apartment[] = sameArea.sort((a, b) => a[0].전용면적 - b[0].전용면적).map((item:any)=> item.filter((item:any)=> item.월 === 2));
    const foundArray4:Apartment[] = sameArea.sort((a, b) => a[0].전용면적 - b[0].전용면적).map((item:any)=> item.filter((item:any)=> item.월 === 1));
    const foundArray5:Apartment[] = sameArea.sort((a, b) => a[0].전용면적 - b[0].전용면적).map((item:any)=> item.filter((item:any)=> item.월 === 12));
    const foundArray6:Apartment[] = sameArea.sort((a, b) => a[0].전용면적 - b[0].전용면적).map((item:any)=> item.filter((item:any)=> item.월 === 11));
    
    // sameCash는 4월의 내용의 거래금액만 배열로서 숫자로 보관한다.
    let sameCash:any = foundArray.map((item:any)=>item.map((item:any)=>parseInt(item.거래금액.replace(",", ""))).reduce((a:any, b:any) => a + b, 0)/item?.length);
    let sameCash2:any = foundArray2.map((item:any)=>item.map((item:any)=>parseInt(item.거래금액.replace(",", ""))).reduce((a:any, b:any) => a + b, 0)/item?.length);
    let sameCash3:any = foundArray3.map((item:any)=>item.map((item:any)=>parseInt(item.거래금액.replace(",", ""))).reduce((a:any, b:any) => a + b, 0)/item?.length);
    let sameCash4:any = foundArray4.map((item:any)=>item.map((item:any)=>parseInt(item.거래금액.replace(",", ""))).reduce((a:any, b:any) => a + b, 0)/item?.length);
    let sameCash5:any = foundArray5.map((item:any)=>item.map((item:any)=>parseInt(item.거래금액.replace(",", ""))).reduce((a:any, b:any) => a + b, 0)/item?.length);
    let sameCash6:any = foundArray6.map((item:any)=>item.map((item:any)=>parseInt(item.거래금액.replace(",", ""))).reduce((a:any, b:any) => a + b, 0)/item?.length);

    const sameCashArr:any = sameCash.map((value:any, index:any) => {
        return [sameCash6[index], sameCash5[index], sameCash4[index], sameCash3[index], sameCash2[index], value];
      });
    for (let i = 0; i < sameCashArr.length; i++) {
        for (let j = 0; j < sameCashArr[i].length; j++) {
            if (isNaN(sameCashArr[i][j])) {
            sameCashArr[i][j] = j === 0 ? 0 : sameCashArr[i][j - 1];
            }
        }
    }

    //rate == 가격변동률
    let rate = 0;
    if (sameCashArr[iindex]?.length > 0 ) {
        if(click6M === true){
            rate = (sameCashArr[iindex][sameCashArr[iindex]?.length - 1] - sameCashArr[iindex][0]) / sameCashArr[iindex][0] * 100;
        }else{
            rate = (sameCashArr[iindex][sameCashArr[iindex]?.length - 1] - sameCashArr[iindex][3]) / sameCashArr[iindex][3] * 100;
        }
    } else {
        rate = 0;
    }
    if(rate === Infinity){
        rate = 0;
    }
    
    let shoPrice: any;

    if (sameCashArr[iindex] && sameCashArr[iindex].length > 0) {
    shoPrice = sameCashArr[iindex][sameCashArr[iindex].length - 1];

    if (isNaN(shoPrice)) {
        for (let i = 1; i < sameCashArr[iindex].length; i++) {
        if (sameCashArr[iindex][sameCashArr[iindex].length - i] !== undefined) {
            shoPrice = sameCashArr[iindex][sameCashArr[iindex].length - i];
            break;
        }
        }
    }
    } else {
    shoPrice = null;
    }
    function controlArea (item:any,index:number) {
        setIindex(index);
        setClickm2(!clickm2);
        navigate(`/search/${kkeyword}/${iindex}/${Math.floor(item[0].전용면적/3.31)}`)
    }
    return (
        <>
        <SidebarBottom>
            <div>
            <>
                <B1>
                    <div>
                        <B11>최근 1개월 실거래가 <span style={{color:"#2292ef",fontWeight:"700"}}>평균가</span></B11>
                        <B12>
                            {formatPrice2(shoPrice)}
                        </B12>
                    </div>
                    <div>
                        {!click6M ?
                        <B11 style={{textAlign:"right"}}>3개월전 비교</B11>
                        :<B11 style={{textAlign:"right"}}>6개월전 비교</B11>
                        }
                        {(rate < 0 ?
                            <B13 style={{color:"red"}}>-{ Math.abs(rate).toFixed(2)}%</B13>
                            : <B13>+{Math.abs(rate).toFixed(2)}%</B13>
                        )}
                    </div>
                </B1>
                <B2>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <B5 style={{display:"flex"}}>
                            <B51 isClicked={click6M} onClick={() => setclick6M(false)}>최근3개월</B51>
                            <B52 isClicked={click6M} onClick={() => setclick6M(true)}>최근6개월</B52>
                        </B5>
                        <B4>
                            <div onClick={() => setClickm2(!clickm2)}>{Math.floor(sameArea[iindex][0]?.전용면적/3.31)}평 <FontAwesomeIcon icon={faAngleDown}/></div>
                            {clickm2 ? 
                            <Sul>
                            {sameArea.sort((a, b) => a[0].전용면적 - b[0].전용면적).map((item:any,index:any)=> (
                                <Sli onClick={() => controlArea(item,index)} key={index}>
                                    <div>
                                        {Math.floor(item[0].전용면적/3.31)}평
                                    </div>
                                </Sli>
                            ))}
                            </Sul>:null}
                        </B4>
                    </div>
                    {!click6M ? 
                    <LineChart3 result={sameCashArr}></LineChart3>:
                    <LineChart6 result={sameCashArr}></LineChart6>
                    }
                </B2>
                <B2>
                    <B21 style={{backgroundColor:"whitesmoke"}}>
                        <B22>계약일</B22>
                        <B22>가격</B22>
                        <B23>평수</B23>
                        <B23>층</B23>
                    </B21>
                {sameArea[iindex].map((item:any,index:number)=>(
                    <B21 key={index}>
                        <B22>{item.년}.{zero(item.월)}.{zero(item.일)}</B22>
                        <B22>{formatPrice(parseInt(item.거래금액))}</B22>
                        <B23>{Math.floor(item.전용면적/3.31)}평</B23>
                        <B23>{item.층}층</B23>
                    </B21>
                ))}
                </B2>
                </>
            </div>
        </SidebarBottom>
        </>
    )
}
export default InfoBottom;