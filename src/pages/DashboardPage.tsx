import {useEffect, useState} from 'react';
import {
  ArcElement,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

import {PortfolioApi} from '../api/PortfolioApi.ts';
import PortfolioDonutChart from '../components/PortfolioDonutChart';
import PositionsTable from '../components/PositionsTable';
import HistoricalChart from '../components/HistoricalChart';
import SwitchControl, {ViewBy} from '../components/SwitchControl';
import {TimeData} from "../models/TimeData.ts";
import {FullPosition} from "../models/Position.ts";

const filterBalanceBy = (allData: FullPosition[], by: ViewBy): Map<string, number> => {
  const result: { [key: string]: number } = {};
  switch (by) {
    case ViewBy.specificAsset:
      allData.forEach(p => {
        result[p.asset] = p.value;
      });
      break;
    case ViewBy.assetClass:
      allData.forEach((p) => {
        result[p.type] = (result[p.type] ? result[p.type] : 0) + p.value;
      });
      break;
  }

  return new Map(Object.entries(result));
}


const Dashboard = () => {
  const [allBalances, setAllBalances] = useState<FullPosition[]>();
  const [filteredBalances, setFilteredBalances] = useState<Map<string, number>>();
  const [historicalData, setHistoricalData] = useState<TimeData[]>();
  const [viewBy, setViewBy] = useState<ViewBy>(ViewBy.assetClass);
  const [asOfBy, setAsOfBy] = useState<string>('2024-01-01'); // setAsOfBy will be used when we will add date filter

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const dates = ['2022-01-01', '2022-06-01', '2023-01-01', '2023-06-01', '2024-01-01'];
        const portfolioBalances = await PortfolioApi.getFullPositions(asOfBy);
        setAllBalances(portfolioBalances);
        setHistoricalData(await PortfolioApi.getHistoricalPerformance());

      } catch (error) {
        // todo toastify
        setError('Error loading portfolio data');
      }
    };

    fetchData();

    return () => {
    };
  }, [asOfBy]);

  useEffect(() => {
    try {
      if (allBalances && allBalances.length > 0) {
        setFilteredBalances(filterBalanceBy(allBalances, viewBy));
      }
    } catch (error) {
      // todo toastify
      setError('Error loading portfolio data');
    }

    return () => {
    };
  }, [allBalances, viewBy]);

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Personal Dashboard</h1>

        <SwitchControl viewBy={viewBy} setViewBy={setViewBy}/>

        <div className="my-4">
          <PortfolioDonutChart data={filteredBalances} viewBy={viewBy}/>
        </div>

        <div className="my-4">
          <PositionsTable data={filteredBalances} viewBy={viewBy}/>
        </div>

        <div className="my-4">
          <HistoricalChart data={historicalData || []}/>
        </div>
      </div>
  );
};

export default Dashboard;