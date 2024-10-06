import {Doughnut} from 'react-chartjs-2';

type PortfolioDonutChartProps = {
  data?: Map<string, number>;
  viewBy: string;
};


const PortfolioDonutChart: React.FC<PortfolioDonutChartProps> = ({data}) => {
  if (!data) {
    return <div>Loading...</div>;
  }
  // Aggregate data by asset class if required
  const processedData = Array.from(data, ([label, value]) => ({label, value}));
  const chartData = {
    labels: processedData.map(d => d.label),
    datasets: [{
      data: processedData.map(d => d.value),
      backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'], // Sample colors
    }]
  };

  return <Doughnut data={chartData}/>;
};
export default PortfolioDonutChart;