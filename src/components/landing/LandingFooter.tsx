import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface LandingFooterProps {
  onOpenRiskDisclosure: () => void;
  onEnterDashboard: () => void;
  onScrollTo?: (sectionId: string) => void;
  onNavigateHome?: () => void;
  onNavigateMarkets?: () => void;
  onNavigateInvestments?: () => void;
  onNavigateHowItWorks?: () => void;
  onNavigateAbout?: () => void;
  onNavigateSecurity?: () => void;
  onNavigateLegal?: (tab: 'terms' | 'privacy' | 'aml' | 'fees') => void;
  onNavigateSupport?: () => void;
  onNavigateLogin?: () => void;
  onNavigateSignUp?: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({
  onOpenRiskDisclosure,
  onEnterDashboard,
  onScrollTo,
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
}) => {
  const handleScroll = (id: string) => {
    if (onScrollTo) {
      onScrollTo(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#07080B] border-t border-white/[0.08] text-[#8F96A3] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={onNavigateHome || (() => handleScroll('hero'))}>
              <div className="w-9 h-9 rounded-xl bg-[#141822] border border-white/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#C8F135]">
                  <path d="M4 4L12 20L20 4H15.5L12 11.5L8.5 4H4Z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Veyra
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8F135]" />
              </span>
            </div>
            <p className="text-sm text-[#8F96A3] max-w-sm leading-relaxed">
              "Invest in Digital Assets With Confidence."
            </p>
            <p className="text-xs text-[#5A6272] max-w-sm leading-relaxed">
              Next-generation institutional brokerage and digital asset custody designed for disciplined private wealth allocation.
            </p>
            <div className="pt-2">
              <button
                onClick={onEnterDashboard}
                className="text-xs font-semibold text-[#C8F135] hover:underline flex items-center gap-1"
              >
                Access Investor Terminal
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Col 1: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onNavigateMarkets || (() => handleScroll('markets'))}
                  className="hover:text-white transition-colors"
                >
                  Live Markets
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateInvestments || (() => handleScroll('portfolio-preview'))}
                  className="hover:text-white transition-colors"
                >
                  Portfolio Analytics
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateHowItWorks || (() => handleScroll('how-it-works'))}
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateAbout || (() => handleScroll('why-veyra'))}
                  className="hover:text-white transition-colors"
                >
                  Company Overview
                </button>
              </li>
              <li>
                <button onClick={onEnterDashboard} className="hover:text-white transition-colors">
                  Institutional Terminal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Security & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Security</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onNavigateSecurity || (() => handleScroll('security'))}
                  className="hover:text-white transition-colors"
                >
                  Defense-in-Depth
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateSecurity || (() => handleScroll('security'))}
                  className="hover:text-white transition-colors"
                >
                  Multi-Party Computation
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateSecurity || (() => handleScroll('security'))}
                  className="hover:text-white transition-colors"
                >
                  Cold Storage Reserves
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateSecurity || (() => handleScroll('security'))}
                  className="hover:text-white transition-colors"
                >
                  Withdrawal Delays
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateSecurity || (() => handleScroll('security'))}
                  className="hover:text-white transition-colors"
                >
                  SOC2 Type II Compliance
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Compliance & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Legal & Risk</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenRiskDisclosure} className="text-[#C8F135] hover:underline font-medium">
                  Risk Disclosure Notice
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateLegal ? onNavigateLegal('terms') : onOpenRiskDisclosure()}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms of Brokerage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateLegal ? onNavigateLegal('privacy') : onOpenRiskDisclosure()}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy & Data Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateLegal ? onNavigateLegal('aml') : onOpenRiskDisclosure()}
                  className="hover:text-white transition-colors text-left"
                >
                  AML / KYC Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateLegal ? onNavigateLegal('fees') : onOpenRiskDisclosure()}
                  className="hover:text-white transition-colors text-left"
                >
                  Institutional Fee Schedules
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Support & Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Support & Gateway</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onNavigateSupport}
                  className="hover:text-white transition-colors text-left"
                >
                  Help Desk & FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateSupport}
                  className="hover:text-white transition-colors text-left"
                >
                  Institutional Desk Hotline
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateLogin}
                  className="hover:text-[#C8F135] transition-colors text-left font-semibold"
                >
                  Investor Portal Sign In &rr;
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateSignUp}
                  className="hover:text-[#C8F135] transition-colors text-left"
                >
                  Open Verified Account
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 text-[11px] leading-relaxed text-[#5A6272] space-y-3">
          <p>
            Veyra Technologies Inc. is a financial technology company and registered digital asset brokerage. Digital asset trading involves substantial risk of loss and is not suitable for every investor. The valuation of digital assets may fluctuate, and as a result, clients may lose more than their original investment. Veyra does not provide investment, tax, or legal advice.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-4 text-[#8F96A3]">
            <span>© {new Date().getFullYear()} Veyra Technologies Inc. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <button onClick={onOpenRiskDisclosure} className="hover:text-white transition-colors">Risk Disclosure</button>
              <button onClick={onEnterDashboard} className="hover:text-white transition-colors">Demo Mode</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
