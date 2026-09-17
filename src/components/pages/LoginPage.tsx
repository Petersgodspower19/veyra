import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  Key,
  CheckCircle2,
  ArrowLeft,
  Smartphone,
  Info,
} from 'lucide-react';
import { useToast } from '../common/Toast';
import { FontTheme } from '../dashboard/DashboardTopBar';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onNavigateSignUp: () => void;
  onNavigateHome: () => void;
  fontTheme: FontTheme;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigateSignUp,
  onNavigateHome,
}) => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('investor@wealth.client');
  const [password, setPassword] = useState('VeyraSecure2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast({
        type: 'error',
        title: 'Credentials Required',
        message: 'Please enter both your institutional email and password.',
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('2fa');
      showToast({
        type: 'info',
        title: '2FA Prompt Sent',
        message: 'Enter the 6-digit TOTP security code from your authenticator app.',
      });
    }, 600);
  };

  const handle2faSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast({
        type: 'success',
        title: 'Authentication Verified',
        message: 'Welcome back, Alexander. Your institutional portfolio is now live.',
      });
      onLoginSuccess();
    }, 800);
  };

  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast({
        type: 'success',
        title: 'Demo Session Initialized',
        message: 'Logged in as Tier 2 Verified Institutional Investor.',
      });
      onLoginSuccess();
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#090A0E] flex flex-col justify-between selection:bg-[#C8F135]/20 selection:text-[#C8F135]">
      {/* Top Header */}
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
              Brokerage Gateway
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

      {/* Main Content Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md bg-[#0E1017] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8F135]/[0.03] blur-3xl pointer-events-none -mr-20 -mt-20 rounded-full" />

          {step === 'credentials' ? (
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#161B26] border border-white/[0.08] text-[11px] text-[#C8F135] font-mono mb-3">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Hardware-Encrypted Session</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Institutional Sign In
                </h1>
                <p className="text-xs text-[#8F96A3] mt-1.5 leading-relaxed">
                  Enter your verified credentials to access your Veyra investment portfolio and custody vaults.
                </p>
              </div>

              {/* Instant Demo Quick Access */}
              <div className="p-3.5 rounded-2xl bg-[#131622] border border-[#C8F135]/25 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#C8F135]/15 text-[#C8F135] flex items-center justify-center shrink-0">
                    <Key className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-white block">Fast Demo Access</span>
                    <span className="text-[11px] text-[#8F96A3] block truncate">
                      Skip typing & log in as Alexander Sterling
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  disabled={isLoading}
                  className="px-3 py-1.5 rounded-xl bg-[#C8F135] text-[#090A0E] text-xs font-bold hover:bg-[#d5fb46] transition-all shrink-0"
                >
                  {isLoading ? 'Opening...' : 'Demo Login'}
                </button>
              </div>

              {/* Credentials Form */}
              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white block">
                    Institutional Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8F96A3] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="alexander@sterling-family.office"
                      className="w-full bg-[#121520] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-[#5A6272] focus:outline-none focus:border-[#C8F135] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-white">Password</label>
                    <button
                      type="button"
                      onClick={() =>
                        showToast({
                          type: 'info',
                          title: 'Password Reset',
                          message: 'A secure cryptographic reset link was dispatched to your institutional inbox.',
                        })
                      }
                      className="text-xs text-[#8F96A3] hover:text-[#C8F135] transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#8F96A3] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••••••"
                      className="w-full bg-[#121520] border border-white/10 rounded-xl py-2.5 pl-10 pr-10 text-sm text-white placeholder-[#5A6272] focus:outline-none focus:border-[#C8F135] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[#8F96A3] hover:text-white absolute right-3.5 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember device checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberDevice}
                      onChange={(e) => setRememberDevice(e.target.checked)}
                      className="rounded bg-[#121520] border-white/20 text-[#C8F135] focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="text-xs text-[#8F96A3]">Remember this hardware node (30 days)</span>
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl bg-[#C8F135] text-[#090A0E] font-bold text-xs hover:bg-[#d5fb46] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(200,241,53,0.15)] active:scale-[0.99] mt-2"
                >
                  <span>{isLoading ? 'Verifying Keyring...' : 'Continue to Security 2FA'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Bottom switch to Sign Up */}
              <div className="pt-4 border-t border-white/[0.06] text-center text-xs text-[#8F96A3]">
                New to Veyra?{' '}
                <button
                  onClick={onNavigateSignUp}
                  className="text-white font-bold hover:text-[#C8F135] transition-colors ml-1"
                >
                  Create an Institutional Account &rarr;
                </button>
              </div>
            </div>
          ) : (
            /* 2FA Step */
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#161B26] border border-[#C8F135]/30 text-[#C8F135] flex items-center justify-center mx-auto mb-3 shadow-[0_0_24px_rgba(200,241,53,0.12)]">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  Two-Factor Authorization
                </h2>
                <p className="text-xs text-[#8F96A3] mt-1.5 max-w-xs mx-auto">
                  Enter the 6-digit TOTP code generated by your hardware key, 1Password, or Google Authenticator.
                </p>
              </div>

              <form onSubmit={handle2faSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    maxLength={6}
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="• • • • • •"
                    className="w-full bg-[#121520] border border-white/10 rounded-2xl py-3.5 text-center text-2xl font-bold tracking-[0.4em] text-white font-mono-num focus:outline-none focus:border-[#C8F135]"
                    autoFocus
                  />
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#5A6272] mt-2">
                    <Info className="w-3.5 h-3.5" />
                    <span>Demo mode: Any 6 numbers or click Authorize to enter</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('credentials')}
                    className="w-1/3 py-3 rounded-xl bg-[#141822] text-xs font-semibold text-white border border-white/10 hover:bg-[#1A1F2E] transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-2/3 py-3 rounded-xl bg-[#C8F135] text-[#090A0E] text-xs font-bold hover:bg-[#d5fb46] transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{isLoading ? 'Decrypting Vault...' : 'Authorize & Open Terminal'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-white/[0.06] text-center text-xs text-[#5A6272]">
        Protected by hardware-isolated enclave encryption • SOC 2 Type II Certified
      </footer>
    </div>
  );
};
