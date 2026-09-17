import React from 'react';
import { Shield, Activity, BarChart3, Receipt, CheckCircle, ArrowRight } from 'lucide-react';

interface WhyVeyraSectionProps {
  onLearnMore?: () => void;
}

export const WhyVeyraSection: React.FC<WhyVeyraSectionProps> = ({ onLearnMore }) => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Asset Management',
      description:
        'Keep your investments protected with modern account and transaction security, cold-storage isolation, and multi-party quorum authorization.',
      metric: '99.9% in Cold Storage',
      tag: 'CUSTODIAL INTEGRITY',
    },
    {
      icon: Activity,
      title: 'Real-Time Market Data',
      description:
        'Track asset prices and market movements with up-to-date information, consolidated volume indexing, and low-latency tick streams.',
      metric: '< 15ms Latency Feed',
      tag: 'STREAMING DEPTH',
    },
    {
      icon: BarChart3,
      title: 'Simple Portfolio Management',
      description:
        'Understand your portfolio at a glance and monitor your investments effortlessly with automated PnL calculation and allocation metrics.',
      metric: 'Holistic Wealth View',
      tag: 'CLARITY FIRST',
    },
    {
      icon: Receipt,
      title: 'Transparent Fees',
      description:
        'Clearly communicate transaction and brokerage fees before users confirm an investment. No hidden markups or surprise execution spreads.',
      metric: '0.15% Standard Fee',
      tag: 'ZERO HIDDEN COSTS',
    },
  ];

  return (
    <section id="why-veyra" className="py-24 bg-[#0A0C10] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#C8F135] mb-2 font-mono">
            The Veyra Standard
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Why Discerning Investors Choose Veyra
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#8F96A3] leading-relaxed">
            Eliminating the complexity, noise, and friction of digital assets through disciplined financial engineering and private wealth elegance.
          </p>
        </div>

        {/* 4 Premium Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={idx}
                className="bg-[#0E1017] rounded-2xl border border-white/[0.07] p-8 hover:border-white/[0.15] transition-all hover:translate-y-[-2px] group relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#141824] border border-white/10 flex items-center justify-center text-[#C8F135] group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold tracking-wider text-[#8F96A3] uppercase px-3 py-1 rounded-full bg-white/[0.04]">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#8F96A3] leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <span className="text-white font-semibold font-mono-num flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C8F135]" />
                    {feat.metric}
                  </span>
                  <span className="text-[#8F96A3] group-hover:text-white transition-colors flex items-center gap-1">
                    Standard Specification
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
