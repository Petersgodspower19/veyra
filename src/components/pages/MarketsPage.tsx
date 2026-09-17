import React, { useState } from 'react';
import {
  Search,
  TrendingUp,
  TrendingDown,
  Star,
  ArrowUpRight,
  Shield,
  Layers,
  Sparkles,
  BarChart3,
  Globe,
  Filter,
} from 'lucide-react';
import { CryptoAsset } from '../../types';
import { LandingNavbar } from '../landing/LandingNavbar';
import { LandingFooter } from '../landing/LandingFooter';
import { FontTheme } from '../dashboard/DashboardTopBar';

interface MarketsPageProps {
  assets: CryptoAsset[];
  watchlist: string[];
  fontTheme: FontTheme;
  onSelectFontTheme: (theme: FontTheme) => void;
  onNavigateHome: () => void;
  onNavigateMarkets: () => void;
  onNavigateInvestments: () => void;
  onNavigateHowItWorks: () => void;
  onNavigateAbout: () => void;
  onNavigateSecurity: () => void;
  onNavigateLegal: (tab: 'terms' | 'privacy' | 'aml' | 'fees') => void;
  onNavigateSupport: () => void;
  onNavigateLogin: () => void;
  onNavigateSignUp: () => void;
  onEnterDashboard: () => void;
  onToggleWatchlist: (id: string) => void;
  onTradeAsset: (asset: CryptoAsset) => void;
  onOpenRiskDisclosure: () => void;
}

export const MarketsPage: React.FC<MarketsPageProps> = ({
  assets,
  watchlist,
  fontTheme,
  onSelectFontTheme,
  onNavigateHome,
  onNavigateMarkets,
  onNavigateInvestments,
  onNavigateHowItWorks,
  onNavigateAbout,
  onNavigateSecurity,
  onNavigateLegal,
  onNavigateSupport,
  onNavigateLogin,
  onNavigateSignUp,
  onEnterDashboard,
  onToggleWatchlist,
  onTradeAsset,
  onOpenRiskDisclosure,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'marketCap' | 'price' | 'change'>('marketCap');

  // Filter assets
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.ticker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || asset.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Sort assets
  const sortedAssets = [...filteredAssets].sort((a, b) => {
    if (sortBy === 'price') return b.price - a.price;
    if (sortBy === 'change') return b.change24h - a.change24h;
    return b.marketCapUsd - a.marketCapUsd;
  });

  // Global market stats
  const totalMarketCap = assets.reduce((sum, a) => sum + a.marketCapUsd, 0);
  const avg24hChange = assets.reduce((sum, a) => sum + a.change24h, 0) / (assets.length || 1);
  const total24hVolume = assets.reduce((sum, a) => sum + a.volume24hUsd, 0);

  return (
    <div className="min-h-screen bg-[#090A0E] text-[#F3F4F6] flex flex-col">
      <LandingNavbar
        fontTheme={fontTheme}
        onSelectFontTheme={onSelectFontTheme}
        onOpenSignIn={onNavigateLogin}
        onOpenSignUp={onNavigateSignUp}
        onNavigateHome={onNavigateHome}
        onNavigateMarkets={onNavigateMarkets}
        onNavigateInvestments={onNavigateInvestments}
        onNavigateHowItWorks={onNavigateHowItWorks}
        onNavigateAbout={onNavigateAbout}
        onNavigateSecurity={onNavigateSecurity}
        onEnterDashboard={onEnterDashboard}
        activePage="markets"
      />

      <main className="flex-1">
        {/* Hero Header */}
        <section className="relative pt-12 pb-16 border-b border-white/[0.08] overflow-hidden bg-gradient-to-b from-[#121520]/80 via-[#090A0E] to-[#090A0E]">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C8F135]/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8F135]/10 border border-[#C8F135]/20 text-[#C8F135] text-xs font-mono mb-4">
                  <Globe className="w-3.5 h-3.5" />
                  <span>INSTITUTIONAL MARKET DIRECTORY</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                  Digital Asset <span className="text-[#C8F135]">Markets</span>
                </h1>
                <p className="mt-3 text-sm sm:text-base text-[#8F96A3] max-w-2xl leading-relaxed">
                  Institutional liquidity, multi-exchange order routing, and real-time cryptographic asset valuation.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onEnterDashboard}
                  className="px-5 py-2.5 rounded-xl bg-[#C8F135] text-[#090A0E] font-bold text-sm hover:bg-[#d5f758] transition-all flex items-center gap-2 shadow-lg shadow-[#C8F135]/20"
                >
                  <span>Open Live Order Book</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Global Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              <div className="p-4 rounded-2xl bg-[#121520] border border-white/[0.08]">
                <span className="text-xs text-[#8F96A3] uppercase tracking-wider font-mono block">Tracked Market Cap</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-white mt-1 block">
                  ${(totalMarketCap / 1e9).toFixed(2)}B
                </span>
                <span className="text-xs text-[#C8F135] flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> Real-time feed
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#121520] border border-white/[0.08]">
                <span className="text-xs text-[#8F96A3] uppercase tracking-wider font-mono block">24h Aggregate Volume</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-white mt-1 block">
                  ${(total24hVolume / 1e9).toFixed(2)}B
                </span>
                <span className="text-xs text-[#8F96A3] mt-1 block">Institutional Order Flow</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#121520] border border-white/[0.08]">
                <span className="text-xs text-[#8F96A3] uppercase tracking-wider font-mono block">Average 24h Trend</span>
                <span className={`text-xl sm:text-2xl font-bold font-mono mt-1 block ${avg24hChange >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                  {avg24hChange >= 0 ? '+' : ''}{avg24hChange.toFixed(2)}%
                </span>
                <span className="text-xs text-[#8F96A3] mt-1 block">Market Index Weight</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#121520] border border-white/[0.08]">
                <span className="text-xs text-[#8F96A3] uppercase tracking-wider font-mono block">Institutional Custody</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-white mt-1 block">
                  100% Cold MPC
                </span>
                <span className="text-xs text-[#C8F135] flex items-center gap-1 mt-1">
                  <Shield className="w-3 h-3" /> Institutional Grade
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Assets Table Section */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls: Search, Filters, Sort */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {[
                { id: 'all', label: 'All Assets' },
                { id: 'Layer 1', label: 'Layer 1 / L2' },
                { id: 'DeFi', label: 'DeFi Protocols' },
                { id: 'AI & Data', label: 'AI & Compute' },
                { id: 'Real World Assets', label: 'RWA / Tokenized' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#C8F135] text-[#090A0E] shadow-md shadow-[#C8F135]/20'
                      : 'bg-[#121520] text-[#8F96A3] hover:text-white border border-white/[0.08]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search and Sort */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8F96A3]" />
                <input
                  type="text"
                  placeholder="Search ticker or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#121520] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-[#5A6272] focus:outline-none focus:border-[#C8F135]/50 transition-colors"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#121520] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-[#8F96A3] focus:outline-none focus:border-[#C8F135]/50"
              >
                <option value="marketCap">Sort by Market Cap</option>
                <option value="price">Sort by Price</option>
                <option value="change">Sort by 24h Change</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-[#121520] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-[#0E1018] text-[11px] font-mono uppercase tracking-wider text-[#8F96A3]">
                    <th className="py-4 px-6">Asset</th>
                    <th className="py-4 px-6 text-right">Price</th>
                    <th className="py-4 px-6 text-right">24h Change</th>
                    <th className="py-4 px-6 text-right hidden sm:table-cell">24h Volume</th>
                    <th className="py-4 px-6 text-right hidden md:table-cell">Market Cap</th>
                    <th className="py-4 px-6 text-center">Watch</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-xs">
                  {sortedAssets.map((asset) => {
                    const isStarred = watchlist.includes(asset.id);
                    const isPositive = asset.change24h >= 0;

                    return (
                      <tr key={asset.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#181C28] border border-white/10 flex items-center justify-center font-bold text-[#C8F135]">
                              {asset.ticker.slice(0, 3)}
                            </div>
                            <div>
                              <div className="font-bold text-white group-hover:text-[#C8F135] transition-colors flex items-center gap-2">
                                {asset.name}
                                <span className="text-[10px] font-mono text-[#8F96A3] uppercase bg-white/[0.06] px-1.5 py-0.5 rounded">
                                  {asset.ticker}
                                </span>
                              </div>
                              <span className="text-[10px] text-[#5A6272]">{asset.category}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-6 text-right font-mono font-semibold text-white">
                          ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                        </td>

                        <td className={`py-4 px-6 text-right font-mono font-semibold ${isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                          <span className="inline-flex items-center gap-1 justify-end">
                            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                            {isPositive ? '+' : ''}{asset.change24h.toFixed(2)}%
                          </span>
                        </td>

                        <td className="py-4 px-6 text-right font-mono text-[#8F96A3] hidden sm:table-cell">
                          ${(asset.volume24hUsd / 1e6).toFixed(1)}M
                        </td>

                        <td className="py-4 px-6 text-right font-mono text-[#8F96A3] hidden md:table-cell">
                          ${(asset.marketCapUsd / 1e9).toFixed(2)}B
                        </td>

                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => onToggleWatchlist(asset.id)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isStarred ? 'text-[#C8F135] bg-[#C8F135]/10' : 'text-[#5A6272] hover:text-white hover:bg-white/5'
                            }`}
                          >
                            <Star className="w-4 h-4 fill-current" />
                          </button>
                        </td>

                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => onTradeAsset(asset)}
                            className="px-3 py-1.5 rounded-lg bg-white/[0.08] hover:bg-[#C8F135] text-white hover:text-[#090A0E] text-xs font-semibold transition-all"
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
        </section>
      </main>

      <LandingFooter
        onOpenRiskDisclosure={onOpenRiskDisclosure}
        onEnterDashboard={onEnterDashboard}
        onNavigateHome={onNavigateHome}
        onNavigateMarkets={onNavigateMarkets}
        onNavigateInvestments={onNavigateInvestments}
        onNavigateHowItWorks={onNavigateHowItWorks}
        onNavigateAbout={onNavigateAbout}
        onNavigateSecurity={onNavigateSecurity}
        onNavigateLegal={onNavigateLegal}
        onNavigateSupport={onNavigateSupport}
        onNavigateLogin={onNavigateLogin}
        onNavigateSignUp={onNavigateSignUp}
      />
    </div>
  );
};
