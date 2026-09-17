import React, { useState } from 'react';
import {
  UserPortfolio,
  CryptoAsset,
  Transaction,
  Timeframe,
} from '../../types';
import {
  formatCurrency,
  formatCompactCurrency,
  PORTFOLIO_TIMEFRAME_DATA,
} from '../../data/mockData';
import { InteractiveChart } from '../common/InteractiveChart';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  PieChart,
  Wallet,
  Clock,
  ChevronRight,
  Plus,
} from 'lucide-react';

interface OverviewViewProps {
  portfolio: UserPortfolio;
  assets: CryptoAsset[];
  transactions: Transaction[];
  onOpenTrade: (asset: CryptoAsset) => void;
  onOpenDeposit: () => void;
  onOpenWithdraw: () => void;
  onNavigateTab: (tab: any) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  portfolio,
  assets,
  transactions,
  onOpenTrade,
  onOpenDeposit,
  onOpenWithdraw,
  onNavigateTab,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1M');
  const chartData = PORTFOLIO_TIMEFRAME_DATA[timeframe];

  // Map assets map for quick lookup
  const assetMap = new Map<string, CryptoAsset>(assets.map((a) => [a.id, a]));

  const isTodayPositive = portfolio.todayChangeUsd >= 0;
  const isReturnPositive = portfolio.totalReturnUsd >= 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top 4 Financial Cards (Requested explicitly by prompt) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Portfolio Value */}
        <div className="bg-[#0E1017] p-5 rounded-2xl border border-white/[0.07] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8F96A3] text-xs">
            <span className="font-semibold uppercase tracking-wider">Portfolio Value</span>
            <PieChart className="w-4 h-4 text-[#C8F135]" />
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono-num tracking-tight">
              {formatCurrency(portfolio.totalValue)}
            </div>
            <div className="text-[11px] text-[#8F96A3] mt-1 font-mono-num">
              Invested: {formatCurrency(portfolio.investedValue)}
            </div>
          </div>
        </div>

        {/* Card 2: 24h Change */}
        <div className="bg-[#0E1017] p-5 rounded-2xl border border-white/[0.07] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8F96A3] text-xs">
            <span className="font-semibold uppercase tracking-wider">24h Change</span>
            {isTodayPositive ? (
              <TrendingUp className="w-4 h-4 text-[#10B981]" />
            ) : (
              <TrendingDown className="w-4 h-4 text-[#F43F5E]" />
            )}
          </div>
          <div className="mt-3">
            <div
              className={`text-2xl sm:text-3xl font-extrabold font-mono-num tracking-tight flex items-baseline gap-1.5 ${
                isTodayPositive ? 'text-[#10B981]' : 'text-[#F43F5E]'
              }`}
            >
              <span>{isTodayPositive ? '+' : ''}{formatCurrency(portfolio.todayChangeUsd)}</span>
            </div>
            <div className="text-[11px] font-mono-num text-[#8F96A3] mt-1">
              +{portfolio.todayChangePercent.toFixed(2)}% vs yesterday close
            </div>
          </div>
        </div>

        {/* Card 3: Total Return */}
        <div className="bg-[#0E1017] p-5 rounded-2xl border border-white/[0.07] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8F96A3] text-xs">
            <span className="font-semibold uppercase tracking-wider">Total Return</span>
            <DollarSign className="w-4 h-4 text-[#C8F135]" />
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono-num tracking-tight">
              +{formatCurrency(portfolio.totalReturnUsd)}
            </div>
            <div className="text-[11px] text-[#10B981] font-mono-num font-semibold mt-1">
              +{portfolio.totalReturnPercent.toFixed(2)}% cumulative
            </div>
          </div>
        </div>

        {/* Card 4: Available Cash */}
        <div className="bg-[#0E1017] p-5 rounded-2xl border border-white/[0.07] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8F96A3] text-xs">
            <span className="font-semibold uppercase tracking-wider">Available Cash</span>
            <Wallet className="w-4 h-4 text-[#C8F135]" />
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono-num tracking-tight">
              {formatCurrency(portfolio.availableCash)}
            </div>
            <div className="text-[11px] text-[#8F96A3] mt-1 flex items-center justify-between">
              <span>Ready to deploy</span>
              <button
                onClick={onOpenDeposit}
                className="text-[#C8F135] hover:underline font-semibold"
              >
                + Deposit
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Large Interactive Portfolio Performance Chart */}
      <div className="bg-[#0E1017] p-6 sm:p-8 rounded-2xl border border-white/[0.07] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.06] gap-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Portfolio Performance
            </h3>
            <p className="text-xs text-[#8F96A3] mt-0.5">
              Net asset value history computed across all institutional cold-custody accounts.
            </p>
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center bg-[#131620] p-1 rounded-xl border border-white/[0.08] self-start sm:self-auto">
            {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as Timeframe[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  timeframe === tf
                    ? 'bg-[#C8F135] text-[#090A0E] font-bold shadow-sm'
                    : 'text-[#8F96A3] hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6">
          <InteractiveChart
            data={chartData}
            timeframe={timeframe}
            height={290}
            showTimeframeSelector={false}
            accentColor="#C8F135"
          />
        </div>
      </div>

      {/* Two Column Grid: Top Holdings + Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 Cols: Top Holdings */}
        <div className="lg:col-span-7 bg-[#0E1017] p-6 rounded-2xl border border-white/[0.07] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-tight">Active Holdings</h3>
                <span className="text-xs text-[#8F96A3] font-mono-num">
                  ({Object.keys(portfolio.holdings).length} Assets)
                </span>
              </div>
              <button
                onClick={() => onNavigateTab('portfolio')}
                className="text-xs font-semibold text-[#C8F135] hover:underline flex items-center gap-1"
              >
                <span>View Full Portfolio</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-white/[0.04]">
              {(Object.values(portfolio.holdings) as any[]).map((holding) => {
                const asset = assetMap.get(holding.assetId);
                if (!asset) return null;
                const holdingValue = holding.quantity * asset.price;
                const pnl = holdingValue - holding.quantity * holding.averageBuyPrice;
                const isHoldingPositive = pnl >= 0;

                return (
                  <div
                    key={holding.assetId}
                    onClick={() => onOpenTrade(asset)}
                    className="py-3.5 flex items-center justify-between hover:bg-white/[0.02] -mx-2 px-2 rounded-xl transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs text-white"
                        style={{
                          backgroundColor: `${asset.color}25`,
                          border: `1px solid ${asset.color}50`,
                          color: asset.color === '#23292F' ? '#F3F4F6' : asset.color,
                        }}
                      >
                        {asset.ticker}
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-[#C8F135] transition-colors text-sm flex items-center gap-1.5">
                          {asset.name}
                          <span className="text-xs text-[#5A6272] font-mono-num">
                            {holding.quantity.toLocaleString(undefined, { maximumFractionDigits: 4 })} {asset.ticker}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#8F96A3] font-mono-num">
                          Avg: {formatCurrency(holding.averageBuyPrice)}
                        </div>
                      </div>
                    </div>

                    <div className="text-right font-mono-num">
                      <div className="text-sm font-bold text-white">
                        {formatCurrency(holdingValue)}
                      </div>
                      <div
                        className={`text-xs font-semibold ${
                          isHoldingPositive ? 'text-[#10B981]' : 'text-[#F43F5E]'
                        }`}
                      >
                        {isHoldingPositive ? '+' : ''}
                        {formatCurrency(pnl)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-xs text-[#8F96A3]">Need to adjust allocations?</span>
            <button
              onClick={() => onNavigateTab('invest')}
              className="px-4 py-2 rounded-xl bg-[#161A24] hover:bg-[#C8F135] text-[#D1D5DB] hover:text-[#090A0E] text-xs font-semibold transition-all border border-white/10"
            >
              Order New Allocation
            </button>
          </div>
        </div>

        {/* Right 5 Cols: Recent Activity & Quick Actions */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Cash Action Widget */}
          <div className="bg-[#0E1017] p-5 rounded-2xl border border-white/[0.07] shadow-sm">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Cash Operations
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onOpenDeposit}
                className="p-3.5 rounded-xl bg-[#121620] hover:bg-[#181D2A] border border-white/10 text-left transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#C8F135]/15 text-[#C8F135] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <ArrowDownLeft className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-white block">Deposit Cash</span>
                <span className="text-[10px] text-[#8F96A3]">ACH / Federal Wire</span>
              </button>

              <button
                onClick={onOpenWithdraw}
                className="p-3.5 rounded-xl bg-[#121620] hover:bg-[#181D2A] border border-white/10 text-left transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-white block">Withdraw Cash</span>
                <span className="text-[10px] text-[#8F96A3]">Bank Account (...9184)</span>
              </button>
            </div>
          </div>

          {/* Recent Activity List */}
          <div className="bg-[#0E1017] p-5 rounded-2xl border border-white/[0.07] shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Recent Ledger Activity
              </h3>
              <button
                onClick={() => onNavigateTab('transactions')}
                className="text-[11px] text-[#C8F135] hover:underline"
              >
                All Records
              </button>
            </div>

            <div className="divide-y divide-white/[0.04]">
              {transactions.slice(0, 4).map((tx) => (
                <div key={tx.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-[10px] ${
                        tx.type === 'BUY'
                          ? 'bg-[#C8F135]/15 text-[#C8F135]'
                          : tx.type === 'SELL'
                          ? 'bg-[#F43F5E]/15 text-[#F43F5E]'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      {tx.type === 'BUY' ? 'B' : tx.type === 'SELL' ? 'S' : 'D'}
                    </div>
                    <div>
                      <span className="font-semibold text-white block">
                        {tx.type} {tx.assetTicker}
                      </span>
                      <span className="text-[10px] text-[#5A6272] font-mono-num">{tx.date}</span>
                    </div>
                  </div>
                  <div className="text-right font-mono-num">
                    <span className="font-bold text-white block">
                      {formatCurrency(tx.amountUsd)}
                    </span>
                    <span className="text-[10px] text-[#10B981] font-semibold">{tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
