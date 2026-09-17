import React from 'react';
import { CryptoAsset } from '../../types';
import { formatCurrency, formatCompactCurrency } from '../../data/mockData';
import { Sparkline } from '../common/Sparkline';
import { Star, TrendingUp, TrendingDown, Plus, Bookmark } from 'lucide-react';

interface WatchlistViewProps {
  assets: CryptoAsset[];
  watchlist: string[];
  onToggleWatchlist: (assetId: string) => void;
  onTradeAsset: (asset: CryptoAsset) => void;
  onNavigateMarkets: () => void;
}

export const WatchlistView: React.FC<WatchlistViewProps> = ({
  assets,
  watchlist,
  onToggleWatchlist,
  onTradeAsset,
  onNavigateMarkets,
}) => {
  const watchlistedAssets = assets.filter((a) => watchlist.includes(a.id));

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Curated Watchlist
          </h2>
          <p className="text-sm text-[#8F96A3] mt-0.5">
            Real-time price action and market movement monitoring for priority digital assets.
          </p>
        </div>
        <button
          onClick={onNavigateMarkets}
          className="px-4 py-2 rounded-xl bg-[#161B26] hover:bg-[#1E2536] text-white text-xs font-semibold border border-white/10 transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-[#C8F135]" />
          <span>Add More Assets</span>
        </button>
      </div>

      {watchlistedAssets.length === 0 ? (
        <div className="bg-[#0E1017] rounded-2xl border border-white/[0.07] p-12 text-center space-y-4">
          <Bookmark className="w-10 h-10 text-[#8F96A3] mx-auto" />
          <h3 className="text-base font-bold text-white">Your Watchlist is Empty</h3>
          <p className="text-xs text-[#8F96A3] max-w-sm mx-auto">
            Click the star icon next to any asset in the Markets tab to monitor price movements here.
          </p>
          <button
            onClick={onNavigateMarkets}
            className="px-5 py-2.5 rounded-xl bg-[#C8F135] text-[#090A0E] text-xs font-bold hover:bg-[#d5fb46] transition-all"
          >
            Browse All Markets
          </button>
        </div>
      ) : (
        <div className="bg-[#0E1017] rounded-2xl border border-white/[0.07] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-white/[0.06] text-[11px] font-semibold text-[#8F96A3] uppercase tracking-wider bg-[#12151F]/60">
                  <th className="py-4 px-4 w-12 text-center">Unstar</th>
                  <th className="py-4 px-6">Asset</th>
                  <th className="py-4 px-6 text-right">Price</th>
                  <th className="py-4 px-6 text-right">24h Movement</th>
                  <th className="py-4 px-6 text-right">7D Movement</th>
                  <th className="py-4 px-6 text-right">Market Cap</th>
                  <th className="py-4 px-6 text-center">Sparkline</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {watchlistedAssets.map((asset) => {
                  const isPositive24h = asset.change24h >= 0;
                  const isPositive7d = asset.change7d >= 0;

                  return (
                    <tr
                      key={asset.id}
                      onClick={() => onTradeAsset(asset)}
                      className="hover:bg-white/[0.025] transition-colors group cursor-pointer text-xs"
                    >
                      <td className="py-4 px-4 text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWatchlist(asset.id);
                          }}
                          className="p-1 text-[#C8F135] hover:text-[#F43F5E] transition-colors"
                          title="Remove from Watchlist"
                        >
                          <Star className="w-4 h-4 fill-[#C8F135]" />
                        </button>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white"
                            style={{
                              backgroundColor: `${asset.color}25`,
                              border: `1px solid ${asset.color}50`,
                              color: asset.color === '#23292F' ? '#F3F4F6' : asset.color,
                            }}
                          >
                            {asset.ticker}
                          </div>
                          <div>
                            <span className="font-bold text-white block group-hover:text-[#C8F135] transition-colors">
                              {asset.name}
                            </span>
                            <span className="text-[10px] text-[#8F96A3] font-mono-num">{asset.ticker}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-right font-mono-num font-bold text-white text-sm">
                        {formatCurrency(asset.price, asset.price < 10 ? 4 : 2)}
                      </td>

                      <td className="py-4 px-6 text-right font-mono-num">
                        <span
                          className={`font-semibold px-2 py-0.5 rounded text-xs ${
                            isPositive24h ? 'text-[#10B981] bg-[#10B981]/10' : 'text-[#F43F5E] bg-[#F43F5E]/10'
                          }`}
                        >
                          {isPositive24h ? '+' : ''}
                          {asset.change24h.toFixed(2)}%
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right font-mono-num">
                        <span
                          className={`font-semibold ${
                            isPositive7d ? 'text-[#10B981]' : 'text-[#F43F5E]'
                          }`}
                        >
                          {isPositive7d ? '+' : ''}
                          {asset.change7d.toFixed(2)}%
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right font-mono-num text-white">
                        {formatCompactCurrency(asset.marketCap)}
                      </td>

                      <td className="py-4 px-6 text-center">
                        <div className="flex justify-center">
                          <Sparkline
                            data={asset.sparkline}
                            isPositive={isPositive24h}
                            width={90}
                            height={28}
                          />
                        </div>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onTradeAsset(asset);
                          }}
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
      )}

    </div>
  );
};
