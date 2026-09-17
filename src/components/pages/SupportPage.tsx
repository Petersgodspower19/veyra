import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  BookOpen,
  MessageSquare,
  Mail,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ExternalLink,
  PhoneCall,
  Clock,
} from 'lucide-react';
import { useToast } from '../common/Toast';

interface SupportPageProps {
  onNavigateHome: () => void;
  onNavigateDashboard: () => void;
  onOpenRiskDisclosure: () => void;
}

export const SupportPage: React.FC<SupportPageProps> = ({
  onNavigateHome,
  onNavigateDashboard,
  onOpenRiskDisclosure,
}) => {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketBody, setTicketBody] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Trade Execution');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqs = [
    {
      q: 'How are digital assets safeguarded at Veyra?',
      a: 'Over 99% of digital assets are held in geographically distributed, subterranean cold storage vaults utilizing Multi-Party Computation (MPC). Private key shards never exist in a single location or memory space.',
    },
    {
      q: 'What are the daily bank wire settlement limits for Tier 2 accounts?',
      a: 'Tier 2 verified institutional clients can deposit up to $1,000,000 via Fedwire daily with same-day settlement. Larger custom limits are readily provisioned through our Family Office coverage desk.',
    },
    {
      q: 'How does Veyra achieve deterministic pricing on orders?',
      a: 'Veyra routes orders through proprietary smart-liquidity matching algorithms that aggregate deep book depth from leading liquidity partners, guaranteeing execution within tight slippage tolerances.',
    },
    {
      q: 'Can I export my tax lots and transaction ledgers?',
      a: 'Yes. The Transactions tab features a full institutional CSV export engine formatted for direct import into CoinTracker, TaxBit, or standard CPA tax management systems.',
    },
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketBody) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setTicketSubject('');
      setTicketBody('');
      showToast({
        type: 'success',
        title: 'Priority Ticket Dispatched',
        message: 'Your institutional inquiry has been logged. An assigned account officer will respond within 15 minutes.',
      });
    }, 600);
  };

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              Institutional Support
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="text-xs font-semibold text-[#8F96A3] hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/[0.04] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <button
            onClick={onNavigateDashboard}
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-[#161A26] border border-white/10 text-white hover:border-[#C8F135]/40 transition-colors"
          >
            Enter Dashboard
          </button>
        </div>
      </header>

      {/* Main Support Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-12">
        {/* Top Search Hero */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131622] border border-white/[0.08] text-xs text-[#C8F135] font-mono">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>24/7 Concierge Brokerage Coverage</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How can our institutional desk assist you?
          </h1>
          <div className="relative max-w-xl mx-auto pt-2">
            <Search className="w-5 h-5 text-[#8F96A3] absolute left-4 top-1/2 -translate-y-1/2 mt-1" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search custody, deposits, wire routing, or API..."
              className="w-full bg-[#0E1017] border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-[#5A6272] focus:outline-none focus:border-[#C8F135] transition-colors shadow-xl"
            />
          </div>
        </div>

        {/* 3 Quick Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.07] space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#C8F135]/10 text-[#C8F135] flex items-center justify-center mb-3">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Direct Trade Desk</h3>
            <p className="text-xs text-[#8F96A3] leading-relaxed">
              New York & Zurich trade desks available 24/7 for block orders exceeding $500,000.
            </p>
            <span className="text-xs font-mono text-[#C8F135] block pt-2">+1 (212) 840-2900</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.07] space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Institutional Support</h3>
            <p className="text-xs text-[#8F96A3] leading-relaxed">
              Guaranteed 15-minute response SLA for Tier 2 verified brokerage accounts.
            </p>
            <span className="text-xs font-mono text-blue-400 block pt-2">prime@veyra.wealth</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.07] space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Fedwire Operations</h3>
            <p className="text-xs text-[#8F96A3] leading-relaxed">
              Same-day bank wire clearance processed between 08:00 and 17:00 EST via JP Morgan Chase.
            </p>
            <span className="text-xs font-mono text-emerald-400 block pt-2">Routing: 021000021</span>
          </div>
        </div>

        {/* FAQs and Ticket Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          {/* FAQ Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#C8F135]" />
              <span>Frequently Addressed Topics</span>
            </h2>

            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl bg-[#0E1017] border border-white/[0.07] overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:bg-white/[0.02]"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#C8F135] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#8F96A3] shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-0 text-xs text-[#8F96A3] leading-relaxed border-t border-white/[0.04]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ticket Form */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0E1017] border border-white/[0.08] space-y-5">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#C8F135]" />
                <span>Submit Priority Inquiry</span>
              </h2>
              <p className="text-xs text-[#8F96A3] mt-1">
                Directly route your request to our compliance, engineering, or order execution desks.
              </p>
            </div>

            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white block">Category</label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value)}
                  className="w-full bg-[#121520] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#C8F135]"
                >
                  <option value="Trade Execution">Order & Trade Execution</option>
                  <option value="Custody & Vaults">Custody & MPC Security</option>
                  <option value="Wire Depository">Bank Wire & ACH Settlement</option>
                  <option value="Tier Limits">Institutional Limit Expansion</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white block">Subject</label>
                <input
                  type="text"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  required
                  placeholder="e.g. Allocation limit increase request"
                  className="w-full bg-[#121520] border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-[#5A6272] focus:outline-none focus:border-[#C8F135]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white block">Inquiry Details</label>
                <textarea
                  rows={4}
                  value={ticketBody}
                  onChange={(e) => setTicketBody(e.target.value)}
                  required
                  placeholder="Provide transaction hashes, order IDs, or specific requirements..."
                  className="w-full bg-[#121520] border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-[#5A6272] focus:outline-none focus:border-[#C8F135]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-[#C8F135] text-[#090A0E] text-xs font-bold hover:bg-[#d5fb46] transition-all"
              >
                {isSubmitting ? 'Transmitting Ticket...' : 'Dispatch Priority Ticket'}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/[0.06] text-center text-xs text-[#5A6272] max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>Veyra Institutional Support Network • New York • London • Singapore</span>
        <button
          onClick={onOpenRiskDisclosure}
          className="text-[#8F96A3] hover:text-white transition-colors"
        >
          Compliance Disclosures
        </button>
      </footer>
    </div>
  );
};
