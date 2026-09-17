import React, { useState } from 'react';
import { Transaction, TransactionType, TransactionStatus } from '../../types';
import { formatCurrency } from '../../data/mockData';
import { Search, Download, CheckCircle, Clock, AlertTriangle, Filter, ExternalLink } from 'lucide-react';
import { useToast } from '../common/Toast';

interface TransactionsViewProps {
  transactions: Transaction[];
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({ transactions }) => {
  const { showToast } = useToast();
  const [filterType, setFilterType] = useState<string>('ALL');
  const [search, setSearch] = useState('');

  const filtered = transactions.filter((tx) => {
    const matchesSearch =
      tx.assetName.toLowerCase().includes(search.toLowerCase()) ||
      tx.assetTicker.toLowerCase().includes(search.toLowerCase()) ||
      (tx.txHash && tx.txHash.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;
    if (filterType === 'ALL') return true;
    return tx.type === filterType;
  });

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Date,Asset,Type,Amount,Price,Fee,Status,Hash']
        .concat(
          filtered.map(
            (t) =>
              `"${t.date}","${t.assetTicker}","${t.type}",${t.amount},${t.price},${t.fee},"${t.status}","${t.txHash || ''}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Veyra_Ledger_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast({
      type: 'success',
      title: 'Tax Lot CSV Exported',
      message: 'Brokerage statement successfully generated and downloaded.',
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Transaction Ledger & Audits
          </h2>
          <p className="text-sm text-[#8F96A3] mt-0.5">
            Immutable trade settlements, automated tax lots, and bank wire transfers.
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 rounded-xl bg-[#161B26] hover:bg-[#1E2536] text-white text-xs font-semibold border border-white/10 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-[#C8F135]" />
          <span>Export CSV / Tax Lot</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 bg-[#0E1017] p-1.5 rounded-2xl border border-white/[0.07]">
          {['ALL', 'BUY', 'SELL', 'DEPOSIT', 'WITHDRAWAL'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterType === t
                  ? 'bg-[#C8F135] text-[#090A0E] font-bold shadow-sm'
                  : 'text-[#8F96A3] hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {t === 'ALL' ? 'All Activity' : t}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#8F96A3] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by asset, ticker, ID..."
            className="w-full bg-[#0E1017] border border-white/[0.08] rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-[#5A6272] focus:outline-none focus:border-[#C8F135]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0E1017] rounded-2xl border border-white/[0.07] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="border-b border-white/[0.06] text-[11px] font-semibold text-[#8F96A3] uppercase tracking-wider bg-[#12151F]/60">
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Asset</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6 text-right">Amount</th>
                <th className="py-4 px-6 text-right">Execution Price</th>
                <th className="py-4 px-6 text-right">Brokerage Fee</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-right">Hash / Ref</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-sm text-[#8F96A3]">
                    No transactions recorded for this filter.
                  </td>
                </tr>
              ) : (
                filtered.map((tx) => {
                  return (
                    <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors text-xs">
                      {/* Date */}
                      <td className="py-4 px-6 font-mono-num text-[#8F96A3]">
                        {tx.date}
                      </td>

                      {/* Asset */}
                      <td className="py-4 px-6">
                        <span className="font-bold text-white block">{tx.assetName}</span>
                        <span className="text-[10px] text-[#5A6272] font-mono-num">{tx.assetTicker}</span>
                      </td>

                      {/* Type */}
                      <td className="py-4 px-6">
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[11px] font-mono ${
                            tx.type === 'BUY'
                              ? 'bg-[#C8F135]/10 text-[#C8F135]'
                              : tx.type === 'SELL'
                              ? 'bg-[#F43F5E]/10 text-[#F43F5E]'
                              : 'bg-white/10 text-white'
                          }`}
                        >
                          {tx.type}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="py-4 px-6 text-right font-mono-num">
                        <span className="font-bold text-white block">
                          {tx.amount.toLocaleString(undefined, { maximumFractionDigits: 5 })} {tx.assetTicker}
                        </span>
                        <span className="text-[10px] text-[#8F96A3]">
                          ({formatCurrency(tx.amountUsd)})
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-6 text-right font-mono-num font-medium text-white">
                        {tx.price > 1 ? formatCurrency(tx.price) : `$${tx.price.toFixed(4)}`}
                      </td>

                      {/* Fee */}
                      <td className="py-4 px-6 text-right font-mono-num text-[#8F96A3]">
                        {formatCurrency(tx.fee)}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6 text-center">
                        <span
                          className={`inline-flex items-center gap-1 font-semibold text-[11px] px-2.5 py-0.5 rounded-full ${
                            tx.status === 'Completed'
                              ? 'bg-[#10B981]/10 text-[#10B981]'
                              : tx.status === 'Pending'
                              ? 'bg-amber-400/10 text-amber-400'
                              : 'bg-red-500/10 text-red-400'
                          }`}
                        >
                          {tx.status === 'Completed' ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          <span>{tx.status}</span>
                        </span>
                      </td>

                      {/* Hash */}
                      <td className="py-4 px-6 text-right font-mono text-[#5A6272] text-[11px]">
                        {tx.txHash || 'N/A'}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
