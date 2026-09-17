import React, { useState } from 'react';
import { ArrowRight, TrendingUp, ShieldCheck, Zap, Lock, ChevronUp } from 'lucide-react';
import { formatCurrency, PORTFOLIO_TIMEFRAME_DATA } from '../../data/mockData';
import { InteractiveChart } from '../common/InteractiveChart';
import { Timeframe } from '../../types';

interface LandingHeroProps {
  onStartInvesting?: () => void;
  onGetStarted?: () => void;
  onExploreMarkets: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartInvesting,
  onGetStarted,
  onExploreMarkets,
}) => {
  const [heroTimeframe, setHeroTimeframe] = useState<Timeframe>('1D');
  const chartData = PORTFOLIO_TIMEFRAME_DATA[heroTimeframe];
  const handleStart = onStartInvesting || onGetStarted || (() => {});

  return (
    <section id="hero" className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background glow & subtle grid line styling */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none opacity-40">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[620px] h-[320px] bg-[#C8F135]/[0.07] blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#13161F] border border-white/10 text-xs text-[#D1D5DB]">
            <span className="w-2 h-2 rounded-full bg-[#C8F135] animate-pulse" />
            <span className="font-semibold text-white">Veyra Prime 2.0</span>
            <span className="text-[#5A6272]">•</span>
            <span>Institutional-grade custody & smart routing</span>
          </div>
        </div>

        {/* Hero Copy */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
            Invest in Digital Assets With Confidence.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#8F96A3] leading-relaxed max-w-2xl mx-auto font-normal">
            Veyra gives you a smarter way to invest, manage, and monitor digital assets from one secure platform.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleStart}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#C8F135] text-[#090A0E] font-bold text-base hover:bg-[#d5fb46] transition-all shadow-[0_4px_32px_rgba(200,241,53,0.22)] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Start Investing
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onExploreMarkets}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#131620] hover:bg-[#181B26] text-white font-semibold text-base border border-white/10 transition-all flex items-center justify-center"
            >
              Explore Markets
            </button>
          </div>

          {/* Trust badges row */}
          <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-8 text-xs text-[#8F96A3]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C8F135]" />
              <span>SOC2 Type II Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#C8F135]" />
              <span>1:1 Asset Reserve Ratio</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#C8F135]" />
              <span>Sub-millisecond Execution</span>
            </div>
          </div>
        </div>

        {/* Sophisticated Veyra Investment Dashboard Preview */}
        <div className="mt-16 sm:mt-20 max-w-6xl mx-auto">
          <div className="rounded-3xl p-1 sm:p-2 bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent shadow-[0_24px_80px_rgba(0,0,0,0.8)] border border-white/[0.08]">
            <div className="bg-[#0C0E14] rounded-[22px] border border-white/[0.07] overflow-hidden">
              
              {/* Fake Dashboard Top Toolbar */}
              <div className="px-6 py-4 bg-[#10131B] border-b border-white/[0.06] flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <div className="h-4 w-[1px] bg-white/10 mx-1" />
                  <span className="text-xs font-semibold text-[#8F96A3] tracking-wide">
                    VEYRA BROKERAGE TERMINAL
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#10B981]/10 text-[#10B981]">
                    MARKETS LIVE
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#8F96A3] font-mono-num">
                  <span className="hidden md:inline">CUSTODY: ANCHOR VAULT</span>
                  <span className="text-white font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    STABLE 12.4ms
                  </span>
                </div>
              </div>

              {/* Main Preview Content Grid */}
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left 8 Cols: Portfolio Value & Interactive Performance Chart */}
                  <div className="lg:col-span-8 flex flex-col justify-between">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div>
                        <span className="text-xs font-medium text-[#8F96A3] uppercase tracking-wider">
                          Total Portfolio Value
                        </span>
                        <div className="flex items-baseline gap-3 mt-1">
                          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-mono-num">
                            $128,420.84
                          </h2>
                          <div className="flex items-center text-sm font-semibold text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-lg font-mono-num">
                            <ChevronUp className="w-4 h-4 mr-0.5" />
                            +$2,841.24 (+2.26%)
                          </div>
                        </div>
                      </div>

                      {/* Timeframe pill selector */}
                      <div className="flex items-center bg-[#131620] p-1 rounded-xl border border-white/[0.08]">
                        {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as Timeframe[]).map((tf) => (
                          <button
                            key={tf}
                            onClick={() => setHeroTimeframe(tf)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                              heroTimeframe === tf
                                ? 'bg-[#C8F135] text-[#090A0E] font-bold shadow-sm'
                                : 'text-[#8F96A3] hover:text-white'
                            }`}
                          >
                            {tf}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Chart Canvas */}
                    <div className="w-full">
                      <InteractiveChart
                        data={chartData}
                        timeframe={heroTimeframe}
                        height={260}
                        showTimeframeSelector={false}
                        accentColor="#C8F135"
                      />
                    </div>
                  </div>

                  {/* Right 4 Cols: Asset Allocation & Key Portfolio Metrics */}
                  <div className="lg:col-span-4 bg-[#11141C] p-5 sm:p-6 rounded-2xl border border-white/[0.07] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                        <h3 className="text-sm font-semibold text-white">Portfolio Allocation</h3>
                        <span className="text-[11px] text-[#8F96A3] font-mono-num">6 Assets</span>
                      </div>

                      {/* Visual Allocation Stack Bar */}
                      <div className="mt-4 w-full h-2 rounded-full overflow-hidden flex bg-white/5">
                        <div style={{ width: '53%' }} className="bg-[#F7931A]" title="Bitcoin 53%" />
                        <div style={{ width: '25%' }} className="bg-[#627EEA]" title="Ethereum 25%" />
                        <div style={{ width: '8.2%' }} className="bg-[#14F195]" title="Solana 8.2%" />
                        <div style={{ width: '7.4%' }} className="bg-[#26A17B]" title="Stablecoins 7.4%" />
                        <div style={{ width: '6.4%' }} className="bg-[#C8F135]" title="Other 6.4%" />
                      </div>

                      {/* Assets Breakdown List */}
                      <div className="mt-5 space-y-3.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#F7931A]" />
                            <span className="font-medium text-white">Bitcoin (BTC)</span>
                          </div>
                          <div className="text-right font-mono-num">
                            <span className="font-semibold text-white">$68,142.10</span>
                            <span className="text-[#8F96A3] ml-2 text-[11px]">53.0%</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#627EEA]" />
                            <span className="font-medium text-white">Ethereum (ETH)</span>
                          </div>
                          <div className="text-right font-mono-num">
                            <span className="font-semibold text-white">$32,495.32</span>
                            <span className="text-[#8F96A3] ml-2 text-[11px]">25.3%</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#14F195]" />
                            <span className="font-medium text-white">Solana (SOL)</span>
                          </div>
                          <div className="text-right font-mono-num">
                            <span className="font-semibold text-white">$10,529.29</span>
                            <span className="text-[#8F96A3] ml-2 text-[11px]">8.2%</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#26A17B]" />
                            <span className="font-medium text-white">Stablecoins (USDT/C)</span>
                          </div>
                          <div className="text-right font-mono-num">
                            <span className="font-semibold text-white">$9,504.84</span>
                            <span className="text-[#8F96A3] ml-2 text-[11px]">7.4%</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#C8F135]" />
                            <span className="font-medium text-white">Other Assets</span>
                          </div>
                          <div className="text-right font-mono-num">
                            <span className="font-semibold text-white">$7,749.29</span>
                            <span className="text-[#8F96A3] ml-2 text-[11px]">6.1%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Quick Action Bar */}
                    <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                      <div className="text-xs">
                        <span className="text-[#8F96A3] block">Cash Reserve</span>
                        <span className="font-semibold text-white font-mono-num">$12,500.00</span>
                      </div>
                      <button
                        onClick={onStartInvesting}
                        className="px-3.5 py-1.5 rounded-xl bg-[#C8F135]/15 hover:bg-[#C8F135]/25 text-[#C8F135] text-xs font-semibold transition-all border border-[#C8F135]/30"
                      >
                        Trade Asset
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
