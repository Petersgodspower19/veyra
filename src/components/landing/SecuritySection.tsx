import React from 'react';
import {
  ShieldAlert,
  KeyRound,
  Fingerprint,
  Radio,
  Lock,
  Layers,
  ArrowUpRight,
  FileText,
  AlertTriangle,
} from 'lucide-react';

interface SecuritySectionProps {
  onOpenRiskDisclosure: () => void;
}

export const SecuritySection: React.FC<SecuritySectionProps> = ({ onOpenRiskDisclosure }) => {
  const securityPillars = [
    {
      icon: KeyRound,
      title: 'Secure Authentication',
      desc: 'Hardware FIDO2/WebAuthn security keys, multi-factor TOTP authentication, and biometric verification layers.',
    },
    {
      icon: Fingerprint,
      title: 'Account Protection',
      desc: 'Real-time anomaly heuristics, geo-fenced session detection, and automatic suspicious IP lockdown protocol.',
    },
    {
      icon: Radio,
      title: 'Transaction Monitoring',
      desc: 'Machine-learning transaction scoring and continuous screening against global sanctions and high-risk clusters.',
    },
    {
      icon: Lock,
      title: 'Encrypted Data',
      desc: 'AES-256 encryption at rest and TLS 1.3 in transit with strict key separation and hardware security modules (HSM).',
    },
    {
      icon: Layers,
      title: 'Wallet Security',
      desc: 'Multi-party computation (MPC) cold architecture. Cryptographic private keys never exist in an exposed single location.',
    },
    {
      icon: ShieldAlert,
      title: 'Withdrawal Protection',
      desc: 'Custom address whitelisting, mandatory 24-hour time-lock delays for new payout destinations, and dual-party confirmation.',
    },
  ];

  return (
    <section id="security" className="py-24 bg-[#0A0C10] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#C8F135] mb-2 font-mono flex items-center gap-2">
            <Lock className="w-3.5 h-3.5" />
            Institutional Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Your assets deserve serious protection.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#8F96A3] leading-relaxed">
            We adhere to defense-in-depth security principles. No single point of failure, no speculative rehypothecation, and institutional multi-signature custody.
          </p>
        </div>

        {/* Security Pillars 6-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#0E1017] rounded-2xl border border-white/[0.07] p-7 hover:border-white/[0.15] transition-all hover:translate-y-[-2px] flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#141824] border border-white/10 flex items-center justify-center text-[#C8F135] mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#8F96A3] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Responsible Risk Disclosure Banner (Mandate: Avoid unsupported guarantees, include clear Risk Disclosure link) */}
        <div className="mt-12 bg-[#121520] rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">
                Important Regulatory & Risk Notice
              </h4>
              <p className="text-xs sm:text-sm text-[#8F96A3] mt-1 max-w-3xl leading-relaxed">
                Digital asset investments carry inherent market risks and price volatility. Past performance does not guarantee future results. Veyra does not provide investment advice or guarantee profits. Always evaluate your personal financial objectives before allocating capital.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenRiskDisclosure}
            className="px-5 py-2.5 rounded-xl bg-[#181C28] hover:bg-[#202534] text-white text-xs font-semibold border border-white/10 transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
          >
            <FileText className="w-3.5 h-3.5 text-[#C8F135]" />
            <span>Read Risk Disclosure</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#8F96A3]" />
          </button>
        </div>

      </div>
    </section>
  );
};
