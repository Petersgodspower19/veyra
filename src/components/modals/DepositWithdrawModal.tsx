import React, { useState } from 'react';
import { X, ArrowDownLeft, ArrowUpRight, Building2, CheckCircle2, ShieldCheck, CreditCard } from 'lucide-react';
import { formatCurrency } from '../../data/mockData';
import { useToast } from '../common/Toast';

interface DepositWithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'deposit' | 'withdraw';
  availableCash: number;
  onProcessCashTransfer: (type: 'DEPOSIT' | 'WITHDRAWAL', amount: number) => void;
}

export const DepositWithdrawModal: React.FC<DepositWithdrawModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'deposit',
  availableCash,
  onProcessCashTransfer,
}) => {
  const { showToast } = useToast();
  const [mode, setMode] = useState<'deposit' | 'withdraw'>(defaultMode);
  const [amountStr, setAmountStr] = useState('5000');
  const [method, setMethod] = useState<'ach' | 'wire'>('ach');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const numAmount = parseFloat(amountStr) || 0;
  const isWithdrawInvalid = mode === 'withdraw' && (numAmount <= 0 || numAmount > availableCash);
  const isDepositInvalid = mode === 'deposit' && numAmount <= 0;

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (isWithdrawInvalid || isDepositInvalid) return;

    setIsProcessing(true);
    setTimeout(() => {
      onProcessCashTransfer(mode === 'deposit' ? 'DEPOSIT' : 'WITHDRAWAL', numAmount);
      setIsProcessing(false);
      showToast({
        type: 'success',
        title: mode === 'deposit' ? 'Deposit Initiated' : 'Withdrawal Dispatched',
        message:
          mode === 'deposit'
            ? `Successfully credited ${formatCurrency(numAmount)} via ${method.toUpperCase()} transfer.`
            : `Transferred ${formatCurrency(numAmount)} to linked JP Morgan Chase checking (...9184).`,
      });
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0E1017] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between bg-[#121520]">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${mode === 'deposit' ? 'bg-[#C8F135]/15 text-[#C8F135]' : 'bg-[#F43F5E]/15 text-[#F43F5E]'}`}>
              {mode === 'deposit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {mode === 'deposit' ? 'Fund Account (USD)' : 'Withdraw Cash (USD)'}
              </h3>
              <p className="text-xs text-[#8F96A3] font-mono">
                FDIC Pass-Through Protected Custody
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

        {/* Form Body */}
        <form onSubmit={handleAction} className="p-6 space-y-5">
          {/* Mode Switcher */}
          <div className="grid grid-cols-2 p-1 bg-[#131620] rounded-xl border border-white/[0.07]">
            <button
              type="button"
              onClick={() => setMode('deposit')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'deposit'
                  ? 'bg-[#C8F135] text-[#090A0E] shadow-sm'
                  : 'text-[#8F96A3] hover:text-white'
              }`}
            >
              Deposit Funds
            </button>
            <button
              type="button"
              onClick={() => setMode('withdraw')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'withdraw'
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-[#8F96A3] hover:text-white'
              }`}
            >
              Withdraw Cash
            </button>
          </div>

          {/* Amount input */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <label htmlFor="cashTransferInput" className="font-semibold text-white">Transfer Amount</label>
              <span className="text-[#8F96A3] font-mono-num">
                Available Cash: <strong className="text-white">{formatCurrency(availableCash)}</strong>
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-[#8F96A3] font-mono-num">
                $
              </span>
              <input
                id="cashTransferInput"
                type="number"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                placeholder="0.00"
                className="w-full bg-[#141824] border border-white/10 rounded-xl py-3 pl-9 pr-4 text-xl font-bold text-white font-mono-num focus:outline-none focus:border-[#C8F135] transition-all"
              />
            </div>
            <div className="flex gap-2 mt-2.5">
              {[1000, 5000, 10000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmountStr(amt.toString())}
                  className="px-3 py-1 bg-[#141722] hover:bg-[#1A1F2E] text-xs font-semibold text-[#8F96A3] hover:text-white rounded-lg border border-white/[0.06] font-mono-num"
                >
                  +${amt.toLocaleString()}
                </button>
              ))}
              {mode === 'withdraw' && (
                <button
                  type="button"
                  onClick={() => setAmountStr(availableCash.toFixed(0))}
                  className="px-3 py-1 bg-[#141722] hover:bg-[#1A1F2E] text-xs font-bold text-[#C8F135] rounded-lg border border-white/[0.06]"
                >
                  All Cash
                </button>
              )}
            </div>
          </div>

          {/* Transfer Method */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white block">Funding Method</label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setMethod('ach')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  method === 'ach'
                    ? 'border-[#C8F135]/50 bg-[#161B24]'
                    : 'border-white/[0.06] bg-[#12151F] text-[#8F96A3]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Building2 className={`w-4 h-4 ${method === 'ach' ? 'text-[#C8F135]' : 'text-[#8F96A3]'}`} />
                  <span className="text-xs font-bold text-white">Bank ACH</span>
                </div>
                <span className="text-[10px] text-[#8F96A3] mt-2">Zero Fee • Instant Credit</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('wire')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  method === 'wire'
                    ? 'border-[#C8F135]/50 bg-[#161B24]'
                    : 'border-white/[0.06] bg-[#12151F] text-[#8F96A3]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CreditCard className={`w-4 h-4 ${method === 'wire' ? 'text-[#C8F135]' : 'text-[#8F96A3]'}`} />
                  <span className="text-xs font-bold text-white">Federal Wire</span>
                </div>
                <span className="text-[10px] text-[#8F96A3] mt-2">Same Day • High Limit</span>
              </button>
            </div>
          </div>

          {/* Linked Bank Account readout */}
          <div className="p-3.5 bg-[#121520] rounded-xl border border-white/[0.07] text-xs flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-[#8F96A3]" />
              <div>
                <span className="font-semibold text-white block">JP Morgan Chase Bank, N.A.</span>
                <span className="text-[11px] text-[#8F96A3] font-mono-num">Premier Checking •••• 9184</span>
              </div>
            </div>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
              VERIFIED
            </span>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isProcessing || isWithdrawInvalid || isDepositInvalid}
            className="w-full py-3.5 rounded-xl bg-[#C8F135] disabled:bg-white/10 disabled:text-[#5A6272] disabled:cursor-not-allowed text-[#090A0E] font-bold text-xs hover:bg-[#d5fb46] transition-all shadow-md flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span>Authorizing Settlement...</span>
            ) : (
              <span>
                {mode === 'deposit' ? `Deposit ${formatCurrency(numAmount)}` : `Withdraw ${formatCurrency(numAmount)}`}
              </span>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
