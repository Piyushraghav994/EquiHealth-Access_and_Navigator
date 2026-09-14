import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  HelpCircle, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Phone, 
  User, 
  ArrowLeft 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { EquiHealthUserRecord } from '../types/registration';

interface LoginPageProps {
  initialEquiHealthId?: string;
  onLoginSuccess: (user: EquiHealthUserRecord) => void;
  onNavigateToRegister: () => void;
  onCancel?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  initialEquiHealthId = '',
  onLoginSuccess,
  onNavigateToRegister,
  onCancel
}) => {
  const { login } = useAuth();

  // Login form states
  const [equiHealthId, setEquiHealthId] = useState<string>(initialEquiHealthId || '');
  const [pin, setPin] = useState<string>('1234');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Forgot ID recovery states
  const [isRecovering, setIsRecovering] = useState<boolean>(false);
  const [recoveryPhone, setRecoveryPhone] = useState<string>('');
  const [recoveryResult, setRecoveryResult] = useState<{
    found: boolean;
    equiHealthId?: string;
    fullName?: string;
    message?: string;
  } | null>(null);

  // Quick fill demo credentials
  const handleQuickFillDemo = () => {
    setEquiHealthId('EQH-7K42-91M8');
    setPin('1234');
    setErrorMessage('');
  };

  // Login submit handler
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!equiHealthId.trim()) {
      setErrorMessage('Please enter your EquiHealth ID.');
      return;
    }

    if (!pin.trim()) {
      setErrorMessage('Please enter your 4-digit PIN or password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await login(equiHealthId.trim().toUpperCase(), pin.trim());
      if (result.success && result.user) {
        onLoginSuccess(result.user);
      } else {
        setErrorMessage(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage('An unexpected error occurred during login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Recover ID submit handler
  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryPhone.trim()) {
      setRecoveryResult({
        found: false,
        message: 'Please enter your registered phone number.'
      });
      return;
    }

    const result = authService.recoverEquiHealthId(recoveryPhone.trim());
    setRecoveryResult(result);
  };

  const handleUseRecoveredId = (recoveredId: string) => {
    setEquiHealthId(recoveredId);
    setPin('1234');
    setIsRecovering(false);
    setRecoveryResult(null);
    setErrorMessage('');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10 sm:py-14 animate-in fade-in-50 duration-200">
      
      {/* Top Demo Fill / Trust Indicator */}
      <div className="flex flex-col min-[380px]:flex-row items-start min-[380px]:items-center justify-between gap-2 mb-6 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 text-teal-800 shrink-0">
          <ShieldCheck className="w-4 h-4 text-teal-700" />
          <span className="font-medium">EquiHealth Secure Access</span>
        </div>
        {!isRecovering && (
          <button
            type="button"
            id="btn-demo-fill-login"
            onClick={handleQuickFillDemo}
            className="text-teal-800 hover:text-teal-900 font-medium hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Sample ID: EQH-7K42-91M8</span>
          </button>
        )}
      </div>

      {/* Main Login Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-8">
        
        {/* VIEW A: FORGOT ID RECOVERY VIEW */}
        {isRecovering ? (
          <div className="space-y-6">
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => {
                  setIsRecovering(false);
                  setRecoveryResult(null);
                }}
                className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-medium mb-2 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Login</span>
              </button>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Recover Your EquiHealth ID
              </h2>
              <p className="text-xs text-slate-600">
                Enter the mobile phone number you registered with to retrieve your unique EquiHealth ID.
              </p>
            </div>

            <form onSubmit={handleRecoverySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Registered Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    id="input-recovery-phone"
                    value={recoveryPhone}
                    onChange={(e) => {
                      setRecoveryPhone(e.target.value);
                      if (recoveryResult) setRecoveryResult(null);
                    }}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                id="btn-submit-recovery"
                className="w-full py-2.5 bg-teal-800 hover:bg-teal-900 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Find EquiHealth ID</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Recovery Results */}
            {recoveryResult && (
              <div className="pt-2 animate-in fade-in duration-150">
                {recoveryResult.found && recoveryResult.equiHealthId ? (
                  <div className="bg-teal-50/80 border border-teal-200 rounded-xl p-4 text-left space-y-3">
                    <div className="flex items-center gap-2 text-teal-800 text-xs font-semibold">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Account Record Located</span>
                    </div>
                    <div className="text-xs text-slate-600 space-y-1">
                      <div>Name: <strong className="text-slate-900">{recoveryResult.fullName}</strong></div>
                      <div>EquiHealth ID: <strong className="font-mono text-sm text-teal-900">{recoveryResult.equiHealthId}</strong></div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleUseRecoveredId(recoveryResult.equiHealthId!)}
                      className="w-full py-2 bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      Use this ID to Login
                    </button>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{recoveryResult.message || 'No account matching this phone number was found.'}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* VIEW B: STANDARD LOGIN VIEW */
          <div className="space-y-6">
            
            {/* Header */}
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-xl bg-teal-800 text-white flex items-center justify-center mx-auto shadow-xs mb-2">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Welcome Back
              </h2>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Sign in with your unique EquiHealth ID to access your healthcare access plan.
              </p>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 flex items-start gap-2 animate-in fade-in duration-150">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Field 1: EquiHealth ID */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  EquiHealth ID <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="input-login-equihealth-id"
                    value={equiHealthId}
                    onChange={(e) => {
                      setEquiHealthId(e.target.value.toUpperCase());
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="e.g. EQH-7K42-91M8"
                    maxLength={13}
                    autoCapitalize="characters"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-colors"
                  />
                </div>
                <div className="flex flex-col min-[340px]:flex-row items-start min-[340px]:items-center justify-between text-[11px] text-slate-500 mt-1 gap-1">
                  <span>Format: EQH-XXXX-XXXX</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsRecovering(true);
                      setErrorMessage('');
                    }}
                    className="text-teal-800 hover:text-teal-900 font-medium hover:underline cursor-pointer"
                  >
                    Forgot EquiHealth ID?
                  </button>
                </div>
              </div>

              {/* Field 2: PIN / Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  PIN / Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    id="input-login-pin"
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="••••"
                    maxLength={12}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-colors"
                  />
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Default prototype PIN is <span className="font-mono font-semibold text-slate-700">1234</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="btn-login-submit"
                disabled={isSubmitting}
                className="w-full min-h-[44px] py-2.5 bg-teal-800 hover:bg-teal-900 disabled:bg-teal-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Log In to Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Don't have an ID footer */}
            <div className="border-t border-slate-100 pt-4 text-center space-y-2">
              <p className="text-xs text-slate-600">
                Don't have an EquiHealth ID yet?
              </p>
              <button
                type="button"
                id="btn-register-redirect"
                onClick={onNavigateToRegister}
                className="text-xs font-semibold text-teal-800 hover:text-teal-900 hover:underline cursor-pointer"
              >
                Register a New Account
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
