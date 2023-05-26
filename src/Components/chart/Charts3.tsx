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

function LineChart3({ result }: any) {
  const Size = useRecoilValue(SizeState);
  const data = {
    labels: ['2023.02', '2023.03', '2023.04'],
    datasets: [
      {
        label: `최근 3개월`,
        data: [result[Size][3],result[Size][4],result[Size][5]],
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

export default LineChart3;