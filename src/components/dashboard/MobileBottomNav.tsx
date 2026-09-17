import React from 'react';
import { LayoutDashboard, TrendingUp, ArrowRightLeft, PieChart, Wallet } from 'lucide-react';
import { DashboardTab } from '../../types';

interface MobileBottomNavProps {
  currentTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentTab, onSelectTab }) => {
  const tabs: { id: DashboardTab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Home', icon: LayoutDashboard },
    { id: 'markets', label: 'Markets', icon: TrendingUp },
    { id: 'invest', label: 'Invest', icon: ArrowRightLeft },
    { id: 'portfolio', label: 'Portfolio', icon: PieChart },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#090A0E]/95 backdrop-blur-md border-t border-white/[0.08] flex items-center justify-around z-40 px-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full min-w-[48px] transition-colors ${
              isActive ? 'text-[#C8F135]' : 'text-[#8F96A3] hover:text-white'
            }`}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-semibold">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
