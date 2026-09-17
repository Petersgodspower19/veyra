import React from 'react';
import { UserCheck, Wallet2, BarChart2, ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  onStartAccount: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onStartAccount }) => {
  const steps = [
    {
      num: '01',
      title: 'Create Your Account',
      description: 'Sign up and complete the required verification process with secure, encrypted identity onboarding in minutes.',
      icon: UserCheck,
      details: ['Tier 1 & Tier 2 Instant KYC', 'Biometric & FIDO2 Security', 'Automated Compliance Check'],
    },
    {
      num: '02',
      title: 'Fund Your Account',
      description: 'Add funds using supported payment methods including seamless zero-fee ACH bank transfers, Fedwire, and crypto deposits.',
      icon: Wallet2,
      details: ['Same-day ACH Settlement', 'Direct Federal Wire Clearing', 'Multi-currency Support'],
    },
    {
      num: '03',
      title: 'Invest & Monitor',
      description: 'Choose digital assets, invest, and track your portfolio from your Veyra dashboard with real-time analytics and alerts.',
      icon: BarChart2,
      details: ['Smart Order Execution', 'Real-time PnL & Cost Basis', 'Configurable Risk Guardrails'],
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#090A0E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#C8F135] mb-2 font-mono">
            Seamless Onboarding
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How Veyra Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#8F96A3] leading-relaxed">
            Begin allocating capital into digital assets through a structured, compliant, and streamlined process.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Subtle connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-12 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-[#0E1017] rounded-2xl border border-white/[0.08] p-8 flex flex-col justify-between relative z-10 hover:border-[#C8F135]/40 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-2xl font-black font-mono text-[#C8F135]">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-[#141822] border border-white/10 flex items-center justify-center text-white group-hover:text-[#C8F135] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#8F96A3] leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] space-y-2">
                  {step.details.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-[#5A6272]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8F135]" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA banner below */}
        <div className="mt-14 text-center">
          <button
            onClick={onStartAccount}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#C8F135] text-[#090A0E] font-bold text-sm hover:bg-[#d5fb46] transition-all shadow-[0_0_24px_rgba(200,241,53,0.15)] active:scale-95"
          >
            <span>Create Account & Verify</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
