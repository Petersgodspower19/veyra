import React, { useState, useEffect } from 'react';
import { ToastProvider, useToast } from './components/common/Toast';
import {
  MOCK_ASSETS,
  INITIAL_PORTFOLIO,
  INITIAL_TRANSACTIONS,
} from './data/mockData';
import {
  CryptoAsset,
  UserPortfolio,
  Transaction,
  DashboardTab,
} from './types';

// Landing Components
import { LandingNavbar } from './components/landing/LandingNavbar';
import { LandingHero } from './components/landing/LandingHero';
import { LiveMarketsSection } from './components/landing/LiveMarketsSection';
import { PortfolioPreviewSection } from './components/landing/PortfolioPreviewSection';
import { WhyVeyraSection } from './components/landing/WhyVeyraSection';
import { HowItWorksSection } from './components/landing/HowItWorksSection';
import { SecuritySection } from './components/landing/SecuritySection';
import { LandingFooter } from './components/landing/LandingFooter';

// Dashboard Components
import { DashboardSidebar } from './components/dashboard/DashboardSidebar';
import { DashboardTopBar, FontTheme } from './components/dashboard/DashboardTopBar';
import { OverviewView } from './components/dashboard/OverviewView';
import { MarketsView } from './components/dashboard/MarketsView';
import { InvestView } from './components/dashboard/InvestView';
import { PortfolioView } from './components/dashboard/PortfolioView';
import { TransactionsView } from './components/dashboard/TransactionsView';
import { WalletView } from './components/dashboard/WalletView';
import { WatchlistView } from './components/dashboard/WatchlistView';
import { SettingsView } from './components/dashboard/SettingsView';
import { MobileBottomNav } from './components/dashboard/MobileBottomNav';

// Modals
import { TradeModal } from './components/modals/TradeModal';
import { DepositWithdrawModal } from './components/modals/DepositWithdrawModal';
import { RiskDisclosureModal } from './components/modals/RiskDisclosureModal';
import { AuthModal } from './components/modals/AuthModal';

// Dedicated Standalone Pages
import { LoginPage } from './components/pages/LoginPage';
import { SignUpPage } from './components/pages/SignUpPage';
import { SecurityPage } from './components/pages/SecurityPage';
import { LegalPage, LegalTab } from './components/pages/LegalPage';
import { SupportPage } from './components/pages/SupportPage';
import { MarketsPage } from './components/pages/MarketsPage';
import { InvestmentsPage } from './components/pages/InvestmentsPage';
import { HowItWorksPage } from './components/pages/HowItWorksPage';
import { AboutPage } from './components/pages/AboutPage';

export type AppViewMode =
  | 'landing'
  | 'markets'
  | 'investments'
  | 'how-it-works'
  | 'about'
  | 'dashboard'
  | 'login'
  | 'signup'
  | 'security'
  | 'legal'
  | 'support';

function getInitialViewMode(): AppViewMode {
  if (typeof window === 'undefined') return 'landing';
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
  if (path === '/markets') return 'markets';
  if (path === '/investments') return 'investments';
  if (path === '/how-it-works') return 'how-it-works';
  if (path === '/about') return 'about';
  if (path === '/security') return 'security';
  if (path === '/legal') return 'legal';
  if (path === '/support') return 'support';
  if (path === '/login') return 'login';
  if (path === '/signup') return 'signup';
  if (path.startsWith('/dashboard')) return 'dashboard';
  return 'landing';
}

function getPathForViewMode(mode: AppViewMode): string {
  switch (mode) {
    case 'markets':
      return '/markets';
    case 'investments':
      return '/investments';
    case 'how-it-works':
      return '/how-it-works';
    case 'about':
      return '/about';
    case 'security':
      return '/security';
    case 'legal':
      return '/legal';
    case 'support':
      return '/support';
    case 'login':
      return '/login';
    case 'signup':
      return '/signup';
    case 'dashboard':
      return '/dashboard';
    case 'landing':
    default:
      return '/';
  }
}

function VeyraApp() {
  const { showToast } = useToast();

  // App Navigation & URL synchronization
  const [viewMode, setViewModeState] = useState<AppViewMode>(getInitialViewMode);
  const [legalTab, setLegalTab] = useState<LegalTab>('terms');
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>('overview');
  const [fontTheme, setFontTheme] = useState<FontTheme>('outfit');

  const setViewMode = (mode: AppViewMode, path?: string) => {
    setViewModeState(mode);
    const targetPath = path || getPathForViewMode(mode);
    if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
      window.history.pushState({ mode }, '', targetPath);
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setViewModeState(getInitialViewMode());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Application Data State
  const [assets, setAssets] = useState<CryptoAsset[]>(MOCK_ASSETS);
  const [portfolio, setPortfolio] = useState<UserPortfolio>(INITIAL_PORTFOLIO);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [watchlist, setWatchlist] = useState<string[]>(['bitcoin', 'ethereum', 'solana']);

  // Modal States
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [tradeAsset, setTradeAsset] = useState<CryptoAsset>(MOCK_ASSETS[0]);
  const [isDepWithdrawOpen, setIsDepWithdrawOpen] = useState(false);
  const [depWithdrawMode, setDepWithdrawMode] = useState<'deposit' | 'withdraw'>('deposit');
  const [isRiskModalOpen, setIsRiskModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  // Helper to trigger trade modal for any asset
  const handleOpenTrade = (asset: CryptoAsset) => {
    setTradeAsset(asset);
    setIsTradeModalOpen(true);
  };

  // Helper to trigger cash deposit / withdraw modal
  const handleOpenDeposit = () => {
    setDepWithdrawMode('deposit');
    setIsDepWithdrawOpen(true);
  };

  const handleOpenWithdraw = () => {
    setDepWithdrawMode('withdraw');
    setIsDepWithdrawOpen(true);
  };

  // Watchlist Toggle
  const handleToggleWatchlist = (assetId: string) => {
    setWatchlist((prev) => {
      const isPresent = prev.includes(assetId);
      const updated = isPresent ? prev.filter((id) => id !== assetId) : [...prev, assetId];
      const assetObj = assets.find((a) => a.id === assetId);
      showToast({
        type: 'info',
        title: isPresent ? 'Removed from Watchlist' : 'Added to Watchlist',
        message: `${assetObj?.name || assetId} is now ${isPresent ? 'hidden from' : 'monitored in'} your private watchlist.`,
      });
      return updated;
    });
  };

  // Execute Trade Flow
  const handleExecuteTrade = (trade: {
    asset: CryptoAsset;
    type: 'BUY' | 'SELL';
    usdAmount: number;
    quantity: number;
    fee: number;
  }) => {
    setPortfolio((prev) => {
      const assetId = trade.asset.id;
      const currentHolding = prev.holdings[assetId] || {
        assetId,
        quantity: 0,
        averageBuyPrice: trade.asset.price,
        allocationPercentage: 0,
      };

      let newQuantity = currentHolding.quantity;
      let newAvgPrice = currentHolding.averageBuyPrice;
      let newCash = prev.availableCash;

      if (trade.type === 'BUY') {
        const totalPaid = trade.usdAmount + trade.fee;
        newCash -= totalPaid;
        const totalOldCost = currentHolding.quantity * currentHolding.averageBuyPrice;
        const totalNewCost = totalOldCost + trade.usdAmount;
        newQuantity += trade.quantity;
        newAvgPrice = newQuantity > 0 ? totalNewCost / newQuantity : trade.asset.price;
      } else {
        const netProceeds = trade.usdAmount - trade.fee;
        newCash += netProceeds;
        newQuantity = Math.max(0, newQuantity - trade.quantity);
      }

      const updatedHoldings = {
        ...prev.holdings,
        [assetId]: {
          ...currentHolding,
          quantity: newQuantity,
          averageBuyPrice: newAvgPrice,
        },
      };

      // Calculate total asset value
      let totalAssetValue = 0;
      Object.entries(updatedHoldings).forEach(([id, h]) => {
        const a = assets.find((item) => item.id === id);
        if (a) totalAssetValue += ((h as any).quantity || 0) * a.price;
      });

      const newTotalValue = totalAssetValue + newCash;

      return {
        ...prev,
        totalValue: newTotalValue,
        investedValue: totalAssetValue,
        availableCash: newCash,
        holdings: updatedHoldings,
      };
    });

    // Record Transaction
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      assetId: trade.asset.id,
      assetName: trade.asset.name,
      assetTicker: trade.asset.ticker,
      type: trade.type,
      amount: trade.quantity,
      amountUsd: trade.usdAmount,
      price: trade.asset.price,
      fee: trade.fee,
      date: 'Just now',
      timestamp: Date.now(),
      status: 'Completed',
      txHash: `0x${Math.random().toString(36).substring(2, 8)}...${Math.random().toString(36).substring(2, 6)}`,
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  // Cash Deposit / Withdrawal Handler
  const handleDepositWithdraw = (amount: number, type: 'deposit' | 'withdraw') => {
    setPortfolio((prev) => {
      const newCash = type === 'deposit' ? prev.availableCash + amount : prev.availableCash - amount;
      return {
        ...prev,
        availableCash: newCash,
        totalValue: prev.investedValue + newCash,
      };
    });

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      assetId: 'usd',
      assetName: 'US Dollar',
      assetTicker: 'USD',
      type: type === 'deposit' ? 'DEPOSIT' : 'WITHDRAWAL',
      amount,
      amountUsd: amount,
      price: 1,
      fee: 0,
      date: 'Just now',
      timestamp: Date.now(),
      status: 'Completed',
      txHash: `FEDWIRE-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  // Auth Handler
  const handleAuthComplete = () => {
    setViewMode('dashboard');
  };

  return (
    <div className={`min-h-screen bg-[#090A0E] text-[#F3F4F6] font-theme-${fontTheme} antialiased selection:bg-[#C8F135]/20 selection:text-[#C8F135]`}>
      
      {/* ------------------------------------------------------------- */}
      {/* FULL STANDALONE PAGES */}
      {/* ------------------------------------------------------------- */}
      {viewMode === 'markets' && (
        <MarketsPage
          assets={assets}
          watchlist={watchlist}
          fontTheme={fontTheme}
          onSelectFontTheme={setFontTheme}
          onNavigateHome={() => setViewMode('landing')}
          onNavigateMarkets={() => setViewMode('markets')}
          onNavigateInvestments={() => setViewMode('investments')}
          onNavigateHowItWorks={() => setViewMode('how-it-works')}
          onNavigateAbout={() => setViewMode('about')}
          onNavigateSecurity={() => setViewMode('security')}
          onNavigateLegal={(tab) => {
            setLegalTab(tab);
            setViewMode('legal');
          }}
          onNavigateSupport={() => setViewMode('support')}
          onNavigateLogin={() => setViewMode('login')}
          onNavigateSignUp={() => setViewMode('signup')}
          onEnterDashboard={() => setViewMode('dashboard')}
          onToggleWatchlist={handleToggleWatchlist}
          onTradeAsset={(asset) => {
            setViewMode('dashboard');
            handleOpenTrade(asset);
          }}
          onOpenRiskDisclosure={() => setIsRiskModalOpen(true)}
        />
      )}

      {viewMode === 'investments' && (
        <InvestmentsPage
          fontTheme={fontTheme}
          onSelectFontTheme={setFontTheme}
          onNavigateHome={() => setViewMode('landing')}
          onNavigateMarkets={() => setViewMode('markets')}
          onNavigateInvestments={() => setViewMode('investments')}
          onNavigateHowItWorks={() => setViewMode('how-it-works')}
          onNavigateAbout={() => setViewMode('about')}
          onNavigateSecurity={() => setViewMode('security')}
          onNavigateLegal={(tab) => {
            setLegalTab(tab);
            setViewMode('legal');
          }}
          onNavigateSupport={() => setViewMode('support')}
          onNavigateLogin={() => setViewMode('login')}
          onNavigateSignUp={() => setViewMode('signup')}
          onEnterDashboard={() => setViewMode('dashboard')}
          onOpenRiskDisclosure={() => setIsRiskModalOpen(true)}
        />
      )}

      {viewMode === 'how-it-works' && (
        <HowItWorksPage
          fontTheme={fontTheme}
          onSelectFontTheme={setFontTheme}
          onNavigateHome={() => setViewMode('landing')}
          onNavigateMarkets={() => setViewMode('markets')}
          onNavigateInvestments={() => setViewMode('investments')}
          onNavigateHowItWorks={() => setViewMode('how-it-works')}
          onNavigateAbout={() => setViewMode('about')}
          onNavigateSecurity={() => setViewMode('security')}
          onNavigateLegal={(tab) => {
            setLegalTab(tab);
            setViewMode('legal');
          }}
          onNavigateSupport={() => setViewMode('support')}
          onNavigateLogin={() => setViewMode('login')}
          onNavigateSignUp={() => setViewMode('signup')}
          onEnterDashboard={() => setViewMode('dashboard')}
          onOpenRiskDisclosure={() => setIsRiskModalOpen(true)}
        />
      )}

      {viewMode === 'about' && (
        <AboutPage
          fontTheme={fontTheme}
          onSelectFontTheme={setFontTheme}
          onNavigateHome={() => setViewMode('landing')}
          onNavigateMarkets={() => setViewMode('markets')}
          onNavigateInvestments={() => setViewMode('investments')}
          onNavigateHowItWorks={() => setViewMode('how-it-works')}
          onNavigateAbout={() => setViewMode('about')}
          onNavigateSecurity={() => setViewMode('security')}
          onNavigateLegal={(tab) => {
            setLegalTab(tab);
            setViewMode('legal');
          }}
          onNavigateSupport={() => setViewMode('support')}
          onNavigateLogin={() => setViewMode('login')}
          onNavigateSignUp={() => setViewMode('signup')}
          onEnterDashboard={() => setViewMode('dashboard')}
          onOpenRiskDisclosure={() => setIsRiskModalOpen(true)}
        />
      )}

      {viewMode === 'login' && (
        <LoginPage
          onLoginSuccess={() => setViewMode('dashboard')}
          onNavigateSignUp={() => setViewMode('signup')}
          onNavigateHome={() => setViewMode('landing')}
          fontTheme={fontTheme}
        />
      )}

      {viewMode === 'signup' && (
        <SignUpPage
          onSignUpSuccess={() => setViewMode('dashboard')}
          onNavigateLogin={() => setViewMode('login')}
          onNavigateHome={() => setViewMode('landing')}
          fontTheme={fontTheme}
        />
      )}

      {viewMode === 'security' && (
        <SecurityPage
          onNavigateHome={() => setViewMode('landing')}
          onNavigateSignUp={() => setViewMode('signup')}
          onOpenRiskDisclosure={() => setIsRiskModalOpen(true)}
        />
      )}

      {viewMode === 'legal' && (
        <LegalPage
          initialTab={legalTab}
          onNavigateHome={() => setViewMode('landing')}
          onNavigateSignUp={() => setViewMode('signup')}
          onOpenRiskDisclosure={() => setIsRiskModalOpen(true)}
        />
      )}

      {viewMode === 'support' && (
        <SupportPage
          onNavigateHome={() => setViewMode('landing')}
          onNavigateDashboard={() => setViewMode('dashboard')}
          onOpenRiskDisclosure={() => setIsRiskModalOpen(true)}
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* PUBLIC INSTITUTIONAL LANDING PORTAL */}
      {/* ------------------------------------------------------------- */}
      {viewMode === 'landing' && (
        <div className="flex flex-col min-h-screen">
          {/* Top Banner Notice: Mode Switcher */}
          <div className="bg-[#121520] border-b border-white/[0.08] px-4 py-2 text-center text-xs text-[#8F96A3] flex items-center justify-center gap-2">
            <span>Viewing Public Institutional Portal.</span>
            <button
              onClick={() => setViewMode('dashboard')}
              className="text-[#C8F135] font-bold underline hover:text-white transition-colors"
            >
              Enter Authenticated Investor Dashboard &rarr;
            </button>
          </div>

          <LandingNavbar
            fontTheme={fontTheme}
            onSelectFontTheme={setFontTheme}
            onOpenSignIn={() => setViewMode('login')}
            onOpenSignUp={() => setViewMode('signup')}
            onNavigateHome={() => setViewMode('landing')}
            onNavigateMarkets={() => setViewMode('markets')}
            onNavigateInvestments={() => setViewMode('investments')}
            onNavigateHowItWorks={() => setViewMode('how-it-works')}
            onNavigateAbout={() => setViewMode('about')}
            onNavigateSecurity={() => setViewMode('security')}
            onEnterDashboard={() => setViewMode('dashboard')}
            activePage="landing"
          />

          <main className="flex-1">
            <LandingHero
              onStartInvesting={() => setViewMode('signup')}
              onGetStarted={() => setViewMode('signup')}
              onExploreMarkets={() => {
                setViewMode('markets');
              }}
            />

            <LiveMarketsSection
              assets={assets}
              onTradeAsset={(asset) => {
                setViewMode('dashboard');
                handleOpenTrade(asset);
              }}
              onViewAllMarkets={() => {
                setViewMode('markets');
              }}
            />

            <PortfolioPreviewSection
              portfolio={portfolio}
              assets={assets}
              onOpenDashboard={() => setViewMode('dashboard')}
            />

            <WhyVeyraSection />

            <HowItWorksSection
              onStartVerification={() => setViewMode('signup')}
            />

            <SecuritySection onOpenRiskModal={() => setIsRiskModalOpen(true)} />
          </main>

          <LandingFooter
            onOpenRiskDisclosure={() => setIsRiskModalOpen(true)}
            onEnterDashboard={() => setViewMode('dashboard')}
            onNavigateHome={() => setViewMode('landing')}
            onNavigateMarkets={() => setViewMode('markets')}
            onNavigateInvestments={() => setViewMode('investments')}
            onNavigateHowItWorks={() => setViewMode('how-it-works')}
            onNavigateAbout={() => setViewMode('about')}
            onNavigateSecurity={() => setViewMode('security')}
            onNavigateLegal={(tab) => {
              setLegalTab(tab);
              setViewMode('legal');
            }}
            onNavigateSupport={() => setViewMode('support')}
            onNavigateLogin={() => setViewMode('login')}
            onNavigateSignUp={() => setViewMode('signup')}
          />
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* AUTHENTICATED DASHBOARD VIEW */}
      {/* ------------------------------------------------------------- */}
      {viewMode === 'dashboard' && (
        <div className="flex min-h-screen bg-[#090A0E]">
          
          {/* Sidebar (Desktop) */}
          <DashboardSidebar
            currentTab={dashboardTab}
            onSelectTab={(tab) => setDashboardTab(tab)}
            onExitToLanding={() => setViewMode('landing')}
            onNavigateLogin={() => {
              setViewMode('login');
              showToast({
                type: 'info',
                title: 'Terminal Locked',
                message: 'Hardware cryptographic keys unmounted. Session closed.',
              });
            }}
            onOpenHelp={() => setViewMode('support')}
          />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-10">
            {/* Top Bar */}
            <DashboardTopBar
              assets={assets}
              fontTheme={fontTheme}
              onSelectFontTheme={setFontTheme}
              onSelectAsset={(asset) => handleOpenTrade(asset)}
              onOpenHelp={() => setViewMode('support')}
              onExitToLanding={() => setViewMode('landing')}
              onNavigateLogin={() => {
                setViewMode('login');
                showToast({
                  type: 'info',
                  title: 'Terminal Locked',
                  message: 'Hardware cryptographic keys unmounted. Session closed.',
                });
              }}
            />

            {/* Dashboard Sub-Views */}
            <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
              {dashboardTab === 'overview' && (
                <OverviewView
                  portfolio={portfolio}
                  assets={assets}
                  transactions={transactions}
                  onOpenTrade={handleOpenTrade}
                  onOpenDeposit={handleOpenDeposit}
                  onOpenWithdraw={handleOpenWithdraw}
                  onNavigateTab={(tab) => setDashboardTab(tab)}
                />
              )}

              {dashboardTab === 'markets' && (
                <MarketsView
                  assets={assets}
                  watchlist={watchlist}
                  onToggleWatchlist={handleToggleWatchlist}
                  onTradeAsset={handleOpenTrade}
                />
              )}

              {dashboardTab === 'invest' && (
                <InvestView
                  assets={assets}
                  portfolio={portfolio}
                  onExecuteTrade={handleExecuteTrade}
                  onOpenRiskDisclosure={() => setIsRiskModalOpen(true)}
                />
              )}

              {dashboardTab === 'portfolio' && (
                <PortfolioView
                  portfolio={portfolio}
                  assets={assets}
                  onTradeAsset={handleOpenTrade}
                  onOpenDeposit={handleOpenDeposit}
                />
              )}

              {dashboardTab === 'transactions' && (
                <TransactionsView transactions={transactions} />
              )}

              {dashboardTab === 'wallet' && (
                <WalletView
                  portfolio={portfolio}
                  assets={assets}
                  onOpenDeposit={handleOpenDeposit}
                  onOpenWithdraw={handleOpenWithdraw}
                  onTradeAsset={handleOpenTrade}
                />
              )}

              {dashboardTab === 'watchlist' && (
                <WatchlistView
                  assets={assets}
                  watchlist={watchlist}
                  onToggleWatchlist={handleToggleWatchlist}
                  onTradeAsset={handleOpenTrade}
                  onNavigateMarkets={() => setDashboardTab('markets')}
                />
              )}

              {dashboardTab === 'settings' && (
                <SettingsView
                  fontTheme={fontTheme}
                  onSelectFontTheme={setFontTheme}
                />
              )}
            </main>
          </div>

          {/* Mobile Bottom Navigation */}
          <MobileBottomNav
            currentTab={dashboardTab}
            onSelectTab={(tab) => setDashboardTab(tab)}
          />

        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* GLOBAL MODALS */}
      {/* ------------------------------------------------------------- */}
      <TradeModal
        isOpen={isTradeModalOpen}
        onClose={() => setIsTradeModalOpen(false)}
        asset={tradeAsset}
        availableCash={portfolio.availableCash}
        currentHolding={portfolio.holdings[tradeAsset.id]?.quantity || 0}
        onExecuteTrade={handleExecuteTrade}
        onOpenRiskDisclosure={() => setIsRiskModalOpen(true)}
      />

      <DepositWithdrawModal
        isOpen={isDepWithdrawOpen}
        onClose={() => setIsDepWithdrawOpen(false)}
        initialType={depWithdrawMode}
        availableCash={portfolio.availableCash}
        onConfirm={handleDepositWithdraw}
      />

      <RiskDisclosureModal
        isOpen={isRiskModalOpen}
        onClose={() => setIsRiskModalOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        onAuthenticated={handleAuthComplete}
      />

    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <VeyraApp />
    </ToastProvider>
  );
}
