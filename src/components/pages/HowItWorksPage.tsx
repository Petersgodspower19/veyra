import React from 'react';
import {
  UserCheck,
  Building2,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  RefreshCw,
  Wallet,
  Globe2,
} from 'lucide-react';
import { LandingNavbar } from '../landing/LandingNavbar';
import { LandingFooter } from '../landing/LandingFooter';
import { FontTheme } from '../dashboard/DashboardTopBar';

interface HowItWorksPageProps {
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

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
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
  const steps = [
    {
      step: '01',
      title: 'Institutional Onboarding & Verification',
      icon: UserCheck,
      badge: 'Automated KYC/AML',
      desc: 'Complete identity verification in under 3 minutes with enterprise biometric matching and sanctions screening.',
      bullets: [
        'Institutional Tier 1 to Tier 3 corporate verification',
        'Instant Fedwire / SEPA / ACH banking connection',
        'Biometric 2FA & Hardware Security Key (FIDO2) setup',
      ],
    },
    {
      step: '02',
      title: 'Secure Capital Funding',
      icon: Wallet,
      badge: 'Zero Deposit Fees',
      desc: 'Deposit USD, EUR, or transfer digital assets directly into dedicated segregated custody accounts.',
      bullets: [
        'Direct US Fedwire & SWIFT international wire clearing',
        'Segregated institutional omnibus treasury accounts',
        'Real-time deposit confirmation & audit log tracking',
      ],
    },
    {
      step: '03',
      title: 'MPC Cryptographic Key Generation',
      icon: Lock,
      badge: 'Zero Single Point of Failure',
      desc: 'Your assets are safeguarded using Multi-Party Computation (MPC), splitting keys across geographically distributed hardware vaults.',
      bullets: [
        'Threshold signature scheme (2-of-3 / 3-of-5 quorums)',
        'SOC 2 Type II certified cold storage architecture',
        '$250M institutional crime insurance policy backed by Lloyd’s syndicates',
      ],
    },
    {
      step: '04',
      title: 'Smart Order Execution & Yield Management',
      icon: RefreshCw,
      badge: 'Smart Order Routing',
      desc: 'Execute trades with deep liquidity across top-tier venues or deploy capital into automated yield portfolios.',
      bullets: [
        'Sub-millisecond smart order routing engine',
        'Automated rebalancing according to target risk parameters',
        'Comprehensive tax-lot reports and downloadable audit statements',
      ],
    },
  ];

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
        activePage="how-it-works"
      />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative pt-12 pb-16 border-b border-white/[0.08] overflow-hidden bg-gradient-to-b from-[#121520]/80 via-[#090A0E] to-[#090A0E]">
          <div className="absolute top-0 left-1/3 w-[600px] h-[350px] bg-[#C8F135]/5 blur-[150px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8F135]/10 border border-[#C8F135]/20 text-[#C8F135] text-xs font-mono mb-4">
              <Cpu className="w-3.5 h-3.5" />
              <span>THE VEYRA INFRASTRUCTURE PROCESS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              How Veyra Works for <span className="text-[#C8F135]">Your Wealth</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[#8F96A3] leading-relaxed">
              From instant onboarding to multi-party cryptographic custody and sub-millisecond order execution — engineered for precision.
            </p>
          </div>
        </section>

        {/* 4-Step Process Section */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="p-8 sm:p-10 rounded-3xl bg-[#121520] border border-white/[0.08] relative overflow-hidden group hover:border-[#C8F135]/30 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-10 text-6xl font-extrabold font-mono text-white select-none">
                    {s.step}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
                    <div className="md:col-span-1 flex items-center">
                      <div className="w-14 h-14 rounded-2xl bg-[#181C28] border border-[#C8F135]/30 flex items-center justify-center text-[#C8F135] group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7" />
                      </div>
                    </div>

                    <div className="md:col-span-6 space-y-3">
                      <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/[0.06] text-[11px] font-mono text-[#C8F135]">
                        {s.badge}
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        <span className="text-[#C8F135] font-mono mr-2">{s.step}.</span>
                        {s.title}
                      </h3>
                      <p className="text-sm text-[#8F96A3] leading-relaxed">{s.desc}</p>
                    </div>

                    <div className="md:col-span-5 bg-[#090A0E] p-5 rounded-2xl border border-white/[0.06] space-y-2.5">
                      <span className="text-[10px] font-mono text-[#5A6272] uppercase tracking-wider block">
                        Key Architecture Details
                      </span>
                      {s.bullets.map((b) => (
                        <div key={b} className="flex items-start gap-2.5 text-xs text-white">
                          <CheckCircle2 className="w-4 h-4 text-[#C8F135] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA Banner */}
          <div className="mt-16 p-10 rounded-3xl bg-gradient-to-r from-[#141822] via-[#121520] to-[#1A1F2C] border border-[#C8F135]/30 text-center space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#C8F135]/5 pointer-events-none" />
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Access Institutional Digital Asset Custody?
            </h3>
            <p className="text-sm text-[#8F96A3] max-w-xl mx-auto">
              Create your account in minutes. No minimal deposit locks, zero hidden fees, 100% transparent execution.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={onNavigateSignUp}
                className="px-8 py-3.5 rounded-xl bg-[#C8F135] text-[#090A0E] font-bold text-sm hover:bg-[#d5f758] transition-all flex items-center gap-2 shadow-xl shadow-[#C8F135]/20"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
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
