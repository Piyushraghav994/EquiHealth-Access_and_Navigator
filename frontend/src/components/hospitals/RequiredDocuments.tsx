import React from 'react';
import { HospitalDocument } from '../../types/hospital';
import { FileCheck, AlertCircle, Info } from 'lucide-react';

interface RequiredDocumentsProps {
  documents?: HospitalDocument[];
}

export const RequiredDocuments: React.FC<RequiredDocumentsProps> = ({ documents = [] }) => {
  if (!documents || documents.length === 0) {
    return (
      <div className="bg-slate-50 rounded-xl p-5 text-center text-slate-500 text-sm border border-slate-200">
        Information not available
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {documents.map((doc, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
              doc.required
                ? 'border-slate-200 bg-white shadow-2xs'
                : 'border-slate-200/80 bg-slate-50/60'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
              doc.required ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'
            }`}>
              <FileCheck className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {doc.name}
                </h4>
                {doc.required ? (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-red-100 text-red-800 shrink-0">
                    Mandatory
                  </span>
                ) : (
                  <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 shrink-0">
                    Optional
                  </span>
                )}
              </div>

              <p className="text-xs text-teal-800 font-medium">
                Needed for: {doc.requiredFor}
              </p>

              {doc.description && (
                <p className="text-[11px] text-slate-500 leading-snug">
                  {doc.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-slate-500 italic flex items-center gap-1.5 pt-1">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>Keep original documents along with one photocopy for smooth verification at registration counters.</span>
      </p>
    </div>
  );
};
