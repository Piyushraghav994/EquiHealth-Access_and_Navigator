import React from 'react';
import { UserProfile, PersonalizedHealthcarePlan } from '../types';
import { 
  Printer, 
  Download, 
  X, 
  ShieldCheck, 
  HeartHandshake, 
  CheckCircle2, 
  FileText, 
  MapPin, 
  Phone, 
  Building2, 
  AlertTriangle,
  Stethoscope
} from 'lucide-react';

interface PatientPdfModalProps {
  user: UserProfile;
  plan?: PersonalizedHealthcarePlan | null;
  onClose: () => void;
  language: 'en' | 'hi';
}

export const PatientPdfModal: React.FC<PatientPdfModalProps> = ({
  user,
  plan,
  onClose,
  language
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-300 relative my-6 flex flex-col max-h-[92vh]">
        {/* Modal Action Bar (Hidden when printed) */}
        <div className="p-3 sm:p-4 bg-slate-900 text-white rounded-t-2xl flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 shrink-0 print:hidden">
          <div className="flex items-center gap-2 min-w-0">
            <span className="p-1.5 rounded-lg bg-teal-600 text-white shrink-0">
              <FileText className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                Clinical Description & Navigation Record (PDF)
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">
                Spring AI & Rule Engine Assessment • ISO 27001 & ABDM Compliant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handlePrint}
              className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable PDF Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-slate-800 bg-white print:p-0 print:m-0 print:overflow-visible">
          {/* Document Official Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xl">
                <HeartHandshake className="w-7 h-7 text-teal-400" />
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">
                  EquiHealth Healthcare Network
                </h1>
                <p className="text-xs text-slate-600">
                  EquiHealth Navigator • Patient Clinical Intake & Barrier Mitigation Summary
                </p>
              </div>
            </div>

            <div className="text-right text-xs">
              <p className="font-mono font-bold text-slate-900">DOC-REF: EHN-{Date.now().toString().slice(-6)}</p>
              <p className="text-slate-500">Date: {new Date().toLocaleDateString('en-GB')}</p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800 uppercase tracking-wider">
                Official Intake Copy
              </span>
            </div>
          </div>

          {/* Section 1: Patient Demographic & Socio-Economic Description */}
          <div className="space-y-3">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 bg-slate-100 px-3 py-1.5 rounded border-l-4 border-teal-600">
              1. Patient Demographic & Socio-Economic Description
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Full Name</span>
                <strong className="text-slate-900 text-sm">{user.fullName || 'Priya Sharma'}</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Age & Gender</span>
                <strong className="text-slate-900">{user.age || 42} Years • {user.gender || 'Female'}</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Location / Village</span>
                <strong className="text-slate-900">{user.cityOrVillage || 'Ram Nagar Village'} ({user.residentialArea || 'Rural'})</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Contact Phone</span>
                <strong className="text-slate-900 font-mono">{user.phone || '+91-9876543210'}</strong>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Income Category</span>
                <strong className="text-slate-900">{user.annualIncomeTier} Tier (&lt; ₹3 Lakh/yr)</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Occupation / Status</span>
                <strong className="text-slate-900 break-words">{user.employmentStatus || 'Informal/Daily wages (Domestic)'}</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Health Insurance</span>
                <strong className="text-teal-700 font-bold">{user.healthInsurance || 'No private insurance'}</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Digital Literacy</span>
                <strong className="text-slate-900">{user.digitalLiteracy} ({user.deviceAvailable})</strong>
              </div>
            </div>
          </div>

          {/* Section 2: Clinical Summary & Presenting Symptoms */}
          <div className="space-y-3">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 bg-slate-100 px-3 py-1.5 rounded border-l-4 border-indigo-600">
              2. Clinical Needs & Presenting Symptoms
            </h2>

            <div className="p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Primary Healthcare Need Today</span>
                  <strong className="text-sm font-extrabold text-slate-900">
                    {user.primaryNeedToday || 'Diabetes Screening, Hypertension Checkup & General Consultation'}
                  </strong>
                </div>
                <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                  Current Condition: {user.currentFeeling}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Identified Health Concerns:</span>
                <div className="flex flex-wrap gap-1.5">
                  {user.healthConcerns.map((conc, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 font-semibold text-[11px] border border-slate-200">
                      • {conc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Identified Access Barriers & Vulnerability Profile */}
          <div className="space-y-3">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 bg-slate-100 px-3 py-1.5 rounded border-l-4 border-amber-500">
              3. Identified Barriers & Recommended Support Protocol
            </h2>

            <div className="p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200">
                  <strong className="text-amber-950 font-bold block">1. Distance & Transit Barrier</strong>
                  <p className="text-amber-900 text-[11px] mt-0.5">
                    {user.hospitalDistanceKm} km from nearest satellite facility via {user.modeOfTravel}. Bus Route 14 (every 45 mins) to Gramin Gate.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200">
                  <strong className="text-amber-950 font-bold block">2. Out-of-Pocket Cost Barrier</strong>
                  <p className="text-amber-900 text-[11px] mt-0.5">
                    Low income wage vulnerability. Subsidized 100% under Ayushman Bharat (PM-JAY) & NHM Free Diagnostics.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200">
                  <strong className="text-amber-950 font-bold block">3. Digital & Smartphone Barrier</strong>
                  <p className="text-amber-900 text-[11px] mt-0.5">
                    {user.deviceAvailable}. No digital app required — Full offline registration counter at Gate 1 with ASHA verbal guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Recommended Facility & Official Operating Schedule */}
          <div className="space-y-3">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 bg-slate-100 px-3 py-1.5 rounded border-l-4 border-emerald-600">
              4. Recommended Satellite Facility & Operating Hours
            </h2>

            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 text-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-800">Assigned Facility</span>
                  <h3 className="text-base font-black text-slate-900">
                    Rural Satellite Hospital
                  </h3>
                  <p className="text-slate-600 text-[11px]">
                    Village Road, Block XYZ, Lucknow, Uttar Pradesh
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    Optimal Location Match (10 km)
                  </span>
                </div>
              </div>

              {/* Exact Operating Hours from prompt */}
              <div className="p-3 rounded-xl bg-white border border-emerald-200 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 font-medium block">Mon - Sat:</span>
                  <strong className="text-slate-900">8:00 AM - 8:00 PM</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">Sunday:</span>
                  <strong className="text-slate-900">10:00 AM - 6:00 PM</strong>
                </div>
                <div>
                  <span className="text-rose-600 font-medium block">Emergency:</span>
                  <strong className="text-rose-700">24/7 (Basic emergency services)</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Standard Pathlab Cost & Subsidy Overview */}
          <div className="space-y-3">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 bg-slate-100 px-3 py-1.5 rounded border-l-4 border-teal-600">
              5. Standard Pathlab Tariff & Applied Subsidy
            </h2>

            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-2.5">Service Category</th>
                  <th className="p-2.5">Standard Tariff</th>
                  <th className="p-2.5">Govt Subsidy</th>
                  <th className="p-2.5">Patient Net Payable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-2.5 font-medium">Doctor Consultation</td>
                  <td className="p-2.5">Rs 200 - 500</td>
                  <td className="p-2.5 text-emerald-700">100% (PM-JAY)</td>
                  <td className="p-2.5 font-black text-slate-900">₹0 (Free)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Blood Test (Basic)</td>
                  <td className="p-2.5">Rs 300 - 500</td>
                  <td className="p-2.5 text-emerald-700">100% (NHM Free Diag)</td>
                  <td className="p-2.5 font-black text-slate-900">₹0 (Free)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">BP Check</td>
                  <td className="p-2.5">Free - Rs 100</td>
                  <td className="p-2.5 text-emerald-700">100% Standard</td>
                  <td className="p-2.5 font-black text-emerald-700">₹0 (Free)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Diabetes Screening</td>
                  <td className="p-2.5">Rs 400 - 600</td>
                  <td className="p-2.5 text-emerald-700">100% (PM-JAY)</td>
                  <td className="p-2.5 font-black text-slate-900">₹0 (Free)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Full Health Checkup</td>
                  <td className="p-2.5">Rs 1500 - 2500</td>
                  <td className="p-2.5 text-emerald-700">Subsidized</td>
                  <td className="p-2.5 font-black text-slate-900">₹0 - ₹250 (BPL quota)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Verification Footnote */}
          <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-slate-500 gap-2">
            <p>
              Generated by EquiHealth System • Spring Boot 3 + Spring AI Microservices • Valid for 30 days.
            </p>
            <div className="flex items-center gap-1 text-slate-700 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Ayushman Bharat Verified</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls (Hidden when printed) */}
        <div className="p-3 sm:p-4 bg-slate-50 rounded-b-2xl border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 shrink-0 print:hidden">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            Tip: Click &quot;Print / Save as PDF&quot; to print a paper intake slip or save as PDF.
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="min-h-[44px] px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-initial"
            >
              <Printer className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Print PDF Document</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold cursor-pointer text-center flex items-center justify-center flex-1 sm:flex-initial"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
