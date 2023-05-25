import { useEffect, useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Apartment, dataState, formatPrice, InfoState, isLoggedInState2, keywordState, LocationState } from '../recoil/atom';
import { useNavigate} from "react-router-dom";


function MapApi() {
    const Location = useRecoilValue(LocationState);
    const setInfo = useSetRecoilState<Apartment[]>(InfoState);
    const data = useRecoilValue(dataState);
    const isLoggedIn2 = useRecoilValue(isLoggedInState2);
    const navigate = useNavigate();
    const keyword = useRecoilValue(keywordState);
    const KakaoApi = useCallback(() => {
      if (!window.kakao) {
        // Kakao 지도 API가 로드되지 않은 경우, 처리할 내용을 추가합니다.
        console.log('Kakao 지도 API를 로드할 수 없습니다.');
        return;
      }
      const mapContainer = document.getElementById('map'); // 지도를 표시할 div 
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 4 // 지도의 확대 레벨
      };
      // 지도를 생성합니다    
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
  
      // 장소 검색 객체를 생성합니다
      const ps = new window.kakao.maps.services.Geocoder();
      // 검색어를 설정합니다
      searchPlaces();
  
      // 키워드 검색을 요청하는 함수입니다
      function searchPlaces() {
        // Location로 좌표를 검색합니다
        for (let i = 0; i < Location.length; i++) {
  
          ps.addressSearch(`${Location[i]}`, function (result: any, status: any) {
  
            // 정상적으로 검색이 완료됐으면
            if (status === window.kakao.maps.services.Status.OK) {
              // 결과값으로 받은 위치를 마커로 표시합니다
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              // InfoWindow에 들어갈 컨텐츠 DOM 생성
              const iwContent = document.createElement('div');
              iwContent.innerHTML = `
                <div class="infocontents">
                  <div>
                    ${Math.floor(data[i].전용면적 / 3.31)}평
                  </div>
                  <div class="deal">
                    ${formatPrice(parseInt(data[i].거래금액))}
                  </div>
                </div>`;
  
              // InfoWindow 생성
              const infowindow = new window.kakao.maps.CustomOverlay({
                position: coords,
                clickable: true,
                content: iwContent
              });
  
              // 인포윈도우로 장소에 대한 설명을 표시합니다
              infowindow.setMap(map);
  
              iwContent.addEventListener('click', function () {
                if (isLoggedIn2 === true) {
                  navigate(`/search/${keyword}/${i.toString()}`);
                } else if (isLoggedIn2 === false) {
                  navigate("/Login");
                }
                setInfo([data[i]]);
              });
  
              if (i === 0) {
                // 첫번째 Location의 좌표값을 기준으로 지도의 중심을 이동시킵니다
                map.setCenter(coords);
              }
            }
          });
        }
      }
    }, [data, isLoggedIn2,Location,keyword,navigate,setInfo]);
  
    useEffect(() => {
      const fetchData = async () => {
        await KakaoApi();
      };
      fetchData();
    }, [KakaoApi]);

    return (
        <div id="map" style={{ width: "100vw", height: "100vh" }} />
    )
}
export default MapApi;