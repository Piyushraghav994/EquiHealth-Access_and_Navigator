import React from 'react';
import { PersonalizedHealthcarePlan } from '../types';
import { X, Printer, HeartHandshake, CheckCircle2, QrCode, MapPin, Clock, Phone, AlertCircle } from 'lucide-react';

interface PrintablePlanModalProps {
  plan: PersonalizedHealthcarePlan;
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'hi';
}

export const PrintablePlanModal: React.FC<PrintablePlanModalProps> = ({
  plan,
  isOpen,
  onClose,
  language
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8">
        {/* Close Button & Print Action */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 pb-4 border-b border-slate-200 mb-6 print:hidden">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded">
            Physical Health Pass & Voucher
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handlePrint}
              className="min-h-[44px] px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-initial"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 cursor-pointer flex items-center justify-center"
              aria-label="Close pass modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable Pass Content */}
        <div className="space-y-6 border-2 border-slate-900 rounded-xl p-4 sm:p-6 bg-white text-slate-900">
          {/* Header of Pass */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-slate-900 pb-4 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold shrink-0">
                <HeartHandshake className="w-7 h-7 text-teal-400" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight">
                  EquiHealth Navigator
                </h2>
                <p className="text-xs text-slate-600 font-semibold">
                  Government Satellite Hospital Network — Patient Access Card
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-xs font-mono font-bold bg-slate-100 px-2.5 py-1 rounded border border-slate-300 inline-block">
                TOKEN: {plan.planId}
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">
                Issued: {plan.generatedAt}
              </span>
            </div>
          </div>

          {/* Patient Details & Facility Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Patient Name & Age</span>
              <p className="text-sm font-black text-slate-900 mt-0.5">{plan.user.fullName}</p>
              <p className="text-slate-600 font-medium">Age: {plan.user.age} yrs | Gender: {plan.user.gender}</p>
              <p className="text-slate-600">Location: {plan.user.cityOrVillage}, {plan.user.district}</p>
              <p className="text-slate-600 font-semibold mt-1">Phone: {plan.user.phone || 'N/A'}</p>
            </div>

            <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
              <span className="text-[10px] font-bold text-teal-800 uppercase block">Assigned Satellite Facility</span>
              <p className="text-sm font-black text-teal-950 mt-0.5">{plan.recommendedHospital.name}</p>
              <p className="text-teal-900 font-medium">{plan.recommendedHospital.address}</p>
              <p className="text-teal-900 mt-1 font-semibold">
                Arrival Desk: Gate 1 Offline Counter
              </p>
              <p className="text-teal-800 text-[11px]">Hours: {plan.recommendedHospital.openingHours.monSat}</p>
            </div>
          </div>

          {/* Clinical Service & Government Subsidy */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Authorized Service</span>
              <p className="font-bold text-slate-900 mt-0.5">{plan.costBreakdown.serviceName}</p>
              <span className="text-[11px] text-teal-700 font-semibold">
                Under: {plan.costBreakdown.appliedSchemeName}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Estimated Net Fee</span>
              <p className="text-xl font-black text-slate-900">
                ₹{plan.costBreakdown.netEstimatedPayable}
              </p>
              <span className="text-[10px] text-emerald-700 font-bold block">
                ₹{plan.costBreakdown.governmentBenefitSubsidized} Gov Waived
              </span>
            </div>
          </div>

          {/* Documents to bring */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-1">
              Documents to Present at Counter:
            </span>
            <ul className="text-xs text-slate-700 list-disc list-inside space-y-0.5">
              <li>Original or photocopy of Government Photo ID (Aadhaar / Voter ID)</li>
              <li>BPL Ration Card / NFSA / Jan Aadhaar for 100% subsidy waiver</li>
              <li>Present this physical paper pass or show reference #{plan.planId}</li>
            </ul>
          </div>

          {/* Emergency Safety helpline */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>Satellite Helpline: <strong>{plan.recommendedHospital.contactPhone}</strong></span>
            <span>National Emergency: <strong className="text-rose-600 font-bold">108</strong></span>
          </div>
        </div>

        <div className="mt-4 text-center print:hidden">
          <p className="text-xs text-slate-500">
            For low-literacy patients, family members or ASHA health workers can print this sheet or send an SMS summary.
          </p>
        </div>
      </div>
    </div>
  );
};
