import React from 'react';
import { HospitalAppointment as HospitalAppointmentType } from '../../types/hospital';
import { Calendar, CheckCircle2, XCircle, ArrowRight, PhoneCall, ExternalLink } from 'lucide-react';

interface HospitalAppointmentProps {
  appointment?: HospitalAppointmentType;
  hospitalName: string;
}

export const HospitalAppointment: React.FC<HospitalAppointmentProps> = ({
  appointment,
  hospitalName
}) => {
  if (!appointment) {
    return (
      <div className="bg-slate-50 rounded-xl p-5 text-center text-slate-500 text-sm border border-slate-200">
        Information not available
      </div>
    );
  }

  const { onlineAvailable, offlineAvailable, onlineProcess = [], offlineProcess = [], portalUrl, bookingHelpline } = appointment;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* ONLINE APPOINTMENT CARD */}
        <div className={`rounded-2xl border p-5 sm:p-6 space-y-4 ${
          onlineAvailable 
            ? 'border-teal-200 bg-teal-50/40' 
            : 'border-slate-200 bg-slate-50/60'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                onlineAvailable ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Online Appointment</h4>
                <p className="text-xs text-slate-500">Digital tele-booking & eSanjeevani</p>
              </div>
            </div>

            {onlineAvailable ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Available
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-200 px-2.5 py-1 rounded-full">
                <XCircle className="w-3.5 h-3.5" />
                Not Available
              </span>
            )}
          </div>

          {onlineAvailable ? (
            <div className="space-y-3 pt-2">
              {onlineProcess.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Online Booking Steps:</span>
                  <ol className="space-y-2 text-xs text-slate-700">
                    {onlineProcess.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-teal-200 text-teal-900 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <div className="pt-2">
                <a
                  href={portalUrl || 'https://ors.gov.in'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
                >
                  <span>Book Appointment</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-3 pt-1 text-xs text-slate-600">
              <p className="font-medium text-slate-700">
                Online appointment is not available.
              </p>
              <p>
                This facility operates on direct walk-in queue tokens and in-person registration counters for optimal local accessibility.
              </p>
            </div>
          )}
        </div>

        {/* OFFLINE WALK-IN APPOINTMENT CARD */}
        <div className={`rounded-2xl border p-5 sm:p-6 space-y-4 ${
          offlineAvailable 
            ? 'border-emerald-200 bg-emerald-50/40' 
            : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Walk-In / Offline OPD</h4>
                <p className="text-xs text-slate-500">In-person consultation tokens</p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
              Walk-in Supported
            </span>
          </div>

          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Walk-In Consultation Process:</span>
            {offlineProcess.length > 0 ? (
              <ol className="space-y-2 text-xs text-slate-700">
                {offlineProcess.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-xs text-slate-600">
                Walk in directly to the registration window during regular working hours.
              </p>
            )}
          </div>

          {bookingHelpline && (
            <div className="pt-2 border-t border-emerald-200/60 flex items-center gap-2 text-xs text-emerald-900 font-medium">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>Helpline: {bookingHelpline}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
