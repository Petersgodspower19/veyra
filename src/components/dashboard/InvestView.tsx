import React, { useState } from 'react';
import { CryptoAsset, UserPortfolio } from '../../types';
import { formatCurrency, formatNumber } from '../../data/mockData';
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRightLeft,
  RefreshCw,
  FileText,
} from 'lucide-react';
import { useToast } from '../common/Toast';

interface InvestViewProps {
  assets: CryptoAsset[];
  portfolio: UserPortfolio;
  onExecuteTrade: (trade: {
    asset: CryptoAsset;
    type: 'BUY' | 'SELL';
    usdAmount: number;
    quantity: number;
    fee: number;
  }) => void;
  onOpenRiskDisclosure: () => void;
}

export const InvestView: React.FC<InvestViewProps> = ({
  assets,
  portfolio,
  onExecuteTrade,
  onOpenRiskDisclosure,
}) => {
  const { showToast } = useToast();
  const [selectedAssetId, setSelectedAssetId] = useState<string>('bitcoin');
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');
  const [usdAmountInput, setUsdAmountInput] = useState<string>('5000');
  const [step, setStep] = useState<'input' | 'review' | 'executing' | 'success'>('input');
  const [receiptTxId, setReceiptTxId] = useState<string>('');

  const selectedAsset = assets.find((a) => a.id === selectedAssetId) || assets[0];
  const holding = portfolio.holdings[selectedAsset.id];
  const userAssetQty = holding?.quantity || 0;

  const currentPrice = selectedAsset.price;
  const numUsd = parseFloat(usdAmountInput) || 0;

  // Fee rate 0.50% ($25 on $5000 exactly matches prompt specifications)
  const feeRate = 0.005;
  const estimatedFee = Number((numUsd * feeRate).toFixed(2));
  const estimatedQuantity = currentPrice > 0 ? numUsd / currentPrice : 0;
  const totalCost = tradeType === 'BUY' ? numUsd + estimatedFee : numUsd - estimatedFee;

  const hasInsufficientCash = tradeType === 'BUY' && totalCost > portfolio.availableCash;
  const hasInsufficientAsset = tradeType === 'SELL' && estimatedQuantity > userAssetQty;
  const isInputValid = numUsd > 0 && !hasInsufficientCash && !hasInsufficientAsset;

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isInputValid) return;
    setStep('review');
  };

  const handleConfirm = () => {
    setStep('executing');
    setTimeout(() => {
      onExecuteTrade({
        asset: selectedAsset,
        type: tradeType,
        usdAmount: numUsd,
        quantity: estimatedQuantity,
        fee: estimatedFee,
      });
      const generatedId = `tx-${Math.floor(10000 + Math.random() * 90000)}`;
      setReceiptTxId(generatedId);
      setStep('success');
      showToast({
        type: 'success',
        title: `Order Settled: ${tradeType === 'BUY' ? 'Acquired' : 'Disposed'} ${estimatedQuantity.toFixed(5)} ${selectedAsset.ticker}`,
        message: `Routed through Veyra Smart Liquidity Engine at ${formatCurrency(currentPrice)}.`,
      });
    }, 1100);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Invest & Smart Execution
        </h2>
        <p className="text-sm text-[#8F96A3] mt-1">
          Execute digital asset transactions with deterministic pricing, transparent fee breakdown, and cold MPC allocation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Asset Selection & Market Snapshot */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-[#0E1017] p-5 rounded-2xl border border-white/[0.07] space-y-4">
            <label className="text-xs font-bold text-white uppercase tracking-wider block">
              1. Select Digital Asset
            </label>

            <div className="grid grid-cols-1 gap-2 max-h-72 overflow-y-auto pr-1">
              {assets.map((asset) => {
                const isSelected = asset.id === selectedAsset.id;
                return (
                  <button
                    key={asset.id}
                    type="button"
                    onClick={() => {
                      setSelectedAssetId(asset.id);
                      setStep('input');
                    }}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-[#C8F135]/60 bg-[#161B25]'
                        : 'border-white/[0.06] bg-[#11141D] hover:bg-white/[0.03]'
                    }`}
                  >
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
                      <div className="text-left">
                        <span className="text-xs font-bold text-white block">{asset.name}</span>
                        <span className="text-[10px] text-[#8F96A3] font-mono-num">{asset.ticker}</span>
                      </div>
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
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Asset Snapshot Card */}
          <div className="bg-[#0E1017] p-5 rounded-2xl border border-white/[0.07] space-y-3 font-mono-num text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-white/[0.06]">
              <span className="text-[#8F96A3]">Asset Selected</span>
              <span className="text-white font-bold">{selectedAsset.name} ({selectedAsset.ticker})</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#8F96A3]">Current Price</span>
              <span className="text-white font-semibold">{formatCurrency(currentPrice)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#8F96A3]">24h Range</span>
              <span className="text-[#D1D5DB]">
                {formatCurrency(selectedAsset.low24h)} - {formatCurrency(selectedAsset.high24h)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#8F96A3]">Your Holding</span>
              <span className="text-white font-bold">
                {userAssetQty.toFixed(4)} {selectedAsset.ticker} ({formatCurrency(userAssetQty * currentPrice)})
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Execution Terminal */}
        <div className="lg:col-span-7 bg-[#0E1017] p-6 sm:p-7 rounded-2xl border border-white/[0.07] shadow-xl flex flex-col justify-between">
          
          {step === 'input' && (
            <form onSubmit={handleReview} className="space-y-6">
              
              {/* Buy / Sell Tab Switcher */}
              <div className="grid grid-cols-2 p-1 bg-[#131620] rounded-xl border border-white/[0.07]">
                <button
                  type="button"
                  onClick={() => setTradeType('BUY')}
                  className={`py-2.5 text-xs font-bold rounded-lg transition-all ${
                    tradeType === 'BUY'
                      ? 'bg-[#C8F135] text-[#090A0E] shadow-sm'
                      : 'text-[#8F96A3] hover:text-white'
                  }`}
                >
                  Buy {selectedAsset.ticker}
                </button>
                <button
                  type="button"
                  onClick={() => setTradeType('SELL')}
                  className={`py-2.5 text-xs font-bold rounded-lg transition-all ${
                    tradeType === 'SELL'
                      ? 'bg-[#F43F5E] text-white shadow-sm'
                      : 'text-[#8F96A3] hover:text-white'
                  }`}
                >
                  Sell {selectedAsset.ticker}
                </button>
              </div>

              {/* Amount to Invest */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <label htmlFor="investAmountInput" className="font-bold text-white">Amount to Invest</label>
                  <span className="text-[#8F96A3] font-mono-num">
                    {tradeType === 'BUY' ? (
                      <>Available Cash: <strong className="text-white">{formatCurrency(portfolio.availableCash)}</strong></>
                    ) : (
                      <>Holding: <strong className="text-white">{userAssetQty.toFixed(4)} {selectedAsset.ticker}</strong></>
                    )}
                  </span>
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-[#8F96A3] font-mono-num">
                    $
                  </span>
                  <input
                    id="investAmountInput"
                    type="number"
                    step="any"
                    value={usdAmountInput}
                    onChange={(e) => setUsdAmountInput(e.target.value)}
                    placeholder="5,000"
                    className="w-full bg-[#141824] border border-white/10 rounded-xl py-4 pl-10 pr-4 text-2xl font-bold text-white font-mono-num focus:outline-none focus:border-[#C8F135] transition-all"
                  />
                </div>

                {/* Preset shortcuts */}
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {['500', '1000', '5000'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setUsdAmountInput(preset)}
                      className="py-2 bg-[#121520] hover:bg-[#181D2A] text-xs font-semibold text-[#8F96A3] hover:text-white rounded-lg border border-white/[0.06] font-mono-num transition-all"
                    >
                      ${Number(preset).toLocaleString()}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      if (tradeType === 'BUY') {
                        setUsdAmountInput(Math.max(0, Math.floor(portfolio.availableCash - 30)).toString());
                      } else {
                        setUsdAmountInput((userAssetQty * currentPrice).toFixed(0));
                      }
                    }}
                    className="py-2 bg-[#121520] hover:bg-[#181D2A] text-xs font-bold text-[#C8F135] rounded-lg border border-white/[0.06] transition-all"
                  >
                    MAX
                  </button>
                </div>
              </div>

              {/* Exact financial breakdown matching prompt */}
              <div className="bg-[#121520] rounded-xl p-5 border border-white/[0.08] space-y-3 text-xs font-mono-num">
                <div className="flex justify-between items-center text-[#8F96A3]">
                  <span>Estimated quantity:</span>
                  <span className="font-semibold text-white">
                    {estimatedQuantity.toFixed(5)} {selectedAsset.ticker}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[#8F96A3]">
                  <span>Estimated fee:</span>
                  <span className="font-semibold text-white">{formatCurrency(estimatedFee)}</span>
                </div>
                <div className="pt-3 border-t border-white/[0.08] flex justify-between items-center text-sm">
                  <span className="font-bold text-white">Total:</span>
                  <span className="font-extrabold text-[#C8F135] text-lg">
                    {formatCurrency(totalCost)}
                  </span>
                </div>
              </div>

              {/* Validation alerts */}
              {hasInsufficientCash && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Available cash is {formatCurrency(portfolio.availableCash)}. Deposit cash to execute this order.</span>
                </div>
              )}

              {hasInsufficientAsset && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Holding is only {userAssetQty.toFixed(4)} {selectedAsset.ticker}. Reduce the sell amount.</span>
                </div>
              )}

              {/* CTA button */}
              <button
                type="submit"
                disabled={!isInputValid}
                className="w-full py-4 rounded-xl bg-[#C8F135] disabled:bg-white/10 disabled:text-[#5A6272] disabled:cursor-not-allowed text-[#090A0E] font-bold text-sm hover:bg-[#d5fb46] transition-all shadow-[0_0_24px_rgba(200,241,53,0.18)] flex items-center justify-center gap-2"
              >
                <span>Review Investment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={onOpenRiskDisclosure}
                  className="text-xs text-[#8F96A3] hover:text-white underline"
                >
                  Digital asset investments carry risk. Review Risk Disclosure.
                </button>
              </div>
            </form>
          )}

          {step === 'review' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-white/[0.08] pb-4">
                <span className="text-xs uppercase font-mono text-[#8F96A3] block">
                  Order Confirmation
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Authorize {tradeType === 'BUY' ? 'Purchase' : 'Sale'} of {selectedAsset.name}
                </h3>
              </div>

              <div className="bg-[#121520] p-5 rounded-xl border border-white/[0.08] space-y-3.5 text-xs font-mono-num">
                <div className="flex justify-between items-center">
                  <span className="text-[#8F96A3]">Order Type</span>
                  <span className={`font-bold px-2 py-0.5 rounded ${tradeType === 'BUY' ? 'text-[#C8F135] bg-[#C8F135]/10' : 'text-[#F43F5E] bg-[#F43F5E]/10'}`}>
                    Market {tradeType}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#8F96A3]">Execution Price</span>
                  <span className="text-white font-semibold">{formatCurrency(currentPrice)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#8F96A3]">Calculated Quantity</span>
                  <span className="text-white font-bold">{estimatedQuantity.toFixed(5)} {selectedAsset.ticker}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#8F96A3]">Brokerage Fee (0.50%)</span>
                  <span className="text-white font-semibold">{formatCurrency(estimatedFee)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#8F96A3]">Slippage Guard</span>
                  <span className="text-white font-medium">0.05% Max Tolerance</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#8F96A3]">Institutional Custody</span>
                  <span className="text-[#C8F135] font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Anchor Cold Vault
                  </span>
                </div>
                <div className="pt-3 border-t border-white/[0.08] flex justify-between items-center text-sm">
                  <span className="font-bold text-white">Settlement Total</span>
                  <span className="font-extrabold text-[#C8F135] text-lg">{formatCurrency(totalCost)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="w-1/3 py-3.5 rounded-xl bg-[#141822] text-xs font-semibold text-white border border-white/10 hover:bg-[#1A1F2E]"
                >
                  Edit Order
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="w-2/3 py-3.5 rounded-xl bg-[#C8F135] text-[#090A0E] text-xs font-bold hover:bg-[#d5fb46] transition-all shadow-[0_0_20px_rgba(200,241,53,0.2)] flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Execute & Settle Order</span>
                </button>
              </div>
            </div>
          )}

          {step === 'executing' && (
            <div className="py-16 text-center space-y-4">
              <RefreshCw className="w-10 h-10 text-[#C8F135] animate-spin mx-auto" />
              <div>
                <h4 className="text-base font-bold text-white">Submitting to Smart Order Router</h4>
                <p className="text-xs text-[#8F96A3] mt-1 font-mono-num">
                  Multi-signature hardware validation in progress...
                </p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-2xl bg-[#C8F135]/15 border border-[#C8F135]/30 text-[#C8F135] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase text-[#C8F135] font-bold">
                  Order Successfully Filled
                </span>
                <h4 className="text-2xl font-extrabold text-white mt-1">
                  Settlement Confirmed
                </h4>
                <p className="text-xs text-[#8F96A3] mt-1 font-mono-num">
                  Receipt: {receiptTxId} • Immediate Availability
                </p>
              </div>

              <div className="bg-[#121520] p-4 rounded-xl border border-white/10 text-xs font-mono-num space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-[#8F96A3]">Net Asset:</span>
                  <span className="text-white font-bold">{estimatedQuantity.toFixed(5)} {selectedAsset.ticker}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8F96A3]">Price:</span>
                  <span className="text-white font-medium">{formatCurrency(currentPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8F96A3]">Fee:</span>
                  <span className="text-white font-medium">{formatCurrency(estimatedFee)}</span>
                </div>
                <div className="flex justify-between border-t border-white/[0.06] pt-2">
                  <span className="text-white font-bold">Total Settled:</span>
                  <span className="text-[#C8F135] font-bold">{formatCurrency(totalCost)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep('input')}
                className="w-full py-3.5 rounded-xl bg-[#C8F135] text-[#090A0E] text-xs font-bold hover:bg-[#d5fb46] transition-all"
              >
                Place Another Order
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
