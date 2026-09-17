import React from 'react';
import { UserPortfolio, CryptoAsset } from '../../types';
import { formatCurrency, formatCompactCurrency } from '../../data/mockData';
import { PieChart, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, ShieldCheck } from 'lucide-react';

interface PortfolioViewProps {
  portfolio: UserPortfolio;
  assets: CryptoAsset[];
  onTradeAsset: (asset: CryptoAsset) => void;
  onOpenDeposit: () => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  portfolio,
  assets,
  onTradeAsset,
  onOpenDeposit,
}) => {
  const assetMap = new Map<string, CryptoAsset>(assets.map((a) => [a.id, a]));

  const holdingList = (Object.values(portfolio.holdings) as any[])
    .map((h) => {
      const asset = assetMap.get(h.assetId);
      if (!asset) return null;
      const currentVal = h.quantity * asset.price;
      const costBasis = h.quantity * h.averageBuyPrice;
      const returnUsd = currentVal - costBasis;
      const returnPercent = costBasis > 0 ? (returnUsd / costBasis) * 100 : 0;
      const calculatedAllocation = portfolio.totalValue > 0 ? (currentVal / portfolio.totalValue) * 100 : 0;
      return {
        ...h,
        asset,
        currentVal,
        costBasis,
        returnUsd,
        returnPercent,
        calculatedAllocation,
      };
    })
    .filter(Boolean) as any[];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Portfolio Allocation & Ledger
          </h2>
          <p className="text-sm text-[#8F96A3] mt-0.5">
            Holistic positions across spot markets, stable reserve cash, and yield accounts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDeposit}
            className="px-4 py-2 rounded-xl bg-[#161B26] hover:bg-[#1E2536] text-white text-xs font-semibold border border-white/10 transition-all flex items-center gap-1.5"
          >
            <ArrowDownLeft className="w-3.5 h-3.5 text-[#C8F135]" />
            <span>Deposit Cash</span>
          </button>
        </div>
      </div>

      {/* Allocation Visual Bar */}
      <div className="bg-[#0E1017] p-6 rounded-2xl border border-white/[0.07] space-y-4 shadow-sm">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-white uppercase tracking-wider">Asset Weight Distribution</span>
          <span className="text-[#8F96A3] font-mono-num">Target Variance: &lt; 1.5%</span>
        </div>

        <div className="w-full h-3 rounded-full overflow-hidden flex bg-white/5">
          {holdingList.map((item) => (
            <div
              key={item.assetId}
              style={{
                width: `${Math.max(item.calculatedAllocation, 2)}%`,
                backgroundColor: item.asset.color,
              }}
              title={`${item.asset.name}: ${item.calculatedAllocation.toFixed(1)}%`}
            />
          ))}
          {portfolio.availableCash > 0 && (
            <div
              style={{
                width: `${(portfolio.availableCash / portfolio.totalValue) * 100}%`,
                backgroundColor: '#5A6272',
              }}
              title={`Cash Reserve: ${((portfolio.availableCash / portfolio.totalValue) * 100).toFixed(1)}%`}
            />
          )}
        </div>

        <div className="flex flex-wrap gap-4 pt-2">
          {holdingList.map((item) => (
            <div key={item.assetId} className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.asset.color }} />
              <span className="text-[#8F96A3]">{item.asset.ticker}</span>
              <span className="font-mono-num font-semibold text-white">
                {item.calculatedAllocation.toFixed(1)}%
              </span>
            </div>
          ))}
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5A6272]" />
            <span className="text-[#8F96A3]">Cash</span>
            <span className="font-mono-num font-semibold text-white">
              {((portfolio.availableCash / portfolio.totalValue) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Full Holdings Table */}
      <div className="bg-[#0E1017] rounded-2xl border border-white/[0.07] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/[0.06] text-[11px] font-semibold text-[#8F96A3] uppercase tracking-wider bg-[#12151F]/60">
                <th className="py-4 px-6">Asset</th>
                <th className="py-4 px-6 text-right">Holdings</th>
                <th className="py-4 px-6 text-right">Market Price</th>
                <th className="py-4 px-6 text-right">Average Buy</th>
                <th className="py-4 px-6 text-right">Current Value</th>
                <th className="py-4 px-6 text-right">Total Gain/Loss</th>
                <th className="py-4 px-6 text-right">Weight</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {holdingList.map((item) => {
                const isPositive = item.returnUsd >= 0;
                return (
                  <tr key={item.assetId} className="hover:bg-white/[0.025] transition-colors">
                    {/* Asset */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs text-white"
                          style={{
                            backgroundColor: `${item.asset.color}25`,
                            border: `1px solid ${item.asset.color}50`,
                            color: item.asset.color === '#23292F' ? '#F3F4F6' : item.asset.color,
                          }}
                        >
                          {item.asset.ticker}
                        </div>
                        <div>
                          <span className="font-bold text-white text-sm block">{item.asset.name}</span>
                          <span className="text-[11px] text-[#8F96A3] font-mono-num">{item.asset.ticker}</span>
                        </div>
                      </div>
                    </td>

                    {/* Quantity */}
                    <td className="py-4 px-6 text-right font-mono-num">
                      <span className="font-semibold text-white block">
                        {item.quantity.toLocaleString(undefined, { maximumFractionDigits: 5 })}
                      </span>
                      <span className="text-[11px] text-[#8F96A3]">{item.asset.ticker}</span>
                    </td>

                    {/* Market Price */}
                    <td className="py-4 px-6 text-right font-mono-num text-sm text-white font-semibold">
                      {formatCurrency(item.asset.price)}
                    </td>

                    {/* Avg Buy */}
                    <td className="py-4 px-6 text-right font-mono-num text-xs text-[#8F96A3]">
                      {formatCurrency(item.averageBuyPrice)}
                    </td>

                    {/* Current Value */}
                    <td className="py-4 px-6 text-right font-mono-num font-bold text-white text-sm">
                      {formatCurrency(item.currentVal)}
                    </td>

                    {/* Unrealized Return */}
                    <td className="py-4 px-6 text-right font-mono-num">
                      <span
                        className={`font-semibold text-xs block ${
                          isPositive ? 'text-[#10B981]' : 'text-[#F43F5E]'
                        }`}
                      >
                        {isPositive ? '+' : ''}{formatCurrency(item.returnUsd)}
                      </span>
                      <span
                        className={`text-[10px] ${
                          isPositive ? 'text-[#10B981]' : 'text-[#F43F5E]'
                        }`}
                      >
                        {isPositive ? '+' : ''}{item.returnPercent.toFixed(2)}%
                      </span>
                    </td>

                    {/* Weight */}
                    <td className="py-4 px-6 text-right font-mono-num text-xs text-white font-semibold">
                      {item.calculatedAllocation.toFixed(1)}%
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => onTradeAsset(item.asset)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#161A24] hover:bg-[#C8F135] text-white hover:text-[#090A0E] transition-all border border-white/10"
                      >
                        Trade
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
