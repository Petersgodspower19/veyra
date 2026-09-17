import React from 'react';
import { UserPortfolio, CryptoAsset } from '../../types';
import { formatCurrency, formatCompactCurrency } from '../../data/mockData';
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Copy,
  CheckCircle2,
} from 'lucide-react';
import { useToast } from '../common/Toast';

interface WalletViewProps {
  portfolio: UserPortfolio;
  assets: CryptoAsset[];
  onOpenDeposit: () => void;
  onOpenWithdraw: () => void;
  onTradeAsset: (asset: CryptoAsset) => void;
}

export const WalletView: React.FC<WalletViewProps> = ({
  portfolio,
  assets,
  onOpenDeposit,
  onOpenWithdraw,
  onTradeAsset,
}) => {
  const { showToast } = useToast();

  const handleCopyAddress = (addr: string, name: string) => {
    navigator.clipboard?.writeText(addr);
    showToast({
      type: 'info',
      title: 'Address Copied',
      message: `${name} institutional custodial address copied to clipboard.`,
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Institutional Wallet & Custody
          </h2>
          <p className="text-sm text-[#8F96A3] mt-0.5">
            Multi-Party Computation (MPC) cold vaults with segregated depository accounts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDeposit}
            className="px-4 py-2 rounded-xl bg-[#C8F135] text-[#090A0E] text-xs font-bold hover:bg-[#d5fb46] transition-all flex items-center gap-1.5 shadow-sm"
          >
            <ArrowDownLeft className="w-3.5 h-3.5" />
            <span>Deposit Funds</span>
          </button>
          <button
            onClick={onOpenWithdraw}
            className="px-4 py-2 rounded-xl bg-[#161B26] hover:bg-[#1E2536] text-white text-xs font-semibold border border-white/10 transition-all flex items-center gap-1.5"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Withdraw Cash</span>
          </button>
        </div>
      </div>

      {/* 4 Financial Balances Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0E1017] p-5 rounded-2xl border border-white/[0.07] shadow-sm">
          <span className="text-xs font-semibold text-[#8F96A3] uppercase tracking-wider block">
            Total Vault Balance
          </span>
          <div className="mt-2 text-2xl font-extrabold text-white font-mono-num">
            {formatCurrency(portfolio.totalValue)}
          </div>
          <span className="text-[11px] text-[#8F96A3] mt-1 block">Digital Assets + Liquid USD</span>
        </div>

        <div className="bg-[#0E1017] p-5 rounded-2xl border border-white/[0.07] shadow-sm">
          <span className="text-xs font-semibold text-[#8F96A3] uppercase tracking-wider block">
            Available Cash (USD)
          </span>
          <div className="mt-2 text-2xl font-extrabold text-white font-mono-num">
            {formatCurrency(portfolio.availableCash)}
          </div>
          <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1 mt-1">
            <ShieldCheck className="w-3 h-3" />
            FDIC Pass-Through Eligible
          </span>
        </div>

        <div className="bg-[#0E1017] p-5 rounded-2xl border border-white/[0.07] shadow-sm">
          <span className="text-xs font-semibold text-[#8F96A3] uppercase tracking-wider block">
            Lifetime Deposits
          </span>
          <div className="mt-2 text-2xl font-extrabold text-white font-mono-num">
            $110,000.00
          </div>
          <span className="text-[11px] text-[#8F96A3] mt-1 block">ACH & Federal Wire</span>
        </div>

        <div className="bg-[#0E1017] p-5 rounded-2xl border border-white/[0.07] shadow-sm">
          <span className="text-xs font-semibold text-[#8F96A3] uppercase tracking-wider block">
            Lifetime Withdrawals
          </span>
          <div className="mt-2 text-2xl font-extrabold text-white font-mono-num">
            $2,500.00
          </div>
          <span className="text-[11px] text-[#8F96A3] mt-1 block">Settled to Linked Bank</span>
        </div>
      </div>

      {/* Custody Segregation Info Card */}
      <div className="bg-[#0E1017] p-6 rounded-2xl border border-white/[0.07] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/[0.06] gap-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#C8F135]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Linked Banking Depository (ACH / Fedwire)
            </h3>
          </div>
          <span className="text-xs text-[#10B981] font-mono font-semibold">
            STATUS: ACTIVE & VERIFIED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono-num">
          <div className="bg-[#121520] p-4 rounded-xl border border-white/[0.05]">
            <span className="text-[#8F96A3] block">Depository Partner</span>
            <span className="text-white font-bold text-sm mt-1 block">JP Morgan Chase Bank, N.A.</span>
            <span className="text-[10px] text-[#5A6272] mt-0.5 block">Routing: 021000021</span>
          </div>

          <div className="bg-[#121520] p-4 rounded-xl border border-white/[0.05]">
            <span className="text-[#8F96A3] block">Account Title</span>
            <span className="text-white font-bold text-sm mt-1 block">Alexander Sterling</span>
            <span className="text-[10px] text-[#5A6272] mt-0.5 block">Premier Private Checking •••• 9184</span>
          </div>

          <div className="bg-[#121520] p-4 rounded-xl border border-white/[0.05]">
            <span className="text-[#8F96A3] block">Settlement Speed</span>
            <span className="text-white font-bold text-sm mt-1 block">Same-Day Fedwire / Instant ACH</span>
            <span className="text-[10px] text-[#5A6272] mt-0.5 block">Zero Brokerage Wire Surcharge</span>
          </div>
        </div>
      </div>

      {/* Supported Digital Assets Vault Balances */}
      <div className="bg-[#0E1017] rounded-2xl border border-white/[0.07] overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Supported Digital Assets & Custody Wallets
          </h3>
          <span className="text-xs text-[#8F96A3] font-mono-num">
            MPC Anchor Vault v2.4
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/[0.06] text-[11px] font-semibold text-[#8F96A3] uppercase tracking-wider bg-[#12151F]/60">
                <th className="py-4 px-6">Asset</th>
                <th className="py-4 px-6 text-right">Available Balance</th>
                <th className="py-4 px-6 text-right">Value (USD)</th>
                <th className="py-4 px-6">Vault Cold Address</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {assets.map((asset) => {
                const holding = portfolio.holdings[asset.id];
                const qty = holding?.quantity || 0;
                const usdVal = qty * asset.price;
                const mockAddr = `0x${asset.id.slice(0, 3)}...${Math.random().toString(36).substring(2, 6)}`;

                return (
                  <tr key={asset.id} className="hover:bg-white/[0.02] transition-colors text-xs">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white"
                          style={{
                            backgroundColor: `${asset.color}25`,
                            border: `1px solid ${asset.color}50`,
                            color: asset.color === '#23292F' ? '#F3F4F6' : asset.color,
                          }}
                        >
                          {asset.ticker}
                        </div>
                        <div>
                          <span className="font-bold text-white block">{asset.name}</span>
                          <span className="text-[10px] text-[#8F96A3] font-mono-num">{asset.ticker}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right font-mono-num">
                      <span className="font-semibold text-white block">
                        {qty > 0 ? qty.toLocaleString(undefined, { maximumFractionDigits: 5 }) : '0.00'}
                      </span>
                      <span className="text-[10px] text-[#5A6272]">{asset.ticker}</span>
                    </td>

                    <td className="py-4 px-6 text-right font-mono-num font-bold text-white">
                      {formatCurrency(usdVal)}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[#8F96A3] text-xs bg-[#121520] px-2 py-1 rounded border border-white/[0.05]">
                          {mockAddr}
                        </span>
                        <button
                          onClick={() => handleCopyAddress(mockAddr, asset.name)}
                          className="p-1 text-[#8F96A3] hover:text-white rounded hover:bg-white/10"
                          title="Copy Vault Deposit Address"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => onTradeAsset(asset)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#161A24] hover:bg-[#C8F135] text-white hover:text-[#090A0E] transition-all border border-white/10"
                      >
                        Trade
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
