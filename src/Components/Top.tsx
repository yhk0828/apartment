import {useState,useEffect} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Apartment, dataState, InfoState, isLoadingState, isLoggedInState2, keywordState,pageState, LocationState } from '../recoil/atom';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import ClickFav from "Components/Favorites/ClickFav";


const SidebarTop = styled.div`
  background-color: #2292ef;
  padding: 10px;
  height: 17vh;
`
const Nav1 = styled.div`
  width: 100%;
  height: 70px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: black;
  display:flex;
  > * {
    font-size: 16px;
    border:0px;
    padding: 5px;
  }
`
const Nav2 = styled.div`
  width: 100%;
  padding: 10px;
  font-size: 18px;
  color: white;
`
const Nav21 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-weight: 700;
`
const Nav211 = styled.div`
  &:hover{
    cursor: pointer;
  }
`
const Nav22 = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 10px;
  font-size: 14px;
`
const Search = styled.input`
  width: 60%;
  height: 100%;
  border-left:1px solid black;
`
const Searchb = styled.button`
  width: 10%;
  font-size: 16px;
  color: black;
  border: 0px solid white;
  background-color: white;
  &:hover{
    cursor:pointer;
  }
`

function Top() {
  const [pageNo, setPageNo] = useRecoilState(pageState);
  const [selectedOption, setSelectedOption] = useState(() => sessionStorage.getItem('selectedOption') || "0");
  const setIsLoading = useSetRecoilState(isLoadingState);
  const setLocation = useSetRecoilState(LocationState);
  const setData= useSetRecoilState(dataState);
  const [Info,setInfo] = useRecoilState<Apartment[]>(InfoState);
  const navigate = useNavigate();
  const isLoggedIn2 = useRecoilValue(isLoggedInState2);
  const [keyword, setkeyword] = useRecoilState(keywordState);
  const CodeApi = async (keyword:string) => {
      setIsLoading(true);
      try {
        const response1 = await axios.get(
          "https://cors-anywhere.herokuapp.com/http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList",
          {
            params: {
              ServiceKey:
                "BiCS4t9RvoCdj9gtFFHlclOT5I9Dzv6BaSbYMblCwROnjrO3ik1/U9R7jYEs3i1ew+1PpPxR/wAMoGqsQtGfsA==",
              type: "json",
              pageNo,
              numOfRows: 1000,
            },
          }
        );
        //바뀐 값 response1
        const code = response1?.data?.StanReginCd?.[1]?.row?.filter((item: any) => {
          return item.locatadd_nm.includes(keyword);
        });

        let locationCode = "11110";
        locationCode = code[0]?.region_cd?.toString().substring(0, 5);
        
        const response2 = await axios.get(
          "https://cors-anywhere.herokuapp.com/http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev",
          {
            params: {
              ServiceKey:
                "BiCS4t9RvoCdj9gtFFHlclOT5I9Dzv6BaSbYMblCwROnjrO3ik1/U9R7jYEs3i1ew+1PpPxR/wAMoGqsQtGfsA==",
              LAWD_CD: locationCode,
              DEAL_YMD: 202304,
              numOfRows: 1000,
            },
          }
        );
        const response3 = await axios.get(
          "https://cors-anywhere.herokuapp.com/http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev",
          {
            params: {
              ServiceKey:
                "BiCS4t9RvoCdj9gtFFHlclOT5I9Dzv6BaSbYMblCwROnjrO3ik1/U9R7jYEs3i1ew+1PpPxR/wAMoGqsQtGfsA==",
              LAWD_CD: locationCode,
              DEAL_YMD: 202303,
              numOfRows: 1000,
            },
          }
        );
        const response4 = await axios.get(
          "https://cors-anywhere.herokuapp.com/http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev",
          {
            params: {
              ServiceKey:
                "BiCS4t9RvoCdj9gtFFHlclOT5I9Dzv6BaSbYMblCwROnjrO3ik1/U9R7jYEs3i1ew+1PpPxR/wAMoGqsQtGfsA==",
              LAWD_CD: locationCode,
              DEAL_YMD: 202302,
              numOfRows: 1000,
            },
          }
        );
        const response5 = await axios.get(
          "https://cors-anywhere.herokuapp.com/http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev",
          {
            params: {
              ServiceKey:
                "BiCS4t9RvoCdj9gtFFHlclOT5I9Dzv6BaSbYMblCwROnjrO3ik1/U9R7jYEs3i1ew+1PpPxR/wAMoGqsQtGfsA==",
              LAWD_CD: locationCode,
              DEAL_YMD: 202301,
              numOfRows: 1000,
            },
          }
        );
        const response6 = await axios.get(
          "https://cors-anywhere.herokuapp.com/http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev",
          {
            params: {
              ServiceKey:
                "BiCS4t9RvoCdj9gtFFHlclOT5I9Dzv6BaSbYMblCwROnjrO3ik1/U9R7jYEs3i1ew+1PpPxR/wAMoGqsQtGfsA==",
              LAWD_CD: locationCode,
              DEAL_YMD: 202212,
              numOfRows: 1000,
            },
          }
        );
        const response7 = await axios.get(
          "https://cors-anywhere.herokuapp.com/http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev",
          {
            params: {
              ServiceKey:
                "BiCS4t9RvoCdj9gtFFHlclOT5I9Dzv6BaSbYMblCwROnjrO3ik1/U9R7jYEs3i1ew+1PpPxR/wAMoGqsQtGfsA==",
              LAWD_CD: locationCode,
              DEAL_YMD: 202211,
              numOfRows: 1000,
            },
          }
        );

        // 노원구 데이터를 가져옴
        const items = response2?.data?.response?.body?.items?.item;
        const items2 = response3?.data?.response?.body?.items?.item;
        const items3 = response4?.data?.response?.body?.items?.item;
        const items4 = response5?.data?.response?.body?.items?.item;
        const items5 = response6?.data?.response?.body?.items?.item;
        const items6 = response7?.data?.response?.body?.items?.item;

        const itemsArr = [];
        itemsArr.push(items,items2,items3,items4,items5,items6);
        // 중계 데이터를 가져옴
        const apartments:any = itemsArr.flatMap((item:any) => item.filter((item: Apartment) => item.법정동?.includes(keyword!)));
        // 중계 데이터의 도로명과 번호코드를 가져옴
        const doro:any = apartments.map((item: Apartment) => item.도로명 + item.도로명건물본번호코드);
        setData(apartments);
        setLocation(doro);
      } catch (error) {
        console.error(error);
        navigate("/error");
      }finally{
        setIsLoading(false);
      }
  };

  // 엔터키
  function handleKeyDown(event:React.KeyboardEvent<HTMLInputElement>) {
      if (event.keyCode === 13) { 
        navigate(`/search/${keyword}`);
        CodeApi(keyword);
      }
  }
  // 키워드 검색
  const handleInputkeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
      setkeyword(event.target.value);
  };
  // 지역 select
  const handleOptionChange = (event:any) => {
    const value = event.target.value;
      setSelectedOption(value);
      // 서울특별시를 선택한 경우
      if (value === "서울특별시") {
          setPageNo(18);
      }
      // 부산광역시를 선택한 경우
      else if (value === "부산광역시" || value === "대구광역시") {
        setPageNo(1);
      }else if (value === "0"){
        setPageNo(0);
        alert("지역을 선택해주세요");
      }
  };
  const handleback = () => {
    navigate(`/search/${keyword}`);
    setInfo([]);
  };
  useEffect(() => {
    sessionStorage.setItem('selectedOption', selectedOption);
  }, [selectedOption]);

  return (
      <>
        <SidebarTop>
            <Nav1>
                <select style={{width:"30%"}} value={selectedOption} onChange={handleOptionChange}>
                    <option value="0">지역 선택</option>
                    <option value="서울특별시">서울특별시</option>
                    <option value="부산광역시">부산광역시</option>
                    <option value="대구광역시">대구광역시</option>
                </select>
                <Search 
                type="text"
                value={keyword}
                onKeyDown={handleKeyDown} 
                onChange={handleInputkeyword} 
                placeholder="동 입력 ex)중계동" />
                <Searchb onClick={()=>{
                    navigate(`/search/${keyword}`);
                    CodeApi(keyword);
                    }}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Searchb>
            </Nav1>
            {(Info && Info[0] !== undefined) && isLoggedIn2?
            <Nav2>
              <Nav21>
                <Nav211 onClick={handleback}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Nav211>
                <div>
                {Info[0].법정동} {Info[0].아파트}
                </div>
                <ClickFav></ClickFav>
              </Nav21>
              <Nav22>
                {Info[0].중개사소재지} {Info[0].법정동} {Info[0].도로명}
              </Nav22>
            </Nav2>: null
            }

        </SidebarTop>
      </>
    )
}

export default Top;