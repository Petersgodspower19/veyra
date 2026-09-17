import React, { useState } from 'react';
import { Timeframe } from '../../types';
import { formatCurrency, PORTFOLIO_TIMEFRAME_DATA } from '../../data/mockData';
import { InteractiveChart } from '../common/InteractiveChart';
import { TrendingUp, ArrowUpRight, PieChart, ShieldAlert, Sparkles } from 'lucide-react';

interface PortfolioPreviewSectionProps {
  onOpenDashboard: () => void;
  onTradeNow: () => void;
}

export const PortfolioPreviewSection: React.FC<PortfolioPreviewSectionProps> = ({
  onOpenDashboard,
  onTradeNow,
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('1M');
  const chartData = PORTFOLIO_TIMEFRAME_DATA[selectedTimeframe];

  return (
    <section id="portfolio-preview" className="py-24 bg-[#090A0E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#C8F135] mb-2 font-mono">
            Veyra Wealth Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Institutional-Grade Portfolio Oversight
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#8F96A3] leading-relaxed">
            Engineered with the rigor of private wealth management. Real-time valuation updates, automated tax-lot accounting, and holistic allocation discipline.
          </p>
        </div>

        {/* Big Premium Portfolio Card */}
        <div className="bg-[#0E1017] rounded-3xl border border-white/[0.08] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8F135]/[0.03] blur-[100px] pointer-events-none rounded-full" />

          {/* Top Row: Portfolio Balances & Timeframe Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 border-b border-white/[0.07] gap-6">
            <div>
              <span className="text-xs font-semibold text-[#8F96A3] uppercase tracking-wider">
                Total Portfolio Value
              </span>
              <div className="flex flex-wrap items-baseline gap-4 mt-1.5">
                <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono-num tracking-tight">
                  $128,420.84
                </span>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#10B981]/10 text-[#10B981] font-semibold text-sm font-mono-num">
                  <TrendingUp className="w-4 h-4" />
                  <span>+$2,841.24 (+2.26%)</span>
                  <span className="text-xs text-[#8F96A3] font-normal ml-1">Today</span>
                </div>
              </div>
            </div>

            {/* Timeframe selector & Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center bg-[#131620] p-1 rounded-xl border border-white/[0.08]">
                {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as Timeframe[]).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      selectedTimeframe === tf
                        ? 'bg-[#C8F135] text-[#090A0E] font-bold shadow-md'
                        : 'text-[#8F96A3] hover:text-white'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              <button
                onClick={onOpenDashboard}
                className="px-4 py-2 rounded-xl bg-[#1B202D] hover:bg-[#23293A] text-white text-xs font-semibold border border-white/10 transition-all flex items-center gap-1.5"
              >
                <span>Full Analytics</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C8F135]" />
              </button>
            </div>
          </div>

          {/* Center: Large Interactive Portfolio Performance Graph */}
          <div className="py-8">
            <InteractiveChart
              data={chartData}
              timeframe={selectedTimeframe}
              height={320}
              showTimeframeSelector={false}
              accentColor="#C8F135"
            />
          </div>

          {/* Bottom: Portfolio Allocation Breakdown Grid */}
          <div className="pt-8 border-t border-white/[0.07]">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-[#C8F135]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Target Asset Allocation
                </h3>
              </div>
              <span className="text-xs text-[#8F96A3] font-mono-num">
                Rebalancing: Automated Drift Guard Active
              </span>
            </div>

            {/* Visual allocation bar */}
            <div className="w-full h-3 rounded-full overflow-hidden flex bg-white/5 mb-6">
              <div style={{ width: '53.1%' }} className="bg-[#F7931A]" title="Bitcoin 53.1%" />
              <div style={{ width: '25.3%' }} className="bg-[#627EEA]" title="Ethereum 25.3%" />
              <div style={{ width: '8.2%' }} className="bg-[#14F195]" title="Solana 8.2%" />
              <div style={{ width: '7.4%' }} className="bg-[#26A17B]" title="Stablecoins 7.4%" />
              <div style={{ width: '6.0%' }} className="bg-[#C8F135]" title="Other Assets 6.0%" />
            </div>

            {/* Allocation Pill Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
              <div className="bg-[#12151F] p-4 rounded-xl border border-white/[0.05] hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 text-xs text-[#8F96A3]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F7931A]" />
                  <span>Bitcoin</span>
                </div>
                <div className="mt-2 text-base font-bold text-white font-mono-num">$68,142.10</div>
                <div className="text-xs text-[#8F96A3] font-mono-num mt-0.5">53.1% of portfolio</div>
              </div>

              <div className="bg-[#12151F] p-4 rounded-xl border border-white/[0.05] hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 text-xs text-[#8F96A3]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#627EEA]" />
                  <span>Ethereum</span>
                </div>
                <div className="mt-2 text-base font-bold text-white font-mono-num">$32,495.32</div>
                <div className="text-xs text-[#8F96A3] font-mono-num mt-0.5">25.3% of portfolio</div>
              </div>

              <div className="bg-[#12151F] p-4 rounded-xl border border-white/[0.05] hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 text-xs text-[#8F96A3]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#14F195]" />
                  <span>Solana</span>
                </div>
                <div className="mt-2 text-base font-bold text-white font-mono-num">$10,529.29</div>
                <div className="text-xs text-[#8F96A3] font-mono-num mt-0.5">8.2% of portfolio</div>
              </div>

              <div className="bg-[#12151F] p-4 rounded-xl border border-white/[0.05] hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 text-xs text-[#8F96A3]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#26A17B]" />
                  <span>Stablecoins</span>
                </div>
                <div className="mt-2 text-base font-bold text-white font-mono-num">$9,504.84</div>
                <div className="text-xs text-[#8F96A3] font-mono-num mt-0.5">7.4% of portfolio</div>
              </div>

              <div className="bg-[#12151F] p-4 rounded-xl border border-white/[0.05] hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 text-xs text-[#8F96A3]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C8F135]" />
                  <span>Other Assets</span>
                </div>
                <div className="mt-2 text-base font-bold text-white font-mono-num">$7,749.29</div>
                <div className="text-xs text-[#8F96A3] font-mono-num mt-0.5">6.0% of portfolio</div>
              </div>
            </div>

            {/* Bottom CTA Row */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/[0.05] gap-4">
              <span className="text-xs text-[#8F96A3]">
                Available liquid fiat cash ready for deployment: <strong className="text-white font-mono-num">$12,500.00</strong>
              </span>
              <button
                onClick={onTradeNow}
                className="px-6 py-2.5 rounded-xl bg-[#C8F135] text-[#090A0E] font-bold text-xs hover:bg-[#d5fb46] transition-all shadow-md active:scale-95"
              >
                Execute Trade Order
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
