import React from 'react';
import { AlertTriangle, PhoneCall, ShieldAlert, X, HeartPulse, Clock, MapPin } from 'lucide-react';

interface EmergencyBannerProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'hi';
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({
  isOpen,
  onClose,
  language
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border-2 border-rose-500 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 rounded">
                {language === 'hi' ? 'आपातकालीन सुरक्षा स्तर' : 'Emergency Safety Layer'}
              </span>
              <span className="text-xs text-rose-600 font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3" /> 24/7 Active
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              {language === 'hi' 
                ? 'तत्काल चिकित्सा आपातकालीन सहायता' 
                : 'Urgent Medical Emergency Guidance'}
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              {language === 'hi'
                ? 'यदि मरीज को सीने में तेज दर्द, सांस लेने में अत्यधिक कठिनाई, बेहोशी या लकवा के लक्षण हैं, तो सामान्य ओपीडी का इंतजार न करें।'
                : 'If you or the patient is experiencing severe chest pressure, sudden breathing difficulty, loss of consciousness, or acute trauma, do not wait for standard OPD slots.'}
            </p>
          </div>
        </div>

        {/* Action Directives */}
        <div className="mt-6 space-y-3">
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-rose-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
                108
              </div>
              <div>
                <p className="text-xs font-bold text-rose-900 uppercase">
                  {language === 'hi' ? 'राष्ट्रीय एम्बुलेंस सेवा' : 'National Free Ambulance Helpline'}
                </p>
                <p className="text-sm font-semibold text-rose-700">
                  {language === 'hi' ? 'निःशुल्क सरकारी एम्बुलेंस को कॉल करें' : 'Toll-free 24/7 dispatch with GPS tracking'}
                </p>
              </div>
            </div>
            <a
              href="tel:108"
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-sm inline-flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'अभी कॉल करें' : 'Dial 108'}</span>
            </a>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-slate-800">
                {language === 'hi' ? 'निकटतम 24/7 उपग्रह आपातकालीन इकाई' : 'Nearest 24/7 Satellite Emergency Unit'}
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                SCCDSC Satellite Hospital - Rural Branch maintains round-the-clock basic emergency stabilization and oxygen support. Direct ambulance link to Central Trauma Center.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Emergency protocol automatically integrated into EquiHealth triage.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            {language === 'hi' ? 'समझ गया / बंद करें' : 'I Understand / Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
