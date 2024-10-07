import {Line} from 'react-chartjs-2';
import {TimeData} from "../models/TimeData.ts";

type HistoricalChartProps = {
  data: TimeData[];  // Historical data: date and total portfolio value
};

const HistoricalChart: React.FC<HistoricalChartProps> = ({data}) => {
  const chartData = {
    labels: data.map(d => d.date),  // X-axis: Dates
    datasets: [{
      label: 'Portfolio Value Over Time',
      data: data.map(d => d.value),  // Y-axis: Total portfolio value at each date
      borderColor: '#36a2eb',
      fill: false,
    }]
  };

  return <Line data={chartData}
               options={{maintainAspectRatio: false}}/>;
};

export default HistoricalChart;