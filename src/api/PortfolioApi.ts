import axios from 'axios';
import {Asset} from "../models/Asset.ts";
import {Portfolio} from "../models/Portfolio.ts";
import {Price} from "../models/Prices.ts";
import {TimeData} from "../models/TimeData.ts";
import {FullPosition} from "../models/Position.ts";

export interface IPortfolioApi {
  getAssets: () => Promise<Asset[]>;
  getPrices: (assets: string[], asOf?: string) => Promise<Price[]>;
  getPortfolio: (asOf?: string) => Promise<Portfolio>;
  getFullPositions: (asOf?: string) => Promise<FullPosition[]>;
  getHistoricalPerformance: () => Promise<TimeData[]>;
}

export const PortfolioApi: IPortfolioApi = {

  getAssets: async () => {
    try {
      return (await axios.get('/data/assets.json')).data;
    } catch (error) {
      console.error('Error fetching assets:', error);
      throw error;
    }
  },

  getPrices: async (assets: string[], asOf?: string) => {
    try {
      const response = await axios.get<Price[]>('/data/prices.json');
      const prices = response.data;
      let filteredPrices = prices;
      // temp until api is json
      if (assets && assets.length > 0) {
        filteredPrices = prices.filter((price) => assets.includes(price.asset));
      }
      if (asOf) {
        filteredPrices = filteredPrices.filter((price) => price.asOf === asOf);
      }

      return filteredPrices;
    } catch (error) {
      console.error('Error fetching prices:', error);
      throw error;
    }
  },

  getPortfolio: async (asOf?: string) => {
    try {
      // temp until api is json
      const response = await axios.get<Portfolio>(`/data/portfolio_${asOf || '2024-01-01'}.json`);

      return response.data;
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      throw error;
    }
  },

  getFullPositions: async (asOf?: string) => {
    try {
      const [assets, portfolio] = await axios.all([
        await PortfolioApi.getAssets(),
        await PortfolioApi.getPortfolio(asOf)
      ]);
      const assetsMap = new Map();
      (assets as Asset[]).map(a => {
        assetsMap.set(a.name, a.type);
      });

      return (portfolio as Portfolio).positions.map(p => ({
        ...p,
        type: assetsMap.get(p.asset),
        value: p.quantity * p.price,
      }));
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      throw error;
    }
  },

  getHistoricalPerformance: async () => {
    try {
      // get all available prices, we don't know when portfolio has which data, as positions can change over time
      const prices = await PortfolioApi.getPrices([]);
      const dates = Array.from(new Set(prices.map((price) => price.asOf))).sort();

      return await axios.all(dates.map(async (asOf) => {
        // and then get portfolio data on each available date
        const portfolio = await PortfolioApi.getPortfolio(asOf);
        const sum = portfolio.positions.reduce((prev, p) => (prev + p.quantity * p.price), 0);
        return {date: asOf, value: sum};
      }));
    } catch (error) {
      console.error('Error fetching historical data:', error);
      throw error;
    }
  },
}
