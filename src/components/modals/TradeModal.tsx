import React, { useState, useEffect } from 'react';
import { CryptoAsset, Transaction } from '../../types';
import { formatCurrency, formatNumber } from '../../data/mockData';
import { X, ArrowRight, CheckCircle2, ShieldCheck, AlertCircle, RefreshCw, Lock } from 'lucide-react';
import { useToast } from '../common/Toast';

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: CryptoAsset | null;
  availableCash: number;
  availableAssetQuantity: number;
  onExecuteTrade: (trade: {
    asset: CryptoAsset;
    type: 'BUY' | 'SELL';
    usdAmount: number;
    quantity: number;
    fee: number;
  }) => void;
  onOpenRiskDisclosure: () => void;
}

export const TradeModal: React.FC<TradeModalProps> = ({
  isOpen,
  onClose,
  asset,
  availableCash,
  availableAssetQuantity,
  onExecuteTrade,
  onOpenRiskDisclosure,
}) => {
  const { showToast } = useToast();
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');
  const [usdInput, setUsdInput] = useState<string>('5000');
  const [step, setStep] = useState<'input' | 'review' | 'executing' | 'success'>('input');
  const [lastTxId, setLastTxId] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setStep('input');
      if (tradeType === 'BUY') {
        setUsdInput('5000');
      } else {
        const defaultSellUsd = asset ? (availableAssetQuantity * asset.price * 0.5).toFixed(0) : '1000';
        setUsdInput(defaultSellUsd);
      }
    }
  }, [isOpen, asset, tradeType, availableAssetQuantity]);

  if (!isOpen || !asset) return null;

  const currentPrice = asset.price;
  const numUsd = parseFloat(usdInput) || 0;

  // Fee calculation (0.25% fee e.g. $25 for $5,000 for realistic institutional fee)
  const feeRate = 0.005; // 0.5% or $25 for $5000 exactly matches prompt example! (5000 * 0.005 = 25.00)
  const estimatedFee = Number((numUsd * feeRate).toFixed(2));
  const estimatedQuantity = currentPrice > 0 ? numUsd / currentPrice : 0;
  const totalCost = tradeType === 'BUY' ? numUsd + estimatedFee : numUsd - estimatedFee;

  const hasInsufficientCash = tradeType === 'BUY' && totalCost > availableCash;
  const hasInsufficientAsset = tradeType === 'SELL' && estimatedQuantity > availableAssetQuantity;
  const isInputValid = numUsd > 0 && !hasInsufficientCash && !hasInsufficientAsset;

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isInputValid) return;
    setStep('review');
  };

  const handleConfirmExecution = () => {
    setStep('executing');
    setTimeout(() => {
      onExecuteTrade({
        asset,
        type: tradeType,
        usdAmount: numUsd,
        quantity: estimatedQuantity,
        fee: estimatedFee,
      });
      const generatedId = `tx-${Math.floor(10000 + Math.random() * 90000)}`;
      setLastTxId(generatedId);
      setStep('success');
      showToast({
        type: 'success',
        title: `Order Executed: ${tradeType === 'BUY' ? 'Bought' : 'Sold'} ${estimatedQuantity.toFixed(5)} ${asset.ticker}`,
        message: `Settled at ${formatCurrency(currentPrice)} with instant institutional custody allocation.`,
      });
    }, 1200);
  };

  const handleReset = () => {
    setStep('input');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0E1017] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between bg-[#121520]">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs text-white"
              style={{
                backgroundColor: `${asset.color}25`,
                border: `1px solid ${asset.color}50`,
                color: asset.color === '#23292F' ? '#F3F4F6' : asset.color,
              }}
            >
              {asset.ticker}
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                {asset.name}
                <span className="text-xs text-[#8F96A3] font-mono-num font-normal">
                  {asset.ticker}
                </span>
              </h3>
              <div className="text-xs text-[#8F96A3] font-mono-num flex items-center gap-2">
                <span>Current price:</span>
                <span className="text-white font-semibold">{formatCurrency(currentPrice)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#8F96A3] hover:text-white p-1 rounded-lg hover:bg-white/[0.05] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {step === 'input' && (
            <form onSubmit={handleReview} className="space-y-6">
              {/* Buy / Sell Tabs */}
              <div className="grid grid-cols-2 p-1 bg-[#131620] rounded-xl border border-white/[0.07]">
                <button
                  type="button"
                  onClick={() => setTradeType('BUY')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    tradeType === 'BUY'
                      ? 'bg-[#C8F135] text-[#090A0E] shadow-sm'
                      : 'text-[#8F96A3] hover:text-white'
                  }`}
                >
                  Buy {asset.ticker}
                </button>
                <button
                  type="button"
                  onClick={() => setTradeType('SELL')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    tradeType === 'SELL'
                      ? 'bg-[#F43F5E] text-white shadow-sm'
                      : 'text-[#8F96A3] hover:text-white'
                  }`}
                >
                  Sell {asset.ticker}
                </button>
              </div>

              {/* Amount to Invest Input */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <label htmlFor="usdAmountInput" className="font-semibold text-white">Amount to Invest</label>
                  <span className="text-[#8F96A3] font-mono-num">
                    {tradeType === 'BUY' ? (
                      <>Available Cash: <strong className="text-white">{formatCurrency(availableCash)}</strong></>
                    ) : (
                      <>Available {asset.ticker}: <strong className="text-white">{availableAssetQuantity.toFixed(4)}</strong> ({formatCurrency(availableAssetQuantity * currentPrice)})</>
                    )}
                  </span>
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-[#8F96A3] font-mono-num">
                    $
                  </span>
                  <input
                    id="usdAmountInput"
                    type="number"
                    step="any"
                    value={usdInput}
                    onChange={(e) => setUsdInput(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-[#141824] border border-white/10 rounded-xl py-3.5 pl-9 pr-4 text-xl font-bold text-white font-mono-num focus:outline-none focus:border-[#C8F135] transition-all"
                  />
                </div>

                {/* Quick Presets */}
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {[500, 1000, 5000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setUsdInput(preset.toString())}
                      className="py-1.5 px-2 bg-[#141722] hover:bg-[#1A1F2E] text-xs font-semibold text-[#8F96A3] hover:text-white rounded-lg border border-white/[0.06] transition-all font-mono-num"
                    >
                      ${preset.toLocaleString()}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      if (tradeType === 'BUY') {
                        setUsdInput(Math.max(0, Math.floor(availableCash - 30)).toString());
                      } else {
                        setUsdInput((availableAssetQuantity * currentPrice).toFixed(0));
                      }
                    }}
                    className="py-1.5 px-2 bg-[#141722] hover:bg-[#1A1F2E] text-xs font-bold text-[#C8F135] rounded-lg border border-white/[0.06] transition-all"
                  >
                    MAX
                  </button>
                </div>
              </div>

              {/* Order Calculations Breakdown (Directly matches user prompt:
                  Estimated quantity: 0.04612 BTC
                  Estimated fee: $25.00
                  Total: $5,025.00) */}
              <div className="bg-[#121520] rounded-xl p-4 border border-white/[0.07] space-y-2.5 text-xs font-mono-num">
                <div className="flex items-center justify-between text-[#8F96A3]">
                  <span>Estimated quantity:</span>
                  <span className="font-semibold text-white">
                    {estimatedQuantity.toFixed(5)} {asset.ticker}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#8F96A3]">
                  <span>Estimated fee (0.50%):</span>
                  <span className="font-semibold text-white">{formatCurrency(estimatedFee)}</span>
                </div>
                <div className="pt-2 border-t border-white/[0.07] flex items-center justify-between text-sm">
                  <span className="font-bold text-white">Total:</span>
                  <span className="font-extrabold text-[#C8F135] text-base">
                    {formatCurrency(totalCost)}
                  </span>
                </div>
              </div>

              {/* Validation Warning */}
              {hasInsufficientCash && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Insufficient cash balance. Please deposit funds or adjust amount.</span>
                </div>
              )}

              {hasInsufficientAsset && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Insufficient {asset.ticker} balance to sell this amount.</span>
                </div>
              )}

              {/* Review CTA */}
              <button
                type="submit"
                disabled={!isInputValid}
                className="w-full py-3.5 rounded-xl bg-[#C8F135] disabled:bg-white/10 disabled:text-[#5A6272] disabled:cursor-not-allowed text-[#090A0E] font-bold text-sm hover:bg-[#d5fb46] transition-all shadow-[0_0_20px_rgba(200,241,53,0.15)] flex items-center justify-center gap-2"
              >
                <span>Review Investment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={onOpenRiskDisclosure}
                  className="text-[11px] text-[#5A6272] hover:text-[#8F96A3] transition-colors underline"
                >
                  Digital assets involve substantial market risk. View Risk Disclosure.
                </button>
              </div>
            </form>
          )}

          {step === 'review' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="text-center py-2">
                <span className="text-xs uppercase font-mono tracking-widest text-[#8F96A3]">
                  Order Verification
                </span>
                <h4 className="text-xl font-bold text-white mt-1">
                  Confirm {tradeType === 'BUY' ? 'Purchase' : 'Sale'} of {asset.name}
                </h4>
              </div>

              <div className="bg-[#141824] rounded-xl p-5 border border-white/10 space-y-3.5 text-xs font-mono-num">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-[#8F96A3]">Action</span>
                  <span className={`font-bold px-2 py-0.5 rounded ${tradeType === 'BUY' ? 'text-[#C8F135] bg-[#C8F135]/10' : 'text-[#F43F5E] bg-[#F43F5E]/10'}`}>
                    {tradeType}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8F96A3]">Execution Venue</span>
                  <span className="text-white font-medium">Veyra Prime Liquidity Router</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8F96A3]">Price per unit</span>
                  <span className="text-white font-semibold">{formatCurrency(currentPrice)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8F96A3]">Quantity</span>
                  <span className="text-white font-bold">{estimatedQuantity.toFixed(6)} {asset.ticker}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8F96A3]">Brokerage fee</span>
                  <span className="text-white font-semibold">{formatCurrency(estimatedFee)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8F96A3]">Custody destination</span>
                  <span className="text-[#C8F135] font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Anchor Vault (Cold MPC)
                  </span>
                </div>
                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-sm">
                  <span className="font-bold text-white">Settlement Total</span>
                  <span className="font-extrabold text-[#C8F135] text-lg">{formatCurrency(totalCost)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="w-1/3 py-3 rounded-xl bg-[#141822] hover:bg-[#1A1F2E] text-white text-xs font-semibold border border-white/10 transition-all"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleConfirmExecution}
                  className="w-2/3 py-3 rounded-xl bg-[#C8F135] text-[#090A0E] text-xs font-bold hover:bg-[#d5fb46] transition-all shadow-[0_0_20px_rgba(200,241,53,0.2)] flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Confirm & Authorize Order</span>
                </button>
              </div>
            </div>
          )}

          {step === 'executing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <RefreshCw className="w-10 h-10 text-[#C8F135] animate-spin" />
              <div>
                <h4 className="text-base font-bold text-white">Routing Order Through Institutional Quorum</h4>
                <p className="text-xs text-[#8F96A3] mt-1 font-mono-num">
                  Verifying cold MPC signature • Settlement in progress...
                </p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="space-y-6 py-4 text-center animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-2xl bg-[#C8F135]/15 border border-[#C8F135]/30 text-[#C8F135] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase text-[#C8F135] font-bold">
                  Order Successfully Filled
                </span>
                <h4 className="text-2xl font-extrabold text-white mt-1">
                  {tradeType === 'BUY' ? 'Acquisition Complete' : 'Sale Executed'}
                </h4>
                <p className="text-xs text-[#8F96A3] mt-1 font-mono-num">
                  Receipt ID: {lastTxId} • Immediate Settlement
                </p>
              </div>

              <div className="bg-[#141824] rounded-xl p-4 border border-white/10 text-xs font-mono-num space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-[#8F96A3]">Net Asset Received:</span>
                  <span className="text-white font-bold">{estimatedQuantity.toFixed(6)} {asset.ticker}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8F96A3]">Execution Price:</span>
                  <span className="text-white font-medium">{formatCurrency(currentPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8F96A3]">Brokerage Fee:</span>
                  <span className="text-white font-medium">{formatCurrency(estimatedFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8F96A3]">Total Settled:</span>
                  <span className="text-[#C8F135] font-bold">{formatCurrency(totalCost)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 rounded-xl bg-[#C8F135] text-[#090A0E] text-xs font-bold hover:bg-[#d5fb46] transition-all"
              >
                Done & Return to Portfolio
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
