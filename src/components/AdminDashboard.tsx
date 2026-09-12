import React, { useState } from 'react';
import { SATELLITE_HOSPITALS, SCCDSC_SERVICES, INITIAL_ANALYTICS, GOVERNMENT_SCHEMES } from '../data/mockData';
import { 
  Building2, 
  ShieldCheck, 
  BarChart3, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Plus, 
  Search, 
  CheckCircle,
  AlertCircle,
  Activity
} from 'lucide-react';

interface AdminDashboardProps {
  language: 'en' | 'hi';
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ language }) => {
  const [adminSection, setAdminSection] = useState<'analytics' | 'facilities' | 'policies'>('analytics');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      {/* Admin Top Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-sky-100 text-sky-800 rounded">
              {language === 'hi' ? 'सेक्शन 6 और 7' : 'PDF Section 6 & 7'}
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              Hospital Administration & Access Intelligence
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">
            {language === 'hi' ? 'एडमिन डैशबोर्ड और एक्सेस एनालिटिक्स' : 'Admin Operations & Healthcare Access Analytics'}
          </h2>
          <p className="text-xs text-slate-500">
            Real-time monitoring of barrier prevalence, hospital bed & clinic capacity, and subsidy disbursements.
          </p>
        </div>

        {/* Section Switcher Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setAdminSection('analytics')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              adminSection === 'analytics'
                ? 'bg-white text-sky-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Access Analytics
          </button>
          <button
            onClick={() => setAdminSection('facilities')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              adminSection === 'facilities'
                ? 'bg-white text-sky-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Facility & Services
          </button>
          <button
            onClick={() => setAdminSection('policies')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              adminSection === 'policies'
                ? 'bg-white text-sky-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Policies & Rules
          </button>
        </div>
      </div>

      {/* SECTION 7: HEALTHCARE ACCESS ANALYTICS */}
      {adminSection === 'analytics' && (
        <div className="space-y-6">
          {/* Key KPI Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Total Patients Navigated</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold text-slate-900">2,577</span>
                <span className="text-xs font-bold text-emerald-600">+14% this month</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Across Rural, East & Central</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Average Accessibility Score</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold text-teal-700">{INITIAL_ANALYTICS.averageAccessibilityScore}</span>
                <span className="text-xs text-slate-500">/ 100</span>
              </div>
              <span className="text-[10px] text-teal-600 mt-1 block">Barrier intervention required</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Subsidy Utilization Rate</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold text-emerald-600">{INITIAL_ANALYTICS.subsidyUtilizationRate}%</span>
                <span className="text-xs font-bold text-emerald-700">₹4.2 Lakh saved</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Via PM-JAY & NHM Waivers</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Offline Desk Consultations</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold text-indigo-700">68.2%</span>
                <span className="text-xs text-slate-500">of total visits</span>
              </div>
              <span className="text-[10px] text-indigo-600 mt-1 block">Zero smartphone barrier</span>
            </div>
          </div>

          {/* Charts Grid: Most Common Barriers & Service Demand by Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Barrier Prevalence Chart */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    Most Common Healthcare Access Barriers
                  </h3>
                  <p className="text-xs text-slate-500">Identified via patient intake intake assessments</p>
                </div>
                <span className="text-[10px] font-bold uppercase bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                  N=2,577
                </span>
              </div>

              <div className="space-y-3 pt-1">
                {INITIAL_ANALYTICS.mostCommonBarriers.map((bar, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>{bar.barrier}</span>
                      <span className="text-slate-900">{bar.percentage}% ({bar.count} patients)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-teal-500 to-sky-600"
                        style={{ width: `${bar.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-600 border border-slate-200">
                <strong>Insight from Analytics Engine: </strong>
                Transportation and direct out-of-pocket costs remain the top two impediments to early clinical care. The Rural Satellite Hospital eliminates ~80% of transit impedance.
              </div>
            </div>

            {/* Service Demand by Geographical Area */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Service Demand by Area Cluster
                </h3>
                <p className="text-xs text-slate-500">Identifies areas with severe healthcare accessibility deficit</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-[10px] font-bold uppercase text-slate-400">
                      <th className="pb-2">Area / Village</th>
                      <th className="pb-2">General Care</th>
                      <th className="pb-2">Diabetes</th>
                      <th className="pb-2">Diagnostics</th>
                      <th className="pb-2">BP Check</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {INITIAL_ANALYTICS.serviceDemandByArea.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50/80">
                        <td className="py-2.5 font-bold text-slate-800">{row.area}</td>
                        <td className="py-2.5 text-slate-600">{row.generalCare}</td>
                        <td className="py-2.5 text-teal-700 font-semibold">{row.diabetes}</td>
                        <td className="py-2.5 text-slate-600">{row.diagnostics}</td>
                        <td className="py-2.5 text-slate-600">{row.bpCheck}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Hospital Utilization Capacity */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">Facility Load & Capacity:</span>
                {INITIAL_ANALYTICS.hospitalUtilization.map((hosp, hIdx) => (
                  <div key={hIdx} className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 font-medium">{hosp.hospital}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${hosp.capacityPercent > 85 ? 'bg-amber-500' : 'bg-teal-500'}`}
                          style={{ width: `${hosp.capacityPercent}%` }}
                        />
                      </div>
                      <span className="font-bold text-slate-800 w-10 text-right">{hosp.capacityPercent}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: FACILITY & SERVICES MANAGEMENT */}
      {adminSection === 'facilities' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {SATELLITE_HOSPITALS.map((hosp) => (
              <div key={hosp.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                    {hosp.locationType} Branch
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    {hosp.bookingMode}
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900">{hosp.name}</h3>
                <p className="text-xs text-slate-500">{hosp.address}</p>

                <div className="pt-2 border-t border-slate-100 text-xs space-y-1 text-slate-600">
                  <p><strong>Hours: </strong>{hosp.openingHours.monSat}</p>
                  <p><strong>Helpline: </strong>{hosp.contactPhone}</p>
                  <p><strong>Transit: </strong>{hosp.busRoutesAvailable[0]}</p>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Available Services:</span>
                  <div className="flex flex-wrap gap-1">
                    {hosp.serviceIds.map(sid => {
                      const srv = SCCDSC_SERVICES.find(s => s.id === sid);
                      return (
                        <span key={sid} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {srv ? srv.name.split(' ')[0] : sid}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Service Price Catalog */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Standard Hospital Service Catalog & Price Caps
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SCCDSC_SERVICES.map(srv => (
                <div key={srv.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{srv.name}</span>
                    <span className="font-extrabold text-teal-700">
                      ₹{srv.normalCostMin} - ₹{srv.normalCostMax}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">{srv.description}</p>
                  <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Category: {srv.category}</span>
                    <span>Offline Desk: Yes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: POLICIES & RULES MANAGEMENT */}
      {adminSection === 'policies' && (
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Government Scheme Rules & Vector Index Status
              </h3>
              <p className="text-xs text-slate-500">
                When official government health policies update, Spring AI RAG refreshes without redeploying code.
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Vector Index: Healthy (4 / 4 Synced)
            </span>
          </div>

          <div className="space-y-3">
            {GOVERNMENT_SCHEMES.map(scheme => (
              <div key={scheme.id} className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{scheme.name}</span>
                    <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 bg-teal-50 text-teal-800 rounded">
                      {scheme.shortCode}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-2xl">{scheme.overview}</p>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0 gap-1">
                  <span className="text-emerald-700 font-bold">{scheme.coverageEstimatePercent}% Subsidy</span>
                  <span className="text-[10px] text-slate-400">RAG Chunks: 12</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
