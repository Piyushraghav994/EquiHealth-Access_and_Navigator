import React from 'react';
import { HospitalAccessPlan } from '../../types/hospital';
import { Route, Check, Info } from 'lucide-react';

interface HealthcareAccessPlanProps {
  accessPlan?: HospitalAccessPlan;
}

export const HealthcareAccessPlan: React.FC<HealthcareAccessPlanProps> = ({ accessPlan }) => {
  const steps = accessPlan?.steps || [];

  if (steps.length === 0) {
    return (
      <div className="bg-slate-50 rounded-xl p-5 text-center text-slate-500 text-sm border border-slate-200">
        Personalized healthcare access plan not available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:border-teal-300 transition-colors shadow-2xs"
          >
            <div className="w-8 h-8 rounded-full bg-teal-800 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              {index + 1}
            </div>

            <div className="space-y-0.5 pt-0.5">
              <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block">
                Step {index + 1}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                {step}
              </p>
            </div>
          </div>
        ))}
      </div>

      {accessPlan?.notes && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="font-medium">
            <strong>Advisory Note:</strong> {accessPlan.notes}
          </p>
        </div>
      )}
    </div>
  );
};
