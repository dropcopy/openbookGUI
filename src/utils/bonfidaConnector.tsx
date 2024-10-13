import { BonfidaTrade } from './types';
const baseUrl = 'https://dropcopy.io/analytics'

export default class BonfidaApi {
  static URL: string = `${baseUrl}/`;

  static async get(path: string) {
    try {
      const response = await fetch(this.URL + path);
      if (response.ok) {
        const responseJson = await response.json();
        return responseJson.success ? responseJson.data : null;
      }
    } catch (err) {
      console.log(`Error fetching from Bonfida API ${path}: ${err}`);
    }
    return null;
  }

  static async getRecentTrades(
    marketAddress: string,
  ): Promise<BonfidaTrade[] | null> {
    return BonfidaApi.get(`trades/address/${marketAddress}`);
  }
  
  static async getOhlcv(
    symbol: string,
    resolution: string,
    from: number,
    to: number
  ): Promise<BonfidaTrade[] | null> {
    if (!symbol) return null
    return BonfidaApi.get(
      `tv/history?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}`
    )
  }
}

export const BONFIDA_DATA_FEED = `${baseUrl}/tv`
