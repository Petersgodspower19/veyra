import React, { useState } from 'react';
import {
  PieChart,
  ShieldCheck,
  TrendingUp,
  Zap,
  ArrowRight,
  Sliders,
  DollarSign,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  Layers,
} from 'lucide-react';
import { LandingNavbar } from '../landing/LandingNavbar';
import { LandingFooter } from '../landing/LandingFooter';
import { FontTheme } from '../dashboard/DashboardTopBar';

interface InvestmentsPageProps {
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
  onOpenRiskDisclosure: () => void;
}

export const InvestmentsPage: React.FC<InvestmentsPageProps> = ({
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
  onOpenRiskDisclosure,
}) => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(50000);
  const [selectedStrategy, setSelectedStrategy] = useState<'conservative' | 'balanced' | 'growth' | 'yield'>('balanced');
  const [timeHorizon, setTimeHorizon] = useState<number>(3); // Years

  const strategies = {
    conservative: {
      name: 'Defensive Core Index',
      targetReturn: 12.5,
      riskLevel: 'Low-Medium',
      allocation: [
        { name: 'Bitcoin (BTC)', percent: 60, color: '#F7931A' },
        { name: 'Ethereum (ETH)', percent: 30, color: '#627EEA' },
        { name: 'USDC Treasury Yield', percent: 10, color: '#2775CA' },
      ],
      desc: 'Focused on capital preservation, maximum liquidity, and blue-chip sovereign digital asset exposure.',
    },
    balanced: {
      name: 'Veyra Top 10 Balanced Alpha',
      targetReturn: 24.8,
      riskLevel: 'Medium',
      allocation: [
        { name: 'Bitcoin (BTC)', percent: 45, color: '#F7931A' },
        { name: 'Ethereum (ETH)', percent: 25, color: '#627EEA' },
        { name: 'Solana & L1 Core', percent: 20, color: '#14F195' },
        { name: 'DeFi Liquid Staking', percent: 10, color: '#C8F135' },
      ],
      desc: 'Optimal risk-adjusted growth balancing mega-cap store of value assets with high-speed L1 infrastructure.',
    },
    growth: {
      name: 'High Beta Innovation Index',
      targetReturn: 42.0,
      riskLevel: 'High',
      allocation: [
        { name: 'Solana & L1 Core', percent: 35, color: '#14F195' },
        { name: 'AI & Compute Infrastructure', percent: 30, color: '#A855F7' },
        { name: 'DeFi & RWA Protocols', percent: 25, color: '#3B82F6' },
        { name: 'Bitcoin (BTC)', percent: 10, color: '#F7931A' },
      ],
      desc: 'Aggressive growth trajectory capturing outsized returns across AI compute networks and decentralized tokenized assets.',
    },
    yield: {
      name: 'Institutional Staking Yield Optimizer',
      targetReturn: 16.4,
      riskLevel: 'Low-Medium',
      allocation: [
        { name: 'ETH Liquid Staking (stETH)', percent: 40, color: '#627EEA' },
        { name: 'Solana Staking (SOL)', percent: 35, color: '#14F195' },
        { name: 'USDC Real World Yield', percent: 25, color: '#2775CA' },
      ],
      desc: 'Automated proof-of-stake yield generation with monthly compounding and hardware MPC custody isolation.',
    },
  };

  const currentStrat = strategies[selectedStrategy];

  // Calculate projected return
  const projectedFutureValue = Math.round(
    investmentAmount * Math.pow(1 + currentStrat.targetReturn / 100, timeHorizon)
  );

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
        activePage="investments"
      />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative pt-12 pb-16 border-b border-white/[0.08] overflow-hidden bg-gradient-to-b from-[#121520]/80 via-[#090A0E] to-[#090A0E]">
          <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#C8F135]/5 blur-[140px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8F135]/10 border border-[#C8F135]/20 text-[#C8F135] text-xs font-mono mb-4">
                <PieChart className="w-3.5 h-3.5" />
                <span>INSTITUTIONAL WEALTH MANAGEMENT</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Disciplined <span className="text-[#C8F135]">Digital Asset</span> Strategies
              </h1>
              <p className="mt-4 text-sm sm:text-base text-[#8F96A3] leading-relaxed">
                Empowering family offices, accredited investors, and private clients with algorithmically rebalanced portfolios, proof-of-stake yields, and cold hardware custody.
              </p>
            </div>
          </div>
        </section>

        {/* Strategy Explorer & Yield Simulator */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Controls & Simulator */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-[#121520] border border-white/[0.08] space-y-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-[#C8F135]" />
                  Portfolio Yield Calculator
                </h3>

                {/* Investment Amount Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs text-[#8F96A3] mb-2 font-mono">
                    <span>Initial Capital allocation</span>
                    <span className="text-white font-bold text-sm">${investmentAmount.toLocaleString()} USD</span>
                  </div>
                  <input
                    type="range"
                    min={5000}
                    max={500000}
                    step={5000}
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="w-full accent-[#C8F135] bg-[#181C28] h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#5A6272] mt-1 font-mono">
                    <span>$5,000</span>
                    <span>$250,000</span>
                    <span>$500,000+</span>
                  </div>
                </div>

                {/* Time Horizon Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs text-[#8F96A3] mb-2 font-mono">
                    <span>Holding Duration</span>
                    <span className="text-white font-bold text-sm">{timeHorizon} Years</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={timeHorizon}
                    onChange={(e) => setTimeHorizon(Number(e.target.value))}
                    className="w-full accent-[#C8F135] bg-[#181C28] h-2 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Strategy Selection */}
                <div>
                  <span className="text-xs text-[#8F96A3] uppercase font-mono tracking-wider block mb-3">
                    Select Strategy Model
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'conservative', label: 'Defensive' },
                      { id: 'balanced', label: 'Top 10 Balanced' },
                      { id: 'growth', label: 'High Beta AI' },
                      { id: 'yield', label: 'Yield Staking' },
                    ].map((strat) => (
                      <button
                        key={strat.id}
                        onClick={() => setSelectedStrategy(strat.id as any)}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          selectedStrategy === strat.id
                            ? 'bg-[#C8F135]/15 border-[#C8F135] text-white'
                            : 'bg-[#181C28] border-white/[0.06] text-[#8F96A3] hover:text-white'
                        }`}
                      >
                        <span className="text-xs font-bold block">{strat.label}</span>
                        <span className="text-[10px] text-[#C8F135] font-mono mt-0.5 block">
                          ~{strategies[strat.id as keyof typeof strategies].targetReturn}% APY
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Return Projection Box */}
                <div className="p-4 rounded-xl bg-[#090A0E] border border-white/[0.08] space-y-2">
                  <span className="text-xs text-[#8F96A3] font-mono uppercase block">Estimated Projected Valuation</span>
                  <div className="text-2xl font-extrabold font-mono text-[#C8F135]">
                    ${projectedFutureValue.toLocaleString()} USD
                  </div>
                  <div className="text-[11px] text-[#10B981] flex items-center gap-1 font-mono">
                    <TrendingUp className="w-3.5 h-3.5" />
                    +${(projectedFutureValue - investmentAmount).toLocaleString()} net estimated gain
                  </div>
                </div>

                <button
                  onClick={onNavigateSignUp}
                  className="w-full py-3 rounded-xl bg-[#C8F135] text-[#090A0E] font-bold text-sm hover:bg-[#d5f758] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C8F135]/20"
                >
                  <span>Deploy Strategy in Terminal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Breakdown & Allocations */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-8 rounded-2xl bg-[#121520] border border-white/[0.08] space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{currentStrat.name}</h2>
                    <p className="text-xs text-[#8F96A3] mt-1">{currentStrat.desc}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#8F96A3] font-mono block">Target Historical Return</span>
                    <span className="text-2xl font-extrabold font-mono text-[#C8F135]">
                      +{currentStrat.targetReturn}%
                    </span>
                  </div>
                </div>

                {/* Allocation Progress Bars */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono text-[#8F96A3] uppercase tracking-wider">
                    Target Asset Weighting Breakdown
                  </h4>
                  
                  {currentStrat.allocation.map((item) => (
                    <div key={item.name} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-white flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                          {item.name}
                        </span>
                        <span className="font-mono text-[#C8F135]">{item.percent}%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-[#181C28] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/[0.08]">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#090A0E]/60 border border-white/[0.05]">
                    <ShieldCheck className="w-5 h-5 text-[#C8F135] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-white">Cold MPC Custody</h5>
                      <p className="text-[11px] text-[#8F96A3] mt-0.5">Isolated hardware multi-signature vaults.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#090A0E]/60 border border-white/[0.05]">
                    <Zap className="w-5 h-5 text-[#C8F135] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-white">Smart Auto-Rebalancing</h5>
                      <p className="text-[11px] text-[#8F96A3] mt-0.5">Automated drift corrections to maintain target weights.</p>
                    </div>
                  </div>
                </div>
              </div>
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
