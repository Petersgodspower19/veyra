import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  PieChart,
  ArrowRightLeft,
  History,
  Wallet,
  Bookmark,
  Settings,
  HelpCircle,
  LogOut,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { DashboardTab } from '../../types';

interface DashboardSidebarProps {
  currentTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  onExitToLanding: () => void;
  onOpenHelp: () => void;
  onNavigateLogin?: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  currentTab,
  onSelectTab,
  onExitToLanding,
  onOpenHelp,
  onNavigateLogin,
}) => {
  const navItems: { tab: DashboardTab; label: string; icon: any }[] = [
    { tab: 'overview', label: 'Overview', icon: LayoutDashboard },
    { tab: 'markets', label: 'Markets', icon: TrendingUp },
    { tab: 'portfolio', label: 'Portfolio', icon: PieChart },
    { tab: 'invest', label: 'Invest', icon: ArrowRightLeft },
    { tab: 'transactions', label: 'Transactions', icon: History },
    { tab: 'wallet', label: 'Wallet', icon: Wallet },
    { tab: 'watchlist', label: 'Watchlist', icon: Bookmark },
    { tab: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#090A0E] border-r border-white/[0.07] flex flex-col justify-between shrink-0 h-screen sticky top-0 hidden md:flex">
      
      {/* Top Brand & Nav */}
      <div className="flex flex-col">
        {/* Brand Logo */}
        <div
          className="p-6 border-b border-white/[0.07] flex items-center justify-between cursor-pointer select-none"
          onClick={() => onSelectTab('overview')}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#141822] border border-white/10 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#C8F135]">
                <path d="M4 4L12 20L20 4H15.5L12 11.5L8.5 4H4Z" fill="currentColor" />
              </svg>
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                Veyra
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8F135]" />
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#8F96A3] block -mt-1">
                Prime Brokerage
              </span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onExitToLanding();
            }}
            title="Return to Public Landing Page"
            className="p-1.5 text-[#8F96A3] hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="p-4 space-y-1.5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#5A6272] px-3 py-1 font-semibold">
            Brokerage Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => onSelectTab(item.tab)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#151822] text-[#C8F135] border border-[#C8F135]/30 shadow-sm'
                    : 'text-[#8F96A3] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C8F135]' : 'text-[#8F96A3]'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#C8F135]" />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Institutional Status */}
      <div className="p-4 border-t border-white/[0.07] space-y-3">
        {/* Help & Support Button */}
        <button
          onClick={onOpenHelp}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-[#8F96A3] hover:text-white hover:bg-white/[0.04] transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Help & Documentation</span>
        </button>

        {/* User Card */}
        <div className="bg-[#0E1017] p-3 rounded-xl border border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#191E2B] border border-white/10 flex items-center justify-center font-bold text-xs text-[#C8F135] shrink-0">
              VP
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-white truncate block">
                Alexander Sterling
              </span>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Tier 2 Verified
              </span>
            </div>
          </div>
          <button
            onClick={onNavigateLogin || onExitToLanding}
            title="Sign Out / Lock Terminal"
            className="text-[#8F96A3] hover:text-[#F43F5E] p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

    </aside>
  );
};
