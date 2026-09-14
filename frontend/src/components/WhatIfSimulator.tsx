import React, { useState } from 'react';
import { UserProfile, IncomeTier, TravelMode } from '../types';
import { evaluateHospitalScoring, calculateCostBreakdown } from '../utils/scoringEngine';
import { SATELLITE_HOSPITALS } from '../data/mockData';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  MapPin, 
  Clock, 
  IndianRupee, 
  Bus,
  Sparkles
} from 'lucide-react';

interface WhatIfSimulatorProps {
  initialUser: UserProfile;
  language: 'en' | 'hi';
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({
  initialUser,
  language
}) => {
  const [simUser, setSimUser] = useState<UserProfile>({ ...initialUser });

  const evaluatedHospitals = evaluateHospitalScoring(simUser);
  const topHospitalId = evaluatedHospitals[0].hospital.id;

  const handleReset = () => {
    setSimUser({ ...initialUser });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                {language === 'hi' ? 'व्हाट-इफ़ परिदृश्य सिमुलेटर' : 'What-If Scenario Simulator'}
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-200 rounded">
                Dynamic Decision Engine
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'hi'
                ? 'मापदंड बदलें और देखें कि अस्पताल की सिफारिश, दूरी और लागत कैसे बदलती है।'
                : 'Page 6 Feature: Compare alternative hospital scenarios and their impact on cost, accessibility, and travel times.'}
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Patient Baseline</span>
        </button>
      </div>

      {/* Interactive Controls Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-md space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Simulate User Parameter Adjustments
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Income Tier */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Annual Income Tier:
            </label>
            <select
              value={simUser.annualIncomeTier}
              onChange={(e) => setSimUser({ ...simUser, annualIncomeTier: e.target.value as IncomeTier })}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <option value="Low">Low (&lt; ₹3 Lakh / BPL tier)</option>
              <option value="Medium">Medium (₹3 - ₹8 Lakh)</option>
              <option value="High">High (&gt; ₹8 Lakh)</option>
            </select>
          </div>

          {/* Insurance Status */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Insurance Coverage:
            </label>
            <select
              value={simUser.healthInsurance}
              onChange={(e) => setSimUser({ ...simUser, healthInsurance: e.target.value as any })}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <option value="No insurance">No insurance</option>
              <option value="PM-JAY (Ayushman Bharat)">PM-JAY (Ayushman Bharat)</option>
              <option value="State Government Scheme">State Scheme (Chiranjeevi)</option>
              <option value="Private Insurance">Private Insurance</option>
            </select>
          </div>

          {/* Travel Mode */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Mode of Travel:
            </label>
            <select
              value={simUser.modeOfTravel}
              onChange={(e) => setSimUser({ ...simUser, modeOfTravel: e.target.value as TravelMode })}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <option value="Public transport (bus/auto)">Public transport (bus/auto)</option>
              <option value="Walking / Bicycle">Walking / Bicycle</option>
              <option value="Two-wheeler">Two-wheeler</option>
              <option value="Hired cab / Shared jeep">Hired cab / Shared jeep</option>
            </select>
          </div>

          {/* Clinical Need */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Clinical Need Severity:
            </label>
            <select
              value={simUser.primaryNeedToday}
              onChange={(e) => setSimUser({ ...simUser, primaryNeedToday: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <option value="General health checkup & Diabetes screening">General checkup & Diabetes screening</option>
              <option value="BP Monitoring & Medication Refill">BP Monitoring & Refill</option>
              <option value="Advanced Ultrasound & ECG Diagnostics">Advanced Ultrasound & ECG Diagnostics</option>
              <option value="Specialist Cardiologist / Nephrologist">Specialist Cardiologist Review</option>
            </select>
          </div>
        </div>
      </div>

      {/* Side-by-Side Hospital Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {evaluatedHospitals.map((item) => {
          const hosp = item.hospital;
          const isTopMatch = hosp.id === topHospitalId;
          const costData = calculateCostBreakdown(simUser, hosp);

          return (
            <div
              key={hosp.id}
              className={`rounded-2xl border transition-all flex flex-col justify-between ${
                isTopMatch
                  ? 'bg-white border-teal-500 ring-2 ring-teal-500/20 shadow-md'
                  : 'bg-white border-slate-200 shadow-sm opacity-90'
              }`}
            >
              {/* Card Header */}
              <div className="p-5 border-b border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    isTopMatch ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {isTopMatch ? 'Optimal Match #1' : `Scenario Option`}
                  </span>
                  <span className="text-xs font-bold text-slate-700">
                    Score: {item.totalScore}/100
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                  {hosp.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{hosp.tagline}</p>
              </div>

              {/* Card Metrics */}
              <div className="p-5 space-y-4 text-xs">
                {/* Out of pocket cost */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600 font-semibold">Net Payable Cost:</span>
                  <div className="text-right">
                    <span className="text-lg font-black text-teal-700">
                      ₹{costData.netEstimatedPayable}
                    </span>
                    <span className="text-[10px] text-slate-400 block line-through">
                      Reg ₹{costData.normalCost}
                    </span>
                  </div>
                </div>

                {/* Distance & Transit */}
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block">Distance:</span>
                    <strong className="text-slate-800">
                      {hosp.locationType === 'Rural' ? `~${simUser.hospitalDistanceKm} km` : (hosp.locationType === 'East' ? `~${simUser.hospitalDistanceKm + 12} km` : `~${simUser.hospitalDistanceKm + 26} km`)}
                    </strong>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block">Booking Desk:</span>
                    <strong className="text-slate-800">{hosp.bookingMode}</strong>
                  </div>
                </div>

                {/* Scoring factors mini breakdown */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Requirement (30%):</span>
                    <span className="font-bold text-slate-800">{item.requirementMatchScore}/100</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Distance (20%):</span>
                    <span className="font-bold text-slate-800">{item.distanceScore}/100</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Cost & Subsidy (20%):</span>
                    <span className="font-bold text-slate-800">{item.costScore}/100</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Facility Accessibility (15%):</span>
                    <span className="font-bold text-slate-800">{item.accessibilityScore}/100</span>
                  </div>
                </div>

                {/* Comparative Advantages & Drawbacks */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Scenario Verdict:</span>
                  <p className="text-[11px] text-slate-700 leading-tight">
                    {item.recommendationReason}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
                <span className="text-[11px] text-slate-500 block">
                  Hours: {hosp.openingHours.monSat}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
