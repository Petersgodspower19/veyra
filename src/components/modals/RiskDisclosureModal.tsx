import React from 'react';
import { X, ShieldAlert, AlertTriangle, CheckCircle, FileText, Download } from 'lucide-react';

interface RiskDisclosureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RiskDisclosureModal: React.FC<RiskDisclosureModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0E1017] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between bg-[#121520]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Veyra Risk Disclosure Statement
              </h3>
              <p className="text-xs text-[#8F96A3] font-mono">
                Document Ref: VDS-2026-REV4 • Regulatory Compliance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#8F96A3] hover:text-white p-1 rounded-lg hover:bg-white/[0.05] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Document Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#8F96A3] leading-relaxed">
          
          <div className="bg-[#141824] p-4 rounded-xl border border-white/[0.06] text-xs space-y-2">
            <span className="font-bold text-white uppercase tracking-wider block">
              Notice to Prospective Investors
            </span>
            <p>
              Trading digital assets involves a high degree of financial risk and may result in the partial or total loss of invested capital. Digital assets are speculative and experience elevated price fluctuations. You should only invest capital that you can afford to lose without compromising your financial well-being.
            </p>
          </div>

          <section className="space-y-2">
            <h4 className="text-white font-semibold text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8F135]" />
              1. Market Volatility & Liquidity Risk
            </h4>
            <p>
              Digital asset markets operate 24 hours a day, 365 days a year globally. Prices may undergo sharp swings caused by macro trends, regulatory changes, technology developments, and unexpected market-wide liquidity contractions. During extreme volatility, trade execution spreads may widen.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="text-white font-semibold text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8F135]" />
              2. Custodial Structure & Insurance Status
            </h4>
            <p>
              Digital asset holdings maintained with Veyra are secured in qualified multi-signature institutional custody. <strong>Digital assets are not legal tender, are not backed by any sovereign government, and are NOT covered by FDIC (Federal Deposit Insurance Corporation) or SIPC (Securities Investor Protection Corporation) coverage.</strong> Fiat USD balances held in partner depository bank accounts maintain pass-through FDIC insurance eligibility up to statutory limits.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="text-white font-semibold text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8F135]" />
              3. Technology & Protocol Vulnerabilities
            </h4>
            <p>
              Underlying blockchain distributed ledgers, consensus rules, smart contracts, and network forks operate autonomously. Veyra cannot control or reverse transactions on public blockchains once confirmed. Network congestion may cause execution delays or increased network gas fees.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="text-white font-semibold text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8F135]" />
              4. No Financial or Investment Advice
            </h4>
            <p>
              All materials, portfolio analytics, market summaries, and price alerts presented on Veyra are provided exclusively for informational purposes. Nothing constitutes an offer to buy or sell securities, commodities, or investment products. You are encouraged to consult an independent financial advisor.
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-white/[0.08] bg-[#10131B] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#5A6272] flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#C8F135]" />
            <span>Updated according to standard brokerage disclosures</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#C8F135] text-[#090A0E] text-xs font-bold hover:bg-[#d5fb46] transition-all shadow-md active:scale-95"
            >
              I Understand & Acknowledge
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
