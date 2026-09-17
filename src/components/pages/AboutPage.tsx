import React from 'react';
import {
  Building2,
  Shield,
  Award,
  Globe,
  Users,
  CheckCircle,
  ArrowUpRight,
  Lock,
  Cpu,
  TrendingUp,
} from 'lucide-react';
import { LandingNavbar } from '../landing/LandingNavbar';
import { LandingFooter } from '../landing/LandingFooter';
import { FontTheme } from '../dashboard/DashboardTopBar';

interface AboutPageProps {
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

export const AboutPage: React.FC<AboutPageProps> = ({
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
  const stats = [
    { label: 'Cumulative Order Volume', value: '$4.8B+' },
    { label: 'Institutional Assets Custodied', value: '$1.2B' },
    { label: 'Platform Availability Uptime', value: '99.99%' },
    { label: 'Global Registered Clients', value: '120,000+' },
  ];

  const coreValues = [
    {
      icon: Shield,
      title: 'Security-First Architecture',
      desc: 'We place cryptographic key protection and zero single points of failure at the center of every engineering decision.',
    },
    {
      icon: Cpu,
      title: 'Algorithmic Precision',
      desc: 'Our sub-millisecond matching engine routes orders across global venues with minimal slippage and optimal pricing.',
    },
    {
      icon: Award,
      title: 'Radical Fee Transparency',
      desc: 'No hidden markup on spread, zero surprise transfer fees. Clear institutional fee schedules accessible upfront.',
    },
    {
      icon: Lock,
      title: 'Client Asset Sovereignty',
      desc: 'Client funds are strictly segregated and never rehypothecated or leveraged without explicit client authorization.',
    },
  ];

  const leadership = [
    {
      name: 'Elena Rostova',
      role: 'Co-Founder & Chief Executive Officer',
      bio: 'Former VP of Institutional Trading at Barclays Capital with 15+ years experience in quantitative asset management.',
    },
    {
      name: 'Marcus Vance',
      role: 'Chief Technology Officer',
      bio: 'Ex-Senior Cryptographer at ConsenSys and distributed systems lead with background in MPC protocol design.',
    },
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Risk & Compliance Officer',
      bio: 'Former SEC Regulatory Affairs Director specializing in digital asset compliance, FinCEN AML frameworks, and SOC2.',
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
        activePage="about"
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-12 pb-16 border-b border-white/[0.08] overflow-hidden bg-gradient-to-b from-[#121520]/80 via-[#090A0E] to-[#090A0E]">
          <div className="absolute top-0 right-1/3 w-[600px] h-[350px] bg-[#C8F135]/5 blur-[150px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8F135]/10 border border-[#C8F135]/20 text-[#C8F135] text-xs font-mono mb-4">
              <Building2 className="w-3.5 h-3.5" />
              <span>ABOUT VEYRA TECHNOLOGIES</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Bridging Institutional Capital with <span className="text-[#C8F135]">Digital Assets</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[#8F96A3] leading-relaxed">
              Veyra was founded with a singular purpose: to deliver ultra-secure, institutional-grade brokerage infrastructure for private wealth, family offices, and disciplined crypto investors worldwide.
            </p>
          </div>
        </section>

        {/* Key Platform Stats */}
        <section className="py-12 border-b border-white/[0.08] bg-[#0E1018]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((st) => (
                <div key={st.label} className="p-4">
                  <div className="text-2xl sm:text-4xl font-extrabold font-mono text-[#C8F135]">
                    {st.value}
                  </div>
                  <div className="text-xs text-[#8F96A3] mt-1 font-mono uppercase tracking-wider">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Core Principles</h2>
            <p className="text-sm text-[#8F96A3] mt-2">
              Guided by rigorous financial engineering and uncompromising security standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="p-6 rounded-2xl bg-[#121520] border border-white/[0.08] space-y-3 hover:border-[#C8F135]/40 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#181C28] border border-[#C8F135]/30 flex items-center justify-center text-[#C8F135]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">{v.title}</h3>
                  <p className="text-xs text-[#8F96A3] leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 bg-[#0E1018] border-t border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Leadership & Executive Team</h2>
              <p className="text-sm text-[#8F96A3] mt-2">
                Combining decades of traditional Wall Street leadership with cutting-edge blockchain cryptography.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadership.map((m) => (
                <div key={m.name} className="p-6 rounded-2xl bg-[#121520] border border-white/[0.08] space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#181C28] border border-white/10 flex items-center justify-center font-bold text-lg text-[#C8F135]">
                    {m.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{m.name}</h4>
                    <span className="text-xs text-[#C8F135] font-mono block">{m.role}</span>
                  </div>
                  <p className="text-xs text-[#8F96A3] leading-relaxed pt-2 border-t border-white/[0.06]">
                    {m.bio}
                  </p>
                </div>
              ))}
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
