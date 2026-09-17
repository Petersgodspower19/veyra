import React, { useState } from 'react';
import { Shield, ChevronRight, Menu, X, ArrowUpRight, Type, Check } from 'lucide-react';
import { FontTheme } from '../dashboard/DashboardTopBar';

interface LandingNavbarProps {
  fontTheme?: FontTheme;
  onSelectFontTheme?: (theme: FontTheme) => void;
  onOpenSignIn: () => void;
  onOpenSignUp: () => void;
  onEnterDashboard: () => void;
  onScrollTo?: (sectionId: string) => void;
  onNavigateHome?: () => void;
  onNavigateMarkets?: () => void;
  onNavigateInvestments?: () => void;
  onNavigateHowItWorks?: () => void;
  onNavigateAbout?: () => void;
  onNavigateSecurity?: () => void;
  activePage?: string;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  fontTheme = 'outfit',
  onSelectFontTheme,
  onOpenSignIn,
  onOpenSignUp,
  onEnterDashboard,
  onScrollTo,
  onNavigateHome,
  onNavigateMarkets,
  onNavigateInvestments,
  onNavigateHowItWorks,
  onNavigateAbout,
  onNavigateSecurity,
  activePage = 'landing',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFontMenuOpen, setIsFontMenuOpen] = useState(false);

  const handleScroll = (id: string) => {
    if (onScrollTo) {
      onScrollTo(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleMarketsClick = () => {
    if (onNavigateMarkets) onNavigateMarkets();
    else handleScroll('markets');
  };

  const handleInvestmentsClick = () => {
    if (onNavigateInvestments) onNavigateInvestments();
    else handleScroll('portfolio-preview');
  };

  const handleHowItWorksClick = () => {
    if (onNavigateHowItWorks) onNavigateHowItWorks();
    else handleScroll('how-it-works');
  };

  const handleSecurityClick = () => {
    if (onNavigateSecurity) onNavigateSecurity();
    else handleScroll('security');
  };

  const handleAboutClick = () => {
    if (onNavigateAbout) onNavigateAbout();
    else handleScroll('why-veyra');
  };

  const handleLogoClick = () => {
    if (onNavigateHome) onNavigateHome();
    else handleScroll('hero');
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#090A0E]/85 border-b border-white/[0.07] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer select-none" onClick={handleLogoClick}>
          <div className="w-10 h-10 rounded-xl bg-[#141822] border border-white/10 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#C8F135]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[#C8F135]">
              <path
                d="M4 4L12 20L20 4H15.5L12 11.5L8.5 4H4Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              Veyra
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8F135]" />
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#8F96A3] -mt-1">
              Brokerage
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={handleMarketsClick}
            className={`text-sm font-medium transition-colors ${
              activePage === 'markets' ? 'text-[#C8F135] font-semibold' : 'text-[#8F96A3] hover:text-white'
            }`}
          >
            Markets
          </button>
          <button
            onClick={handleInvestmentsClick}
            className={`text-sm font-medium transition-colors ${
              activePage === 'investments' ? 'text-[#C8F135] font-semibold' : 'text-[#8F96A3] hover:text-white'
            }`}
          >
            Investments
          </button>
          <button
            onClick={handleHowItWorksClick}
            className={`text-sm font-medium transition-colors ${
              activePage === 'how-it-works' ? 'text-[#C8F135] font-semibold' : 'text-[#8F96A3] hover:text-white'
            }`}
          >
            How It Works
          </button>
          <button
            onClick={handleSecurityClick}
            className={`text-sm font-medium transition-colors ${
              activePage === 'security' ? 'text-[#C8F135] font-semibold' : 'text-[#8F96A3] hover:text-white'
            }`}
          >
            Security
          </button>
          <button
            onClick={handleAboutClick}
            className={`text-sm font-medium transition-colors ${
              activePage === 'about' ? 'text-[#C8F135] font-semibold' : 'text-[#8F96A3] hover:text-white'
            }`}
          >
            About
          </button>
        </nav>

        {/* Right CTA Area */}
        <div className="hidden md:flex items-center gap-3">
          {/* Font Selector */}
          {onSelectFontTheme && (
            <div className="relative">
              <button
                onClick={() => setIsFontMenuOpen(!isFontMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#8F96A3] hover:text-white rounded-xl bg-[#121520] border border-white/[0.08] hover:border-white/15 transition-all"
                title="Change Font Style"
              >
                <Type className="w-3.5 h-3.5 text-[#C8F135]" />
                <span className="font-semibold">
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
          )}

          <button
            onClick={onOpenSignIn}
            className="px-4 py-2 text-sm font-medium text-[#D1D5DB] hover:text-white transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={onOpenSignUp}
            className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-[#C8F135] text-[#090A0E] hover:bg-[#d5fb46] transition-all shadow-[0_0_24px_rgba(200,241,53,0.18)] active:scale-[0.98] flex items-center gap-1.5"
          >
            Get Started
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={onEnterDashboard}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#171B26] border border-white/10 text-white hover:border-[#C8F135]/40 transition-all flex items-center gap-1 ml-1"
            title="Switch to Authenticated Investor Dashboard"
          >
            Demo Dashboard
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C8F135]" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onEnterDashboard}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#C8F135] text-[#090A0E]"
          >
            App
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#8F96A3] hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D0E14] border-b border-white/10 px-4 pt-4 pb-6 space-y-4">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => {
                handleMarketsClick();
                setMobileMenuOpen(false);
              }}
              className={`text-left text-sm font-medium py-1 ${
                activePage === 'markets' ? 'text-[#C8F135] font-semibold' : 'text-[#8F96A3] hover:text-white'
              }`}
            >
              Markets
            </button>
            <button
              onClick={() => {
                handleInvestmentsClick();
                setMobileMenuOpen(false);
              }}
              className={`text-left text-sm font-medium py-1 ${
                activePage === 'investments' ? 'text-[#C8F135] font-semibold' : 'text-[#8F96A3] hover:text-white'
              }`}
            >
              Investments
            </button>
            <button
              onClick={() => {
                handleHowItWorksClick();
                setMobileMenuOpen(false);
              }}
              className={`text-left text-sm font-medium py-1 ${
                activePage === 'how-it-works' ? 'text-[#C8F135] font-semibold' : 'text-[#8F96A3] hover:text-white'
              }`}
            >
              How It Works
            </button>
            <button
              onClick={() => {
                handleSecurityClick();
                setMobileMenuOpen(false);
              }}
              className={`text-left text-sm font-medium py-1 ${
                activePage === 'security' ? 'text-[#C8F135] font-semibold' : 'text-[#8F96A3] hover:text-white'
              }`}
            >
              Security
            </button>
            <button
              onClick={() => {
                handleAboutClick();
                setMobileMenuOpen(false);
              }}
              className={`text-left text-sm font-medium py-1 ${
                activePage === 'about' ? 'text-[#C8F135] font-semibold' : 'text-[#8F96A3] hover:text-white'
              }`}
            >
              About
            </button>
          </div>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenSignIn();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-sm font-medium rounded-xl bg-[#161922] text-white border border-white/10"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                onOpenSignUp();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-sm font-semibold rounded-xl bg-[#C8F135] text-[#090A0E]"
            >
              Get Started
            </button>
            <button
              onClick={() => {
                onEnterDashboard();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 text-center text-xs font-semibold text-[#8F96A3] hover:text-white flex items-center justify-center gap-1"
            >
              Launch Authenticated Dashboard
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C8F135]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
