import { Chart as ChartJs, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useRecoilValue } from 'recoil';
import { SizeState } from '../../recoil/atom';

ChartJs.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

function isNumber(value:any) {
  return typeof value === 'number' && isFinite(value);
}

function LineChart6({ result }: any) {
    const Size = useRecoilValue(SizeState);

  const filledResult = result.map((item: any) =>
    item.map((value: any, index: number, array: any[]) => {
      if (!isNumber(value)) {
        // 숫자가 아닌 값이면 이전에 나온 숫자 값을 반환
        for (let i = index - 1; i >= 0; i--) {
          if (isNumber(array[i])) {
            return array[i];
          }
        }
        // 처음부터 숫자 값이 없는 경우 0 반환
        return 0;
      }
      return value;
    })
  );

  const data = {
    labels: ['2022.11', '2022.12', '2023.01', '2023.02', '2023.03', '2023.04'],
    datasets: [
      {
        label: `최근 6개월`,
        data: filledResult[Size],
        backgroundColor: '#2272ef',
        borderColor: '#2272ef',
        borderWidth: 3,
      },
    ],
  };

  const options = {
    scales: {
      y: { beginAtZero: false },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChart6;