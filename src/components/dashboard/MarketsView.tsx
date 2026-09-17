import React, { useState } from 'react';
import { CryptoAsset, AssetCategory } from '../../types';
import { formatCurrency, formatCompactCurrency } from '../../data/mockData';
import { Sparkline } from '../common/Sparkline';
import {
  Search,
  Star,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Filter,
  Flame,
  Award,
} from 'lucide-react';

interface MarketsViewProps {
  assets: CryptoAsset[];
  watchlist: string[];
  onToggleWatchlist: (assetId: string) => void;
  onTradeAsset: (asset: CryptoAsset) => void;
}

export const MarketsView: React.FC<MarketsViewProps> = ({
  assets,
  watchlist,
  onToggleWatchlist,
  onTradeAsset,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory | 'watchlist'>('all');
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<'marketCap' | 'price' | 'change24h' | 'volume24h'>('marketCap');
  const [sortAsc, setSortAsc] = useState(false);

  // Top gainers, losers, trending
  const sortedByGain = [...assets].sort((a, b) => b.change24h - a.change24h);
  const topGainer = sortedByGain[0];
  const topLoser = sortedByGain[sortedByGain.length - 1];
  const trendingAsset = assets.find((a) => a.ticker === 'SOL') || assets[0];

  // Filtering
  const filtered = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.ticker.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory === 'watchlist') {
      return watchlist.includes(asset.id);
    }
    if (selectedCategory === 'all') return true;
    return asset.category === selectedCategory;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    let diff = 0;
    if (sortField === 'marketCap') diff = b.marketCap - a.marketCap;
    if (sortField === 'price') diff = b.price - a.price;
    if (sortField === 'change24h') diff = b.change24h - a.change24h;
    if (sortField === 'volume24h') diff = b.volume24h - a.volume24h;
    return sortAsc ? -diff : diff;
  });

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top 3 Market Summary Spotlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Spotlight 1: Trending Asset */}
        <div
          onClick={() => onTradeAsset(trendingAsset)}
          className="bg-[#0E1017] p-5 rounded-2xl border border-white/[0.07] hover:border-white/15 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-[#8F96A3]">
            <span className="flex items-center gap-1.5 font-semibold uppercase tracking-wider text-white">
              <Flame className="w-4 h-4 text-amber-400" />
              Trending Asset
            </span>
            <span className="text-[10px] font-mono text-[#8F96A3]">24h Volume Leader</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <span className="text-xl font-extrabold text-white group-hover:text-[#C8F135] transition-colors">
                {trendingAsset.name} ({trendingAsset.ticker})
              </span>
              <div className="text-xs text-[#8F96A3] font-mono-num mt-0.5">
                Vol: {formatCompactCurrency(trendingAsset.volume24h)}
              </div>
            </div>
            <div className="text-right font-mono-num">
              <div className="text-base font-bold text-white">
                {formatCurrency(trendingAsset.price)}
              </div>
              <div className="text-xs font-semibold text-[#10B981]">
                +{trendingAsset.change24h.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>

        {/* Spotlight 2: Top Gainer */}
        <div
          onClick={() => onTradeAsset(topGainer)}
          className="bg-[#0E1017] p-5 rounded-2xl border border-white/[0.07] hover:border-white/15 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-[#8F96A3]">
            <span className="flex items-center gap-1.5 font-semibold uppercase tracking-wider text-white">
              <TrendingUp className="w-4 h-4 text-[#10B981]" />
              Top Gainer (24h)
            </span>
            <span className="text-[10px] font-mono text-[#10B981]">OUTPERFORMING</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <span className="text-xl font-extrabold text-white group-hover:text-[#C8F135] transition-colors">
                {topGainer.name} ({topGainer.ticker})
              </span>
              <div className="text-xs text-[#8F96A3] font-mono-num mt-0.5">
                Mcap: {formatCompactCurrency(topGainer.marketCap)}
              </div>
            </div>
            <div className="text-right font-mono-num">
              <div className="text-base font-bold text-white">
                {formatCurrency(topGainer.price)}
              </div>
              <div className="text-xs font-semibold text-[#10B981]">
                +{topGainer.change24h.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>

        {/* Spotlight 3: Top Loser / Dip Opportunity */}
        <div
          onClick={() => onTradeAsset(topLoser)}
          className="bg-[#0E1017] p-5 rounded-2xl border border-white/[0.07] hover:border-white/15 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-[#8F96A3]">
            <span className="flex items-center gap-1.5 font-semibold uppercase tracking-wider text-white">
              <TrendingDown className="w-4 h-4 text-[#F43F5E]" />
              Top Pullback (24h)
            </span>
            <span className="text-[10px] font-mono text-[#F43F5E]">DISCOUNT SPREAD</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <span className="text-xl font-extrabold text-white group-hover:text-[#C8F135] transition-colors">
                {topLoser.name} ({topLoser.ticker})
              </span>
              <div className="text-xs text-[#8F96A3] font-mono-num mt-0.5">
                Mcap: {formatCompactCurrency(topLoser.marketCap)}
              </div>
            </div>
            <div className="text-right font-mono-num">
              <div className="text-base font-bold text-white">
                {formatCurrency(topLoser.price)}
              </div>
              <div className="text-xs font-semibold text-[#F43F5E]">
                {topLoser.change24h.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Categories Bar */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 bg-[#0E1017] p-1.5 rounded-2xl border border-white/[0.07]">
          {[
            { id: 'all', label: 'All Assets' },
            { id: 'layer1', label: 'Layer 1' },
            { id: 'defi', label: 'DeFi' },
            { id: 'infrastructure', label: 'Infrastructure' },
            { id: 'stablecoins', label: 'Stablecoins' },
            { id: 'watchlist', label: `Watchlist (${watchlist.length})` },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#C8F135] text-[#090A0E] font-bold shadow-sm'
                  : 'text-[#8F96A3] hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#8F96A3] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by name or ticker..."
            className="w-full bg-[#0E1017] border border-white/[0.08] rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-[#5A6272] focus:outline-none focus:border-[#C8F135]"
          />
        </div>
      </div>

      {/* Main Markets Table Card */}
      <div className="bg-[#0E1017] rounded-2xl border border-white/[0.07] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[840px]">
            <thead>
              <tr className="border-b border-white/[0.06] text-[11px] font-semibold text-[#8F96A3] uppercase tracking-wider bg-[#12151F]/60 select-none">
                <th className="py-4 px-4 w-12 text-center">Fav</th>
                <th className="py-4 px-4">Asset</th>
                <th
                  onClick={() => handleSort('price')}
                  className="py-4 px-4 text-right cursor-pointer hover:text-white"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>Price</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('change24h')}
                  className="py-4 px-4 text-right cursor-pointer hover:text-white"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>24h %</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-4 px-4 text-right">7D %</th>
                <th
                  onClick={() => handleSort('marketCap')}
                  className="py-4 px-4 text-right cursor-pointer hover:text-white"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>Market Cap</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-4 px-4 text-center">7D Trend</th>
                <th className="py-4 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-sm text-[#8F96A3]">
                    No digital assets match your filter criteria.
                  </td>
                </tr>
              ) : (
                sorted.map((asset) => {
                  const isFavorite = watchlist.includes(asset.id);
                  const isPositive24h = asset.change24h >= 0;
                  const isPositive7d = asset.change7d >= 0;

                  return (
                    <tr
                      key={asset.id}
                      onClick={() => onTradeAsset(asset)}
                      className="hover:bg-white/[0.025] transition-colors group cursor-pointer"
                    >
                      {/* Favorite Star */}
                      <td className="py-4 px-4 text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWatchlist(asset.id);
                          }}
                          className={`p-1 rounded hover:bg-white/10 transition-colors ${
                            isFavorite ? 'text-[#C8F135]' : 'text-[#5A6272] hover:text-white'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${isFavorite ? 'fill-[#C8F135]' : ''}`} />
                        </button>
                      </td>

                      {/* Asset Column */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs text-white shrink-0"
                            style={{
                              backgroundColor: `${asset.color}25`,
                              border: `1px solid ${asset.color}50`,
                              color: asset.color === '#23292F' ? '#F3F4F6' : asset.color,
                            }}
                          >
                            {asset.ticker}
                          </div>
                          <div>
                            <span className="font-semibold text-white group-hover:text-[#C8F135] transition-colors text-sm flex items-center gap-1.5">
                              {asset.name}
                              <span className="text-xs text-[#5A6272] font-mono-num font-normal">
                                {asset.ticker}
                              </span>
                            </span>
                            <span className="text-[11px] text-[#8F96A3] font-mono-num block">
                              Supply: {asset.circulatingSupply}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 text-right font-mono-num font-semibold text-white text-sm">
                        {formatCurrency(asset.price, asset.price < 10 ? 4 : 2)}
                      </td>

                      {/* 24h Change */}
                      <td className="py-4 px-4 text-right font-mono-num">
                        <span
                          className={`inline-block font-semibold text-xs px-2 py-0.5 rounded ${
                            isPositive24h ? 'text-[#10B981] bg-[#10B981]/10' : 'text-[#F43F5E] bg-[#F43F5E]/10'
                          }`}
                        >
                          {isPositive24h ? '+' : ''}
                          {asset.change24h.toFixed(2)}%
                        </span>
                      </td>

                      {/* 7D Change */}
                      <td className="py-4 px-4 text-right font-mono-num">
                        <span
                          className={`text-xs font-medium ${
                            isPositive7d ? 'text-[#10B981]' : 'text-[#F43F5E]'
                          }`}
                        >
                          {isPositive7d ? '+' : ''}
                          {asset.change7d.toFixed(2)}%
                        </span>
                      </td>

                      {/* Market Cap */}
                      <td className="py-4 px-4 text-right font-mono-num text-xs text-[#D1D5DB]">
                        <div>{formatCompactCurrency(asset.marketCap)}</div>
                        <div className="text-[10px] text-[#5A6272]">
                          Vol: {formatCompactCurrency(asset.volume24h)}
                        </div>
                      </td>

                      {/* Sparkline */}
                      <td className="py-4 px-4 text-center">
                        <div className="flex justify-center">
                          <Sparkline
                            data={asset.sparkline}
                            isPositive={isPositive24h}
                            width={90}
                            height={28}
                          />
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onTradeAsset(asset);
                          }}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#141824] hover:bg-[#C8F135] text-white hover:text-[#090A0E] transition-all border border-white/10"
                        >
                          Trade
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
