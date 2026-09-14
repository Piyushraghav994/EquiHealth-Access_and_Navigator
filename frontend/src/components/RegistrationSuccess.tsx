import React, { useState } from 'react';
import { CheckCircle, Copy, Check, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import { RegistrationResponse } from '../types/registration';

interface RegistrationSuccessProps {
  response: RegistrationResponse;
  onContinueToLogin: (equiHealthId: string) => void;
}

export const RegistrationSuccess: React.FC<RegistrationSuccessProps> = ({
  response,
  onContinueToLogin
}) => {
  const [copied, setCopied] = useState(false);
  const equiHealthId = response.equiHealthId || response.userId || 'EQH-7K42-91M8';
  const fullName = response.data?.basicInformation?.fullName || 'User';

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(equiHealthId);
      } else {
        // Fallback for older browsers / iframe restrictions
        const textArea = document.createElement('textarea');
        textArea.value = equiHealthId;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.warn('Clipboard write failed:', err);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10 sm:py-14 animate-in fade-in-50 duration-200">
      {/* Top Security Indicator */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-teal-800 mb-5">
        <ShieldCheck className="w-4 h-4 text-teal-700" />
        <span className="font-medium">Account Created & Secured</span>
      </div>

      {/* Main Success Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm text-center space-y-6">
        
        {/* Celebration Header Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle className="w-10 h-10 stroke-[2.2]" />
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Registration Successful 🎉
          </h2>
          <p className="text-sm text-slate-600">
            Welcome to EquiHealth Navigator, <span className="font-semibold text-slate-900">{fullName}</span>.
          </p>
        </div>

        {/* EquiHealth ID Display Box */}
        <div className="bg-teal-50/70 border-2 border-teal-200/80 rounded-2xl p-5 sm:p-6 space-y-2 text-center">
          <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block">
            Your EquiHealth ID
          </span>
          <div className="text-2xl sm:text-3xl font-mono font-extrabold text-teal-900 tracking-widest selection:bg-teal-200 select-all py-1">
            {equiHealthId}
          </div>
          <div className="flex items-center justify-center gap-1.5 text-xs text-teal-700 pt-1">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Default 4-digit PIN: <strong className="font-mono">1234</strong></span>
          </div>
        </div>

        {/* Save ID Instruction */}
        <div className="space-y-1 text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          <p className="font-medium text-slate-700">Please save this ID.</p>
          <p>You will use this ID to access your EquiHealth account.</p>
        </div>

        {/* Small non-intrusive copy notification banner */}
        {copied && (
          <div 
            id="copy-notification-toast"
            className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2 mx-auto w-fit animate-in fade-in slide-in-from-top-1 duration-150"
          >
            <Check className="w-4 h-4 text-emerald-600" />
            <span>ID copied successfully!</span>
          </div>
        )}

        {/* Action Buttons: Copy ID & Continue to Login */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            id="btn-copy-equihealth-id"
            onClick={handleCopy}
            className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy ID</span>
              </>
            )}
          </button>

          <button
            type="button"
            id="btn-continue-to-login"
            onClick={() => onContinueToLogin(equiHealthId)}
            className="w-full sm:w-auto px-6 py-2.5 bg-teal-800 hover:bg-teal-900 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Continue to Login</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
