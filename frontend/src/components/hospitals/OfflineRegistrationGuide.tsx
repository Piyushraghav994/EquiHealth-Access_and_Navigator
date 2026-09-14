import React from 'react';
import { HospitalRegistration } from '../../types/hospital';
import { MapPin, Clock, Coins, CheckCircle, Hourglass, FileText } from 'lucide-react';

interface OfflineRegistrationGuideProps {
  registration?: HospitalRegistration;
}

export const OfflineRegistrationGuide: React.FC<OfflineRegistrationGuideProps> = ({
  registration
}) => {
  const offline = registration?.offlineRegistration;

  if (!registration?.offline || !offline) {
    return (
      <div className="bg-slate-50 rounded-xl p-5 text-center text-slate-500 text-sm border border-slate-200">
        Offline registration details not available for this facility.
      </div>
    );
  }

  return (
    <div className="space-y-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
      
      {/* Overview Metadata Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        {/* Counter Location */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Location</span>
            <span className="text-xs sm:text-sm font-bold text-slate-900">{offline.location}</span>
          </div>
        </div>

        {/* Timings */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Timings</span>
            <span className="text-xs sm:text-sm font-bold text-slate-900">{offline.timings}</span>
          </div>
        </div>

        {/* Fee */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
            <Coins className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Registration Fee</span>
            <span className="text-xs sm:text-sm font-bold text-slate-900">{offline.fee}</span>
          </div>
        </div>

      </div>

      {/* Estimated Wait Time Banner if available */}
      {offline.estimatedWaitTime && (
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm">
          <Hourglass className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Average Registration Counter Wait Time: <strong>{offline.estimatedWaitTime}</strong></span>
        </div>
      )}

      {/* Step by step process */}
      <div className="space-y-3 pt-2">
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-teal-700" />
          <span>Step-by-Step Offline Registration Procedure:</span>
        </h4>

        <div className="space-y-2.5">
          {offline.steps.map((step, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-200/70">
              <span className="w-6 h-6 rounded-full bg-teal-800 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {index + 1}
              </span>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
