import React from 'react';
import { HospitalTimings as HospitalTimingsType } from '../../types/hospital';
import { Clock, AlertCircle } from 'lucide-react';

interface HospitalTimingsProps {
  timings?: HospitalTimingsType;
}

const DAYS_OF_WEEK = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' }
];

export const HospitalTimings: React.FC<HospitalTimingsProps> = ({ timings }) => {
  if (!timings || Object.keys(timings).length === 0) {
    return (
      <div className="bg-slate-50 rounded-xl p-5 text-center text-slate-500 text-sm border border-slate-200">
        Information not available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Emergency Badge if 24/7 */}
      {timings.emergency && (
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <div className="text-xs sm:text-sm">
            <strong className="font-bold">Emergency & Casualty Services:</strong>{' '}
            <span>{timings.emergency}</span>
          </div>
        </div>
      )}

      {/* Weekday Schedule Table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white divide-y divide-slate-100">
        {DAYS_OF_WEEK.map(({ key, label }) => {
          const hours = timings[key];
          if (!hours) return null;

          const isSunday = key === 'sunday';
          return (
            <div
              key={key}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-4 py-2.5 text-xs sm:text-sm ${
                isSunday ? 'bg-amber-50/50' : 'hover:bg-slate-50'
              }`}
            >
              <span className="font-semibold text-slate-700">{label}</span>
              <div className="flex items-center gap-1.5 text-slate-900 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{hours}</span>
              </div>
            </div>
          );
        })}

        {/* OPD Timings note if specified */}
        {timings.opdTimings && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-4 py-2.5 text-xs sm:text-sm bg-teal-50 text-teal-900">
            <span className="font-bold">OPD Consultation Window</span>
            <span className="font-semibold">{timings.opdTimings}</span>
          </div>
        )}
      </div>
    </div>
  );
};
