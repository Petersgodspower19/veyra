import React, { useState } from 'react';
import {
  ShieldCheck,
  Key,
  Smartphone,
  Lock,
  Bell,
  Check,
  Building,
  User,
  AlertCircle,
  Type,
} from 'lucide-react';
import { useToast } from '../common/Toast';
import { FontTheme } from './DashboardTopBar';

interface SettingsViewProps {
  fontTheme?: FontTheme;
  onSelectFontTheme?: (theme: FontTheme) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  fontTheme = 'outfit',
  onSelectFontTheme,
}) => {
  const { showToast } = useToast();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [withdrawalWhitelist, setWithdrawalWhitelist] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);

  const handleSave = () => {
    showToast({
      type: 'success',
      title: 'Security Policy Saved',
      message: 'Brokerage settings and hardware signature policies updated successfully.',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Account & Institutional Security
        </h2>
        <p className="text-sm text-[#8F96A3] mt-0.5">
          Configure cryptographic hardware credentials, verification status, and settlement channels.
        </p>
      </div>

      {/* Tier 2 Status Banner */}
      <div className="bg-[#0E1017] p-6 rounded-2xl border border-white/[0.07] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Tier 2 Institutional Verification</h3>
              <span className="text-[10px] bg-emerald-500/15 text-emerald-400 font-mono font-bold px-2 py-0.5 rounded-full">
                VERIFIED
              </span>
            </div>
            <p className="text-xs text-[#8F96A3] mt-1">
              $1,000,000 daily bank wire settlement limit enabled. Identity documents verified via FinCEN guidelines.
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className="text-xs font-mono text-[#8F96A3] block">Client ID: VYR-98214-US</span>
        </div>
      </div>

      {/* Security Policies */}
      <div className="bg-[#0E1017] p-6 rounded-2xl border border-white/[0.07] space-y-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Cryptographic Access Controls
        </h3>

        <div className="space-y-4 divide-y divide-white/[0.05]">
          
          {/* 2FA */}
          <div className="pt-4 first:pt-0 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#141822] text-[#C8F135]">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">
                  Hardware Multi-Factor Authentication (TOTP / YubiKey)
                </span>
                <span className="text-xs text-[#8F96A3]">
                  Requires physical security key or authenticator app approval on every login and withdrawal.
                </span>
              </div>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                twoFactorEnabled ? 'bg-[#C8F135]' : 'bg-[#1E2536]'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-[#090A0E] absolute top-0.5 transition-transform ${
                  twoFactorEnabled ? 'left-6.5 translate-x-1' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Withdrawal Whitelist */}
          <div className="pt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#141822] text-[#C8F135]">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">
                  Mandatory Address Whitelisting & 48h Time Lock
                </span>
                <span className="text-xs text-[#8F96A3]">
                  Digital asset withdrawals only permitted to pre-authorized external addresses with 48h timelock.
                </span>
              </div>
            </div>
            <button
              onClick={() => setWithdrawalWhitelist(!withdrawalWhitelist)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                withdrawalWhitelist ? 'bg-[#C8F135]' : 'bg-[#1E2536]'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-[#090A0E] absolute top-0.5 transition-transform ${
                  withdrawalWhitelist ? 'left-6.5 translate-x-1' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Email notifications */}
          <div className="pt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#141822] text-[#C8F135]">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">
                  Immediate Settlement & Fill Notifications
                </span>
                <span className="text-xs text-[#8F96A3]">
                  Real-time push confirmations for order fills, cash settlements, and security logins.
                </span>
              </div>
            </div>
            <button
              onClick={() => setEmailAlerts(!emailAlerts)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                emailAlerts ? 'bg-[#C8F135]' : 'bg-[#1E2536]'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-[#090A0E] absolute top-0.5 transition-transform ${
                  emailAlerts ? 'left-6.5 translate-x-1' : 'left-0.5'
                }`}
              />
            </button>
          </div>

        </div>

        {/* Typography & Font Styling Section */}
        {onSelectFontTheme && (
          <div className="bg-[#0E1017] p-6 rounded-2xl border border-white/[0.07] space-y-4">
            <div className="flex items-center gap-3 border-b border-white/[0.06] pb-3">
              <div className="p-2 rounded-lg bg-white/[0.04] text-[#C8F135]">
                <Type className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Typography & Interface Font Style</h3>
                <p className="text-xs text-[#8F96A3]">
                  Select the typographic styling system applied across headings, body content, and financial ledgers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'outfit',
                  title: 'Outfit & Manrope',
                  badge: 'Default / Recommended',
                  desc: 'Modern Swiss Neo-Grotesque with sharp high-contrast geometry and ultra-legible body.',
                },
                {
                  id: 'sora',
                  title: 'Sora Precision',
                  badge: 'FinTech Engineering',
                  desc: 'Geometric cryptographic aesthetics designed for high-density fintech terminals.',
                },
                {
                  id: 'mono',
                  title: 'Chivo Terminal',
                  badge: 'Institutional Monospace',
                  desc: 'Institutional tabular style evoking Bloomberg professional execution terminals.',
                },
              ].map((font) => (
                <button
                  key={font.id}
                  onClick={() => onSelectFontTheme(font.id as FontTheme)}
                  className={`p-4 rounded-xl border text-left transition-all relative ${
                    fontTheme === font.id
                      ? 'bg-[#141926] border-[#C8F135] shadow-[0_0_15px_rgba(200,241,53,0.12)]'
                      : 'bg-[#12141C] border-white/[0.06] hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{font.title}</span>
                    {fontTheme === font.id && <Check className="w-4 h-4 text-[#C8F135]" />}
                  </div>
                  <span className="text-[10px] text-[#C8F135] font-mono block mb-1.5">{font.badge}</span>
                  <p className="text-[11px] text-[#8F96A3] leading-relaxed">{font.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-[#C8F135] text-[#090A0E] text-xs font-bold hover:bg-[#d5fb46] transition-all"
          >
            Save Security & Display Preferences
          </button>
        </div>
      </div>

    </div>
  );
};
