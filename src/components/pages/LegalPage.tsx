import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  ArrowLeft,
  Download,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Lock,
} from 'lucide-react';
import { useToast } from '../common/Toast';

export type LegalTab = 'terms' | 'privacy' | 'aml' | 'fees';

interface LegalPageProps {
  initialTab?: LegalTab;
  onNavigateHome: () => void;
  onNavigateSignUp: () => void;
  onOpenRiskDisclosure: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({
  initialTab = 'terms',
  onNavigateHome,
  onNavigateSignUp,
  onOpenRiskDisclosure,
}) => {
  const { showToast } = useToast();
  const [currentTab, setCurrentTab] = useState<LegalTab>(initialTab);

  const handleDownload = (docName: string) => {
    showToast({
      type: 'info',
      title: 'Documentation Download',
      message: `${docName} PDF package dispatched to your local downloads.`,
    });
  };

  return (
    <div className="min-h-screen bg-[#090A0E] text-[#F3F4F6] selection:bg-[#C8F135]/20 selection:text-[#C8F135] flex flex-col justify-between">
      {/* Header */}
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
              Legal & Compliance
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="text-xs font-semibold text-[#8F96A3] hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/[0.04] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </button>
        </div>
      </header>

      {/* Main Legal Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-8">
        {/* Title */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131622] border border-white/[0.08] text-xs text-[#C8F135] font-mono mb-3">
            <Scale className="w-3.5 h-3.5" />
            <span>Regulatory & Operational Disclosures</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Institutional Regulatory Framework
          </h1>
          <p className="text-xs sm:text-sm text-[#8F96A3] mt-2">
            Last Updated: January 1, 2026 • Governed under FinCEN & Delaware Corporate Jurisdiction
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-[#0E1017] rounded-2xl border border-white/[0.07]">
          {[
            { id: 'terms', label: 'Terms of Brokerage' },
            { id: 'privacy', label: 'Privacy & Data Policy' },
            { id: 'aml', label: 'AML & KYC Policy' },
            { id: 'fees', label: 'Institutional Fee Schedules' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id as LegalTab)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                currentTab === tab.id
                  ? 'bg-[#181D2B] text-[#C8F135] border border-[#C8F135]/30 shadow-sm'
                  : 'text-[#8F96A3] hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="bg-[#0E1017] border border-white/[0.08] rounded-3xl p-6 sm:p-10 space-y-8 leading-relaxed text-sm text-[#C4C9D4]">
          {currentTab === 'terms' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <h2 className="text-xl font-bold text-white">Terms of Brokerage Agreement</h2>
                <button
                  onClick={() => handleDownload('Veyra-Terms-of-Brokerage.pdf')}
                  className="text-xs text-[#C8F135] flex items-center gap-1.5 hover:underline"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-white">1. Scope of Digital Asset Services</h3>
                <p>
                  Veyra Technologies Inc. ("Veyra") provides institutional prime execution, deterministic order matching, and custody routing services. Clients may execute spot digital asset acquisitions and liquidations under full deterministic pricing schedules.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-white">2. Custody & Asset Segregation</h3>
                <p>
                  All digital assets deposited with Veyra are held in segregated, designated omnibus accounts on behalf of users. Digital assets are never lent, hypothecated, rehypothecated, or commingled with Veyra's corporate operating balances.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-white">3. Execution & Settlement Policy</h3>
                <p>
                  Orders submitted through the Veyra Investment Terminal execute against aggregated institutional liquidity pools. Orders lock in deterministic execution pricing with guaranteed slippage caps under 0.05% for major pairings (BTC, ETH, SOL).
                </p>
              </section>
            </div>
          )}

          {currentTab === 'privacy' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <h2 className="text-xl font-bold text-white">Privacy & Cryptographic Data Policy</h2>
                <button
                  onClick={() => handleDownload('Veyra-Privacy-Policy.pdf')}
                  className="text-xs text-[#C8F135] flex items-center gap-1.5 hover:underline"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-white">1. Zero Sale of Client Information</h3>
                <p>
                  Veyra does not monetize, sell, or rent customer financial, identity, or trading telemetry to third parties, market makers, or data aggregators.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-white">2. End-to-End Key & Secret Storage</h3>
                <p>
                  All personal identifiable information (PII) is encrypted at rest using AES-256 and in transit via TLS 1.3. Cryptographic access keys never reside in plaintext.
                </p>
              </section>
            </div>
          )}

          {currentTab === 'aml' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <h2 className="text-xl font-bold text-white">Anti-Money Laundering (AML) & KYC Policy</h2>
                <button
                  onClick={() => handleDownload('Veyra-AML-KYC-Policy.pdf')}
                  className="text-xs text-[#C8F135] flex items-center gap-1.5 hover:underline"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-white">1. FinCEN Registration & Bank Secrecy Act</h3>
                <p>
                  Veyra operates in strict compliance with the United States Bank Secrecy Act (BSA) and FinCEN regulations. We maintain rigorous Customer Identification Programs (CIP) and Customer Due Diligence (CDD) procedures.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-white">2. Real-Time On-Chain Forensic Screening</h3>
                <p>
                  Incoming and outgoing wallet transactions are actively analyzed via automated blockchain heuristics (Chainalysis / Elliptic) to prevent interactions with sanctioned protocols, mixers, or illicit entities.
                </p>
              </section>
            </div>
          )}

          {currentTab === 'fees' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <h2 className="text-xl font-bold text-white">Institutional Fee Schedules</h2>
                <button
                  onClick={() => handleDownload('Veyra-Fee-Schedule-2026.pdf')}
                  className="text-xs text-[#C8F135] flex items-center gap-1.5 hover:underline"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border border-white/[0.06] rounded-xl overflow-hidden">
                  <thead className="bg-[#121520] text-white text-xs font-mono uppercase">
                    <tr>
                      <th className="p-3">Service</th>
                      <th className="p-3">Tier 1</th>
                      <th className="p-3 text-[#C8F135]">Tier 2 (Current)</th>
                      <th className="p-3">Family Office ($5M+)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04] text-xs">
                    <tr>
                      <td className="p-3 font-semibold text-white">Spot Execution Fee</td>
                      <td className="p-3">0.65%</td>
                      <td className="p-3 font-bold text-[#C8F135]">0.50%</td>
                      <td className="p-3">0.25%</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">USD Bank Wire (Deposit)</td>
                      <td className="p-3">$0.00</td>
                      <td className="p-3 font-bold text-[#C8F135]">$0.00</td>
                      <td className="p-3">$0.00</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">USD Bank Wire (Withdrawal)</td>
                      <td className="p-3">$15.00</td>
                      <td className="p-3 font-bold text-[#C8F135]">$0.00 (Free)</td>
                      <td className="p-3">$0.00 (Free)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">MPC Cold Custody Fee</td>
                      <td className="p-3">0.00% / yr</td>
                      <td className="p-3 font-bold text-[#C8F135]">0.00% / yr</td>
                      <td className="p-3">0.00% / yr</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/[0.06] text-center text-xs text-[#5A6272] max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>Veyra Legal & Risk Operations • Wilmington, Delaware, USA</span>
        <button
          onClick={onOpenRiskDisclosure}
          className="text-[#8F96A3] hover:text-white transition-colors"
        >
          View Full Risk Disclosure
        </button>
      </footer>
    </div>
  );
};
