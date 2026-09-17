import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  Building2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Globe,
  Sparkles,
  Phone,
} from 'lucide-react';
import { useToast } from '../common/Toast';
import { FontTheme } from '../dashboard/DashboardTopBar';

interface SignUpPageProps {
  onSignUpSuccess: () => void;
  onNavigateLogin: () => void;
  onNavigateHome: () => void;
  fontTheme: FontTheme;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({
  onSignUpSuccess,
  onNavigateLogin,
  onNavigateHome,
}) => {
  const { showToast } = useToast();
  const [accountType, setAccountType] = useState<'individual' | 'corporate'>('individual');
  const [fullName, setFullName] = useState('Alexander Sterling');
  const [email, setEmail] = useState('alexander@sterling-wealth.com');
  const [phone, setPhone] = useState('+1 (212) 840-2900');
  const [password, setPassword] = useState('VeyraBrokerage2026!');
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) {
      showToast({
        type: 'error',
        title: 'Agreement Required',
        message: 'Please review and accept the Veyra Brokerage Agreement.',
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast({
        type: 'success',
        title: 'Institutional Account Provisioned',
        message: 'Tier 2 verification completed. $12,500 cash reserve allocated.',
      });
      onSignUpSuccess();
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#090A0E] flex flex-col justify-between selection:bg-[#C8F135]/20 selection:text-[#C8F135]">
      {/* Header */}
      <header className="px-6 py-6 border-b border-white/[0.06] flex items-center justify-between max-w-7xl mx-auto w-full">
        <div
          onClick={onNavigateHome}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#141822] border border-white/10 flex items-center justify-center group-hover:border-[#C8F135]/40 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#C8F135]">
              <path d="M4 4L12 20L20 4H15.5L12 11.5L8.5 4H4Z" fill="currentColor" />
            </svg>
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              Veyra
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8F135]" />
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#8F96A3] -mt-1 block">
              Institutional Onboarding
            </span>
          </div>
        </div>

        <button
          onClick={onNavigateHome}
          className="text-xs font-semibold text-[#8F96A3] hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/[0.04] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>
      </header>

      {/* Form Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-xl bg-[#0E1017] border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C8F135]/[0.03] blur-3xl pointer-events-none -mr-20 -mt-20 rounded-full" />

          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#161B26] border border-white/[0.08] text-[11px] text-[#C8F135] font-mono mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Tier 2 Clearance</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Create Your Account
              </h1>
              <p className="text-xs text-[#8F96A3] mt-1.5 leading-relaxed">
                Join high-net-worth investors and family offices deploying capital across institutional digital assets.
              </p>
            </div>

            {/* Account Type Selector */}
            <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#121520] rounded-2xl border border-white/[0.07]">
              <button
                type="button"
                onClick={() => setAccountType('individual')}
                className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  accountType === 'individual'
                    ? 'bg-[#181D2A] text-[#C8F135] border border-[#C8F135]/30 shadow-sm'
                    : 'text-[#8F96A3] hover:text-white'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Private Wealth (Individual)</span>
              </button>
              <button
                type="button"
                onClick={() => setAccountType('corporate')}
                className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  accountType === 'corporate'
                    ? 'bg-[#181D2A] text-[#C8F135] border border-[#C8F135]/30 shadow-sm'
                    : 'text-[#8F96A3] hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Family Office / Corporate</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white block">Full Legal Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8F96A3] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="Alexander Sterling"
                      className="w-full bg-[#121520] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-[#5A6272] focus:outline-none focus:border-[#C8F135]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white block">Direct Phone</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8F96A3] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-[#121520] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-[#5A6272] focus:outline-none focus:border-[#C8F135]"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white block">Institutional Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8F96A3] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="alexander@sterling-family.office"
                    className="w-full bg-[#121520] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-[#5A6272] focus:outline-none focus:border-[#C8F135]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white block">Master Passphrase</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8F96A3] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Minimum 12 characters"
                    className="w-full bg-[#121520] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-[#5A6272] focus:outline-none focus:border-[#C8F135]"
                  />
                </div>
              </div>

              {/* Clearance benefits card */}
              <div className="p-3.5 rounded-xl bg-[#121520] border border-white/[0.06] text-xs space-y-2">
                <div className="flex items-center gap-2 text-white font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#C8F135]" />
                  <span>Immediate Tier 2 Account Entitlements</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#8F96A3]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>$1,000,000 daily wire limit</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Dedicated MPC Vaults</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>0.50% flat institutional fee</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Real-time tax lot ledger</span>
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-0.5 rounded bg-[#121520] border-white/20 text-[#C8F135] focus:ring-0 focus:ring-offset-0"
                  />
                  <span className="text-xs text-[#8F96A3] leading-relaxed">
                    I agree to the Veyra Terms of Brokerage, Custody Agreement, and acknowledge the Digital Asset Risk Disclosure.
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-[#C8F135] text-[#090A0E] font-bold text-xs hover:bg-[#d5fb46] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(200,241,53,0.15)] active:scale-[0.99] mt-3"
              >
                <span>{isLoading ? 'Creating Depository Vaults...' : 'Create Account & Open Terminal'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-4 border-t border-white/[0.06] text-center text-xs text-[#8F96A3]">
              Already have an institutional account?{' '}
              <button
                onClick={onNavigateLogin}
                className="text-white font-bold hover:text-[#C8F135] transition-colors ml-1"
              >
                Sign In to Gateway &rarr;
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="px-6 py-4 border-t border-white/[0.06] text-center text-xs text-[#5A6272]">
        FinCEN Registered Money Services Brokerage • Digital asset custody segregated by Fireblocks MPC
      </footer>
    </div>
  );
};
