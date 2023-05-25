import axios from "axios";

function MapContainer() {
  const ApartApi = async () => {
    try {
      const response = await axios.get(
        "https://cors-anywhere.herokuapp.com/https://api.odcloud.kr/api/15063424/v1/uddi:6d7fd177-cc7d-426d-ba80-9b137edf6066?",
        {
          params: {
            ServiceKey: "BiCS4t9RvoCdj9gtFFHlclOT5I9Dzv6BaSbYMblCwROnjrO3ik1/U9R7jYEs3i1ew+1PpPxR/wAMoGqsQtGfsA==",
            numOfRows: 1000,
            page: 1,
            perPage: 10,
            returnType: "json"
          },
        }
      );
      //바뀐 값
      const code = response.data.response.body;
      console.log(code);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div>
        hello
      </div>
      <button onClick={ApartApi}>흥</button>
    </>
  )
}
export default MapContainer;