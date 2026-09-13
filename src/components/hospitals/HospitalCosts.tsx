import React from 'react';
import { HospitalCostItem } from '../../types/hospital';
import { IndianRupee, ShieldCheck } from 'lucide-react';

interface HospitalCostsProps {
  costs?: HospitalCostItem[];
}

export const HospitalCosts: React.FC<HospitalCostsProps> = ({ costs = [] }) => {
  if (!costs || costs.length === 0) {
    return (
      <div className="bg-slate-50 rounded-xl p-5 text-center text-slate-500 text-sm border border-slate-200">
        Cost information not available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs divide-y divide-slate-100">
        {costs.map((cost, index) => {
          const isFree = cost.min === 0 && cost.max === 0;
          return (
            <div
              key={index}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/80 transition-colors"
            >
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-slate-900 block">
                  {cost.service}
                </span>
                {cost.notes && (
                  <span className="text-xs text-slate-500 block">
                    {cost.notes}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900 shrink-0">
                {isFree ? (
                  <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                    Free / Zero Cost
                  </span>
                ) : (
                  <div className="flex items-center text-teal-900 bg-teal-50 px-3 py-1 rounded-lg border border-teal-200">
                    <span className="text-xs text-teal-700 mr-0.5 font-medium">₹</span>
                    <span>
                      {cost.min === cost.max ? cost.min : `${cost.min} – ₹${cost.max}`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-2.5 text-xs text-emerald-950">
        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <p>
          Eligible patients under government schemes (such as Ayushman Bharat or State Health Cards) may be entitled to 100% cashless treatment and free diagnostics upon verification.
        </p>
      </div>
    </div>
  );
};
