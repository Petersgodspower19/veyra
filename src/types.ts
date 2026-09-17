export type AssetCategory = 'all' | 'layer1' | 'defi' | 'infrastructure' | 'stablecoins';

export interface CryptoAsset {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: string;
  category: AssetCategory;
  sparkline: number[];
  color: string;
  high24h: number;
  low24h: number;
  allTimeHigh: number;
}

export type Timeframe = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';

export interface PortfolioHolding {
  assetId: string;
  quantity: number;
  averageBuyPrice: number;
  allocationPercent: number;
}

export type TransactionType = 'BUY' | 'SELL' | 'DEPOSIT' | 'WITHDRAWAL';
export type TransactionStatus = 'Completed' | 'Pending' | 'Failed';

export interface Transaction {
  id: string;
  date: string;
  timestamp: number;
  assetId?: string;
  assetTicker: string;
  assetName: string;
  type: TransactionType;
  amount: number;
  amountUsd: number;
  price: number;
  fee: number;
  status: TransactionStatus;
  txHash?: string;
}

export interface UserPortfolio {
  totalValue: number;
  todayChangeUsd: number;
  todayChangePercent: number;
  totalReturnUsd: number;
  totalReturnPercent: number;
  availableCash: number;
  investedValue: number;
  holdings: Record<string, PortfolioHolding>;
}

export interface ChartDataPoint {
  timestamp: string;
  value: number;
  benchmark?: number;
}

export type DashboardTab =
  | 'overview'
  | 'markets'
  | 'portfolio'
  | 'invest'
  | 'transactions'
  | 'wallet'
  | 'watchlist'
  | 'settings';
