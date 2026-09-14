import React from 'react';
import { HospitalServiceItem } from '../../types/hospital';
import { Stethoscope, CheckCircle2, XCircle } from 'lucide-react';

interface HospitalServicesProps {
  services?: HospitalServiceItem[];
}

export const HospitalServices: React.FC<HospitalServicesProps> = ({ services = [] }) => {
  if (!services || services.length === 0) {
    return (
      <div className="bg-slate-50 rounded-xl p-5 text-center text-slate-500 text-sm border border-slate-200">
        Information not available
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-4 rounded-xl border border-slate-200 bg-white hover:border-teal-300 transition-colors flex items-start gap-3.5"
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
              service.available ? 'bg-teal-50 text-teal-800' : 'bg-slate-100 text-slate-400'
            }`}>
              <Stethoscope className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-slate-900 truncate">
                  {service.name}
                </h4>
                {service.available ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    Available
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
                    <XCircle className="w-3 h-3" />
                    Unavailable
                  </span>
                )}
              </div>

              {service.department && (
                <p className="text-xs text-teal-800 font-medium">
                  {service.department}
                </p>
              )}

              {service.description && (
                <p className="text-xs text-slate-600 line-clamp-2">
                  {service.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
