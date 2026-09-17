import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Server,
  Key,
  FileText,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Shield,
  Layers,
  Clock,
  Building,
} from 'lucide-react';
import { useToast } from '../common/Toast';

interface SecurityPageProps {
  onNavigateHome: () => void;
  onNavigateSignUp: () => void;
  onOpenRiskDisclosure: () => void;
}

export const SecurityPage: React.FC<SecurityPageProps> = ({
  onNavigateHome,
  onNavigateSignUp,
  onOpenRiskDisclosure,
}) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'mpc' | 'cold' | 'compliance' | 'delays'>('mpc');

  const securityChecklist = [
    { label: 'SOC 2 Type II Certified by Big-4 Auditor', status: 'Passed (2025/2026 Audit Cycle)' },
    { label: 'CCSS (CryptoCurrency Security Standard) Level 3', status: 'Compliant' },
    { label: 'Multi-Party Computation (MPC) Key Sharding', status: 'Active (2-of-3 Hardware Co-signing)' },
    { label: 'Mandatory Whitelisting & 24h Time-Locks', status: 'Enforced' },
    { label: 'Hardware Enclave Signature Verification (FIPS 140-2 Level 3)', status: 'Active' },
    { label: 'Segregated Digital Asset Omnibus Depository', status: 'Strictly Isolated from Operational Capital' },
  ];

  return (
    <div className="min-h-screen bg-[#090A0E] text-[#F3F4F6] selection:bg-[#C8F135]/20 selection:text-[#C8F135] flex flex-col justify-between">
      {/* Navbar */}
      <header className="px-6 py-6 border-b border-white/[0.06] flex items-center justify-between max-w-7xl mx-auto w-full sticky top-0 bg-[#090A0E]/90 backdrop-blur-md z-30">
        <div
          onClick={onNavigateHome}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#141822] border border-white/10 flex items-center justify-center group-hover:border-[#C8F135]/40 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#C8F135]">
              <path d="M4 4L12 20L20 4H15.5L12 11.5L8.5 4H4Z" fill="currentColor" />
            </svg>
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              Veyra
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8F135]" />
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#8F96A3] -mt-1 block">
              Security Architecture
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="text-xs font-semibold text-[#8F96A3] hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/[0.04] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Home</span>
          </button>
          <button
            onClick={onNavigateSignUp}
            className="px-4 py-2 rounded-xl bg-[#C8F135] text-[#090A0E] text-xs font-bold hover:bg-[#d5fb46] transition-all flex items-center gap-1.5"
          >
            <span>Open Account</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131722] border border-[#C8F135]/30 text-xs text-[#C8F135] font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>Bank-Grade Institutional Defense</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Cryptographic Custody Engineered for Absolute Resilience
          </h1>
          <p className="text-base text-[#8F96A3] leading-relaxed">
            Veyra rejects single points of failure. Every satoshi, token, and cash reserve under our custody is shielded by multi-party computation, deep cold vaults, and strict regulatory isolation.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.07] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Multi-Party Computation</h3>
            <p className="text-xs text-[#8F96A3] leading-relaxed">
              Private keys never exist as a single complete secret anywhere in memory, in transit, or at rest. Shards are divided across multiple isolated hardware nodes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.07] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">99% Air-Gapped Cold Storage</h3>
            <p className="text-xs text-[#8F96A3] leading-relaxed">
              Over 99% of customer digital assets reside in geographically distributed, air-gapped subterranean bunker facilities protected by biometric access control.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.07] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">24h Time-Locks & Whitelists</h3>
            <p className="text-xs text-[#8F96A3] leading-relaxed">
              Whitelisted destinations require out-of-band video biometric confirmation and a mandatory 24-hour settlement cooldown to thwart unauthorized transfers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.07] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#C8F135]/15 border border-[#C8F135]/30 text-[#C8F135] flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">FDIC Cash Pass-Through</h3>
            <p className="text-xs text-[#8F96A3] leading-relaxed">
              Uninvested US Dollar deposits are held in segregated client omnibus accounts with JP Morgan Chase & Co., eligible for standard FDIC pass-through coverage up to $250,000.
            </p>
          </div>
        </div>

        {/* Verification Checklist Table */}
        <div className="bg-[#0E1017] rounded-3xl border border-white/[0.08] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Institutional Security & Compliance Matrix
              </h2>
              <p className="text-xs text-[#8F96A3] mt-1">
                Real-time compliance validation verified by external cybersecurity audits.
              </p>
            </div>
            <button
              onClick={() =>
                showToast({
                  type: 'info',
                  title: 'Audit Report Request',
                  message: 'The full SOC 2 Type II executive audit package will be provided via secure datalink.',
                })
              }
              className="px-4 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs font-semibold hover:border-white/20 transition-all flex items-center gap-1.5 self-start sm:self-auto"
            >
              <FileText className="w-4 h-4 text-[#C8F135]" />
              <span>Download SOC 2 Summary</span>
            </button>
          </div>

          <div className="divide-y divide-white/[0.04]">
            {securityChecklist.map((item, index) => (
              <div key={index} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C8F135] shrink-0" />
                  <span className="text-sm font-semibold text-white">{item.label}</span>
                </div>
                <span className="text-xs font-mono text-[#8F96A3] bg-[#121520] px-3 py-1 rounded-full border border-white/[0.06] self-start sm:self-auto">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#121522] to-[#0D1017] border border-[#C8F135]/20 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-bold text-white">Ready for institutional digital asset allocation?</h3>
            <p className="text-xs text-[#8F96A3]">
              Open an institutional account today with instant Tier 2 clearance and cold custody protection.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onOpenRiskDisclosure}
              className="px-5 py-3 rounded-xl bg-[#141822] text-white text-xs font-semibold hover:bg-white/[0.05] border border-white/10 transition-all"
            >
              Read Risk Notice
            </button>
            <button
              onClick={onNavigateSignUp}
              className="px-6 py-3 rounded-xl bg-[#C8F135] text-[#090A0E] text-xs font-bold hover:bg-[#d5fb46] transition-all flex items-center gap-2"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/[0.06] text-center text-xs text-[#5A6272] max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© {new Date().getFullYear()} Veyra Technologies Inc. • Institutional Custody Division</span>
        <button
          onClick={onOpenRiskDisclosure}
          className="text-[#8F96A3] hover:text-white transition-colors"
        >
          Regulatory Risk Disclosures
        </button>
      </footer>
    </div>
  );
};
