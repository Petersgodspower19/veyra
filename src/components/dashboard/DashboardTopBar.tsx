import React, { useState } from 'react';
import {
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  User,
  ShieldCheck,
  ExternalLink,
  Check,
  X,
  ArrowRight,
  Type,
} from 'lucide-react';
import { CryptoAsset } from '../../types';
import { formatCurrency } from '../../data/mockData';

export type FontTheme = 'outfit' | 'sora' | 'mono';

interface DashboardTopBarProps {
  assets: CryptoAsset[];
  fontTheme: FontTheme;
  onSelectFontTheme: (theme: FontTheme) => void;
  onSelectAsset: (asset: CryptoAsset) => void;
  onOpenHelp: () => void;
  onExitToLanding: () => void;
  onNavigateLogin?: () => void;
}

export const DashboardTopBar: React.FC<DashboardTopBarProps> = ({
  assets,
  fontTheme,
  onSelectFontTheme,
  onSelectAsset,
  onOpenHelp,
  onExitToLanding,
  onNavigateLogin,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isFontMenuOpen, setIsFontMenuOpen] = useState(false);

  const notifications = [
    {
      id: '1',
      title: 'Order Filled: 0.04612 BTC',
      time: '2 hours ago',
      desc: 'Executed at $108,420.32 via Veyra Smart Router.',
      unread: true,
    },
    {
      id: '2',
      title: 'ACH Deposit Cleared: $10,000.00',
      time: '1 day ago',
      desc: 'Funds available for digital asset allocation.',
      unread: false,
    },
    {
      id: '3',
      title: 'Hardware FIDO2 Key Active',
      time: '3 days ago',
      desc: 'Multi-factor authentication validated.',
      unread: false,
    },
  ];

  const filteredAssets = searchQuery.trim()
    ? assets.filter(
        (a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.ticker.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="h-16 bg-[#090A0E] border-b border-white/[0.07] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      
      {/* Search Input with Autocomplete */}
      <div className="relative w-72 sm:w-96">
        <div className="relative">
          <Search className="w-4 h-4 text-[#8F96A3] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            placeholder="Search assets, tickers, markets (e.g. BTC)..."
            className="w-full bg-[#11141D] border border-white/[0.08] hover:border-white/15 focus:border-[#C8F135]/60 rounded-xl py-1.5 pl-9 pr-8 text-xs text-white placeholder-[#5A6272] focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8F96A3] hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Autocomplete Popup */}
        {isSearchOpen && filteredAssets.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#121520] border border-white/10 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in duration-150">
            <div className="text-[10px] font-mono text-[#8F96A3] uppercase px-2 py-1">
              Matching Digital Assets
            </div>
            <div className="max-h-60 overflow-y-auto space-y-1">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => {
                    onSelectAsset(asset);
                    setSearchQuery('');
                    setIsSearchOpen(false);
                  }}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.05] cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-xs text-white">{asset.name}</span>
                    <span className="text-[11px] text-[#8F96A3] font-mono-num">{asset.ticker}</span>
                  </div>
                  <div className="text-right font-mono-num">
                    <span className="text-xs font-semibold text-white block">
                      {formatCurrency(asset.price)}
                    </span>
                    <span
                      className={`text-[10px] font-semibold ${
                        asset.change24h >= 0 ? 'text-[#10B981]' : 'text-[#F43F5E]'
                      }`}
                    >
                      {asset.change24h >= 0 ? '+' : ''}
                      {asset.change24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        
        {/* Font Style Switcher */}
        <div className="relative">
          <button
            onClick={() => setIsFontMenuOpen(!isFontMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#8F96A3] hover:text-white rounded-xl bg-[#121520] border border-white/[0.08] hover:border-white/15 transition-all"
            title="Change Font Style"
          >
            <Type className="w-3.5 h-3.5 text-[#C8F135]" />
            <span className="hidden sm:inline font-semibold">
              {fontTheme === 'outfit' ? 'Outfit & Manrope' : fontTheme === 'sora' ? 'Sora Precision' : 'Chivo Mono'}
            </span>
          </button>

          {isFontMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#121520] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in duration-150">
              <div className="px-3 py-1.5 border-b border-white/[0.06] text-[10px] uppercase font-mono tracking-wider text-[#8F96A3]">
                Typography Styling
              </div>
              <div className="py-1 space-y-0.5">
                {[
                  { id: 'outfit', label: 'Outfit & Manrope', sub: 'Modern Swiss Neo-Grotesque' },
                  { id: 'sora', label: 'Sora Precision', sub: 'Cryptographic & High-Tech' },
                  { id: 'mono', label: 'Chivo Terminal', sub: 'Data-Dense Financial Mono' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      onSelectFontTheme(f.id as FontTheme);
                      setIsFontMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                      fontTheme === f.id
                        ? 'bg-[#C8F135]/10 text-[#C8F135]'
                        : 'text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold block">{f.label}</span>
                      <span className="text-[10px] text-[#8F96A3]">{f.sub}</span>
                    </div>
                    {fontTheme === f.id && <Check className="w-4 h-4 text-[#C8F135]" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Help button */}
        <button
          onClick={onOpenHelp}
          className="p-2 text-[#8F96A3] hover:text-white rounded-xl hover:bg-white/[0.04] transition-colors"
          title="Regulatory & Platform Help"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Notification Bell with Badge & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 text-[#8F96A3] hover:text-white rounded-xl hover:bg-white/[0.04] transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-[#C8F135] absolute top-1.5 right-1.5 ring-2 ring-[#090A0E]" />
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-[#121520] border border-white/10 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Brokerage Alerts
                </h4>
                <span className="text-[10px] text-[#C8F135] font-mono">1 UNREAD</span>
              </div>
              <div className="divide-y divide-white/[0.04] max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="py-2.5 first:pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">{n.title}</span>
                      <span className="text-[10px] text-[#5A6272] font-mono-num">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-[#8F96A3] mt-0.5 leading-relaxed">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-[1px] bg-white/[0.08] hidden sm:block" />

        {/* User Account Menu */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-white/[0.04] transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-[#181C28] border border-white/10 flex items-center justify-center font-bold text-xs text-[#C8F135]">
              AS
            </div>
            <span className="hidden sm:inline-block text-xs font-semibold text-white">
              A. Sterling
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#8F96A3]" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#121520] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in duration-150">
              <div className="px-3 py-2 border-b border-white/[0.06]">
                <span className="text-xs font-bold text-white block">Alexander Sterling</span>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  Tier 2 • Institutional Active
                </span>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    onExitToLanding();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-[#8F96A3] hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
                >
                  <span>Public Landing Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    onOpenHelp();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-[#8F96A3] hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
                >
                  <span>Help & Support Center</span>
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
                <div className="border-t border-white/[0.06] my-1" />
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    if (onNavigateLogin) {
                      onNavigateLogin();
                    } else {
                      onExitToLanding();
                    }
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#F43F5E] hover:bg-rose-500/10 rounded-lg transition-colors"
                >
                  <span>Lock & Sign Out</span>
                  <Lock className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};
