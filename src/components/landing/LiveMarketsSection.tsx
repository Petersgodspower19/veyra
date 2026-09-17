import React from 'react';
import { CryptoAsset } from '../../types';
import { formatCurrency, formatCompactCurrency } from '../../data/mockData';
import { Sparkline } from '../common/Sparkline';
import { ArrowUpRight, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

interface LiveMarketsSectionProps {
  assets: CryptoAsset[];
  onSelectAsset: (asset: CryptoAsset) => void;
  onViewAllMarkets: () => void;
}

export const LiveMarketsSection: React.FC<LiveMarketsSectionProps> = ({
  assets,
  onSelectAsset,
  onViewAllMarkets,
}) => {
  // Show key assets requested: BTC, ETH, SOL, XRP, USDT
  const primaryTickers = ['BTC', 'ETH', 'SOL', 'XRP', 'USDT'];
  const displayAssets = assets.filter((a) => primaryTickers.includes(a.ticker));

  return (
    <section id="markets" className="py-20 bg-[#0A0C10] border-t border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C8F135] mb-2 font-mono">
              Market Intelligence
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Live Digital Asset Markets
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#8F96A3] max-w-xl">
              Real-time institutional liquidity, streaming order-book depth, and transparent multi-source indexing.
            </p>
          </div>
          <button
            onClick={onViewAllMarkets}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-[#C8F135] transition-colors self-start md:self-auto group"
          >
            <span>Explore All 50+ Markets</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Markets Table Card */}
        <div className="bg-[#0E1017] rounded-2xl border border-white/[0.07] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/[0.06] text-[11px] font-semibold text-[#8F96A3] uppercase tracking-wider bg-[#12151F]/60">
                  <th className="py-4 px-6">Asset</th>
                  <th className="py-4 px-6 text-right">Price (USD)</th>
                  <th className="py-4 px-6 text-right">24h Change</th>
                  <th className="py-4 px-6 text-center">24h Trend</th>
                  <th className="py-4 px-6 text-right">24h Volume</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {displayAssets.map((asset) => {
                  const isPositive = asset.change24h >= 0;
                  return (
                    <tr
                      key={asset.id}
                      onClick={() => onSelectAsset(asset)}
                      className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                    >
                      {/* Asset Column */}
                      <td className="py-4.5 px-6">
                        <div className="flex items-center gap-3.5">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 text-white shadow-inner"
                            style={{
                              backgroundColor: `${asset.color}25`,
                              border: `1px solid ${asset.color}50`,
                              color: asset.color === '#23292F' ? '#F3F4F6' : asset.color,
                            }}
                          >
                            {asset.ticker}
                          </div>
                          <div>
                            <div className="font-semibold text-white group-hover:text-[#C8F135] transition-colors text-sm sm:text-base flex items-center gap-2">
                              {asset.name}
                              <span className="text-xs text-[#5A6272] font-mono-num font-normal">
                                {asset.ticker}
                              </span>
                            </div>
                            <div className="text-xs text-[#8F96A3] font-mono-num">
                              Mcap: {formatCompactCurrency(asset.marketCap)}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Price Column */}
                      <td className="py-4.5 px-6 text-right">
                        <div className="font-semibold text-white font-mono-num text-sm sm:text-base">
                          {formatCurrency(asset.price, asset.price < 10 ? 4 : 2)}
                        </div>
                        <div className="text-[11px] text-[#5A6272] font-mono-num">
                          24h H: {formatCurrency(asset.high24h, 2)}
                        </div>
                      </td>

                      {/* 24h Change */}
                      <td className="py-4.5 px-6 text-right">
                        <span
                          className={`inline-flex items-center gap-1 font-semibold text-xs sm:text-sm font-mono-num px-2.5 py-1 rounded-lg ${
                            isPositive
                              ? 'text-[#10B981] bg-[#10B981]/10'
                              : 'text-[#F43F5E] bg-[#F43F5E]/10'
                          }`}
                        >
                          {isPositive ? (
                            <TrendingUp className="w-3.5 h-3.5" />
                          ) : (
                            <TrendingDown className="w-3.5 h-3.5" />
                          )}
                          {isPositive ? '+' : ''}
                          {asset.change24h.toFixed(2)}%
                        </span>
                      </td>

                      {/* Sparkline */}
                      <td className="py-4.5 px-6 text-center">
                        <div className="flex justify-center items-center">
                          <Sparkline
                            data={asset.sparkline}
                            isPositive={isPositive}
                            width={110}
                            height={32}
                          />
                        </div>
                      </td>

                      {/* Volume */}
                      <td className="py-4.5 px-6 text-right font-mono-num">
                        <div className="text-sm font-medium text-[#D1D5DB]">
                          {formatCompactCurrency(asset.volume24h)}
                        </div>
                        <div className="text-[11px] text-[#5A6272]">24h turnover</div>
                      </td>

                      {/* Action */}
                      <td className="py-4.5 px-6 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectAsset(asset);
                          }}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#161A24] hover:bg-[#C8F135] text-[#D1D5DB] hover:text-[#090A0E] transition-all border border-white/10 group-hover:border-[#C8F135]/40"
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
    </section>
  );
};
