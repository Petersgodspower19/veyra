import React, { useState } from 'react';
import { X, Lock, ShieldCheck, Mail, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';
import { useToast } from '../common/Toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onAuthenticated: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onAuthenticated,
}) => {
  const { showToast } = useToast();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('investor@wealth.client');
  const [password, setPassword] = useState('••••••••••••');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmitCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('2fa');
    }, 600);
  };

  const handleVerify2fa = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast({
        type: 'success',
        title: 'Authentication Successful',
        message: 'Welcome to Veyra Private Wealth. Secure session initialized.',
      });
      onAuthenticated();
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0E1017] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between bg-[#121520]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#141822] border border-white/10 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#C8F135]">
                <path d="M4 4L12 20L20 4H15.5L12 11.5L8.5 4H4Z" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {step === 'credentials'
                  ? mode === 'login'
                    ? 'Sign In to Veyra'
                    : 'Create Your Veyra Account'
                  : 'Multi-Factor Authorization'}
              </h3>
              <p className="text-xs text-[#8F96A3] font-mono">
                {step === 'credentials' ? 'Hardware-Secured Institutional Gateway' : 'TOTP Authenticator Verification'}
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
        <div className="p-6">
          {step === 'credentials' ? (
            <form onSubmit={handleSubmitCredentials} className="space-y-5">
              {/* Tab Switcher */}
              <div className="grid grid-cols-2 p-1 bg-[#131620] rounded-xl border border-white/[0.07]">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    mode === 'login' ? 'bg-[#C8F135] text-[#090A0E] shadow-sm' : 'text-[#8F96A3] hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    mode === 'signup' ? 'bg-[#C8F135] text-[#090A0E] shadow-sm' : 'text-[#8F96A3] hover:text-white'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white block">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8F96A3] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@institution.com"
                    className="w-full bg-[#141824] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-[#5A6272] focus:outline-none focus:border-[#C8F135]"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-white">Password</label>
                  {mode === 'login' && (
                    <span className="text-[#8F96A3] hover:text-white cursor-pointer">Forgot?</span>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8F96A3] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter password"
                    className="w-full bg-[#141824] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-[#5A6272] focus:outline-none focus:border-[#C8F135]"
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div className="p-3 bg-[#121520] rounded-xl border border-white/[0.06] text-xs text-[#8F96A3] space-y-1">
                  <div className="flex items-center gap-1.5 text-white font-semibold">
                    <UserCheck className="w-3.5 h-3.5 text-[#C8F135]" />
                    <span>Instant Tier 2 Verification</span>
                  </div>
                  <p>Includes $250k daily limit upon electronic identity clearance.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-[#C8F135] text-[#090A0E] font-bold text-xs hover:bg-[#d5fb46] transition-all flex items-center justify-center gap-2"
              >
                <span>{isLoading ? 'Verifying...' : 'Continue to Security Check'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify2fa} className="space-y-5 animate-in fade-in duration-150">
              <div className="text-center py-2">
                <ShieldCheck className="w-10 h-10 text-[#C8F135] mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white">Two-Factor Authentication</h4>
                <p className="text-xs text-[#8F96A3] mt-1">
                  Enter the 6-digit verification code from your authenticator app (e.g. YubiKey or 1Password).
                </p>
              </div>

              <div>
                <input
                  type="text"
                  maxLength={6}
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • • • •"
                  className="w-full bg-[#141824] border border-white/10 rounded-xl py-3 text-center text-2xl font-bold tracking-[0.5em] text-white font-mono-num focus:outline-none focus:border-[#C8F135]"
                  autoFocus
                />
                <span className="text-[11px] text-[#5A6272] block text-center mt-2">
                  (Demo: Press Enter or click Authorize to enter dashboard)
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('credentials')}
                  className="w-1/3 py-2.5 rounded-xl bg-[#141822] text-xs font-semibold text-white border border-white/10 hover:bg-[#1A1F2E]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-2/3 py-2.5 rounded-xl bg-[#C8F135] text-[#090A0E] text-xs font-bold hover:bg-[#d5fb46] transition-all"
                >
                  {isLoading ? 'Decrypting Vault...' : 'Authorize & Enter'}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
