import React, { useState } from 'react';
import { PersonalizedHealthcarePlan } from '../types';
import { 
  CheckCircle, 
  MapPin, 
  IndianRupee, 
  Bus, 
  FileText, 
  Clock, 
  Phone, 
  Volume2, 
  VolumeX,
  Printer, 
  Share2, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Building2,
  Calendar,
  Check
} from 'lucide-react';

interface AssessmentResultsProps {
  plan: PersonalizedHealthcarePlan;
  onModifyProfile: () => void;
  language: 'en' | 'hi';
  onOpenPrintModal: () => void;
  onOpenEligibleServices?: () => void;
  onOpenPatientPdf?: () => void;
}

export const AssessmentResults: React.FC<AssessmentResultsProps> = ({
  plan,
  onModifyProfile,
  language,
  onOpenPrintModal,
  onOpenEligibleServices,
  onOpenPatientPdf
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [expandedHospitalId, setExpandedHospitalId] = useState<string | null>(null);

  // Toggle document checklist
  const toggleDoc = (docName: string) => {
    setCheckedDocs(prev => ({ ...prev, [docName]: !prev[docName] }));
  };

  // Web Speech API Voice Narration for low digital literacy users
  const handleVoiceNarration = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = language === 'hi'
      ? `नमस्ते ${plan.user.fullName}। आपकी स्वास्थ्य योजना तैयार है। अनुशंसित अस्पताल है ${plan.recommendedHospital.name}। कुल अनुमानित खर्च मात्र ₹${plan.costBreakdown.netEstimatedPayable} है क्योंकि ₹${plan.costBreakdown.governmentBenefitSubsidized} की सरकारी छूट मिली है। कृपया अपना आधार कार्ड और राशन कार्ड लेकर गेट नंबर 1 के ऑफलाइन काउंटर पर जाएं।`
      : `Hello ${plan.user.fullName}. Your personalized healthcare access plan is ready. Recommended hospital is ${plan.recommendedHospital.name}. Estimated net payable cost is only ${plan.costBreakdown.netEstimatedPayable} rupees, with ${plan.costBreakdown.governmentBenefitSubsidized} rupees subsidized by government schemes. Please carry your Aadhaar card and visit Gate 1 offline registration counter.`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const getScoreColor = (score: number) => {
    if (score < 40) return { bg: 'bg-rose-50', text: 'text-rose-700', ring: 'border-rose-400', label: 'High Barriers / High Vulnerability' };
    if (score < 70) return { bg: 'bg-amber-50', text: 'text-amber-700', ring: 'border-amber-400', label: 'Moderate Barriers (Targeted Assistance Needed)' };
    return { bg: 'bg-emerald-50', text: 'text-emerald-700', ring: 'border-emerald-400', label: 'Low Barriers / High Accessibility' };
  };

  const scoreBadge = getScoreColor(plan.accessibilityScore);

  return (
    <div className="space-y-6">
      {/* Top Banner: Plan ID, Voice Reader & Actions */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-black tracking-wider uppercase bg-teal-100 text-teal-800 rounded-md">
              {plan.planId}
            </span>
            <span className="text-xs text-slate-500">
              Generated: {plan.generatedAt}
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <Sparkles className="w-3 h-3" />
              Spring AI Verified
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1.5">
            {language === 'hi' ? 'व्यक्तिगत स्वास्थ्य सेवा एक्सेस योजना' : 'Personalized Healthcare Access Plan'}
          </h1>
          <p className="text-xs text-slate-600">
            {language === 'hi'
              ? `मरीज: ${plan.user.fullName} (${plan.user.age} वर्ष) | क्षेत्र: ${plan.user.cityOrVillage}, ${plan.user.district}`
              : `Prepared for ${plan.user.fullName} (${plan.user.age} yrs) | ${plan.user.cityOrVillage}, ${plan.user.district} | ${plan.user.primaryNeedToday}`}
          </p>
        </div>

        {/* Action Buttons: Voice Listen, Print, Share, Modify */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleVoiceNarration}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
              isSpeaking
                ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                : 'bg-teal-50 text-teal-800 border-teal-200 hover:bg-teal-100'
            }`}
            title="Read plan out loud for low literacy users"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSpeaking ? 'Stop Audio' : (language === 'hi' ? 'बोलकर सुनें' : 'Listen Aloud')}</span>
          </button>

          {onOpenPatientPdf && (
            <button
              onClick={onOpenPatientPdf}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 shadow-sm transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-teal-600" />
              <span>{language === 'hi' ? 'रोगी विवरण (PDF)' : 'Patient Description (PDF)'}</span>
            </button>
          )}

          <button
            onClick={onOpenPrintModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-sm transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-teal-400" />
            <span>{language === 'hi' ? 'प्रिंट / कार्ड डाउनलोड' : 'Print Health Pass'}</span>
          </button>

          <button
            onClick={onModifyProfile}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer"
          >
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Eligible Services Dropdown Directory Link Banner */}
      {onOpenEligibleServices && (
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-slate-900 rounded-2xl p-4 sm:p-5 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-teal-500/30">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-400/30">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {language === 'hi' ? 'योग्य सुविधाएं और सेवाएं बुक करें' : 'Browse All Eligible Facilities & Booking Menu'}
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-teal-500 text-slate-950 rounded uppercase">
                  Available Now
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Central, East & Rural Govt Hospitals • Full Pathlab Diagnostic Booking & Cost Structure • Jan Aushadhi Chemists
              </p>
            </div>
          </div>

          <button
            onClick={onOpenEligibleServices}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-extrabold shadow-md transition-all cursor-pointer shrink-0"
          >
            <span>Open Eligible Dropdown Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Emergency Alert (if detected) */}
      {plan.emergencyWarning?.isEmergency && (
        <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-400 text-rose-900 flex items-start gap-3.5">
          <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-rose-700">
              Emergency Safety Layer Warning
            </p>
            <p className="text-sm font-bold text-rose-950 mt-0.5">
              {plan.emergencyWarning.message}
            </p>
            <p className="text-xs text-rose-800 mt-1">
              {plan.emergencyWarning.actionRequired}
            </p>
          </div>
          <a
            href="tel:108"
            className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700 shrink-0"
          >
            Call 108
          </a>
        </div>
      )}

      {/* Grid: Accessibility Score + Financial Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Healthcare Accessibility Score Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Healthcare Accessibility Score
              </span>
              <span className="text-[10px] font-semibold text-slate-400">
                Scale 0-100
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <div className="text-4xl font-black tracking-tight text-slate-900">
                {plan.accessibilityScore}
              </div>
              <div className="text-xs font-medium text-slate-500">/ 100</div>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${scoreBadge.bg} ${scoreBadge.text} ${scoreBadge.ring}`}>
                {scoreBadge.label}
              </span>
            </div>

            {/* Score Bar */}
            <div className="w-full h-2.5 bg-slate-100 rounded-full mt-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  plan.accessibilityScore < 40
                    ? 'bg-rose-500'
                    : plan.accessibilityScore < 70
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${plan.accessibilityScore}%` }}
              />
            </div>

            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              {plan.accessibilityScore < 60
                ? 'High vulnerability index detected. System has automatically engaged targeted barrier mitigation: on-site offline registration, zero-cost government subsidies, and transit routing.'
                : 'Moderate to high access ease. Standard navigation and subsidy matching applied.'}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Detected Barriers: <strong className="text-slate-800">{plan.detectedBarriers.length}</strong></span>
            <span>Matched Schemes: <strong className="text-teal-700">{plan.matchedSchemes.length} Active</strong></span>
          </div>
        </div>

        {/* Financial Cost Breakdown Card (Page 10, 12 from PDF) */}
        <div className="lg:col-span-2 bg-gradient-to-br from-white to-teal-50/40 rounded-2xl p-5 border border-teal-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-teal-600 text-white">
                  <IndianRupee className="w-4 h-4" />
                </span>
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-900">
                  Financial Breakdown & Government Subsidy
                </h3>
              </div>
              <span className="text-[11px] font-semibold bg-teal-100 text-teal-800 px-2 py-0.5 rounded">
                Scheme: {plan.costBreakdown.appliedSchemeName}
              </span>
            </div>

            <p className="text-xs font-semibold text-slate-800 mt-2">
              Service: {plan.costBreakdown.serviceName}
            </p>

            {/* Formula display: Standard Cost (₹X) - Gov Benefit (₹Y) = Estimated Payable (₹Z) */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 uppercase font-semibold">
                  Standard Normal Cost (₹X)
                </span>
                <p className="text-xl font-bold text-slate-700 mt-1 line-through decoration-rose-500">
                  ₹{plan.costBreakdown.normalCost}
                </p>
                <span className="text-[10px] text-slate-400">Regular fee</span>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-[11px] text-emerald-800 uppercase font-semibold">
                  Gov Subsidy / Benefit (₹Y)
                </span>
                <p className="text-xl font-extrabold text-emerald-700 mt-1">
                  - ₹{plan.costBreakdown.governmentBenefitSubsidized}
                </p>
                <span className="text-[10px] text-emerald-600">Waived by AB PM-JAY / NHM</span>
              </div>

              <div className="p-3 bg-teal-700 text-white rounded-xl shadow-xs">
                <span className="text-[11px] text-teal-200 uppercase font-semibold">
                  Estimated Net Payable (₹Z)
                </span>
                <p className="text-2xl font-black tracking-tight mt-0.5">
                  ₹{plan.costBreakdown.netEstimatedPayable}
                </p>
                <span className="text-[10px] text-teal-200">Subject to hospital verification</span>
              </div>
            </div>

            <div className="mt-3 p-2.5 rounded-lg bg-white/80 border border-slate-200 text-xs text-slate-600">
              <strong className="text-slate-900">Billing Notes: </strong>
              {plan.costBreakdown.notes}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Hospital: Smart Hospital Matching & Multi-Factor Scoring (Page 6) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 rounded">
                  Top Recommended Facility
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Weighted Score: {plan.scoringBreakdown.totalScore}/100
                </span>
              </div>
              <h2 className="text-lg font-extrabold text-slate-900">
                {plan.recommendedHospital.name}
              </h2>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
              Registration: {plan.recommendedHospital.bookingMode}
            </span>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Explainable AI Reasoning */}
          <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200/80">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-teal-900 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Explainable AI Recommendation Logic
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {plan.scoringBreakdown.recommendationReason}
            </p>
          </div>

          {/* 5-Factor Scoring Weight Breakdown (Exact weights from PDF: 30%, 20%, 20%, 15%, 15%) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
              Hospital Scoring Engine Multi-Factor Breakdown (Page 6 PDF Weights)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block font-semibold">Requirement (30%)</span>
                <span className="text-base font-extrabold text-teal-700">
                  {plan.scoringBreakdown.requirementMatchScore}/100
                </span>
                <span className="text-[10px] text-slate-400 block">Clinical match</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block font-semibold">Distance (20%)</span>
                <span className="text-base font-extrabold text-teal-700">
                  {plan.scoringBreakdown.distanceScore}/100
                </span>
                <span className="text-[10px] text-slate-400 block">~{plan.user.hospitalDistanceKm} km away</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block font-semibold">Cost / Subsidy (20%)</span>
                <span className="text-base font-extrabold text-teal-700">
                  {plan.scoringBreakdown.costScore}/100
                </span>
                <span className="text-[10px] text-slate-400 block">Highest subsidy</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block font-semibold">Accessibility (15%)</span>
                <span className="text-base font-extrabold text-teal-700">
                  {plan.scoringBreakdown.accessibilityScore}/100
                </span>
                <span className="text-[10px] text-slate-400 block">Offline desk</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-500 block font-semibold">Hours / Support (15%)</span>
                <span className="text-base font-extrabold text-teal-700">
                  {plan.scoringBreakdown.operationalHoursScore}/100
                </span>
                <span className="text-[10px] text-slate-400 block">8AM-8PM + 24/7 ER</span>
              </div>
            </div>
          </div>

          {/* Hospital Address, Hours, Helpline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 block">Facility Address:</strong>
                <span className="text-slate-600">{plan.recommendedHospital.address}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 block">Operating Hours:</strong>
                <span className="text-slate-600">Mon-Sat: {plan.recommendedHospital.openingHours.monSat}</span>
                <br />
                <span className="text-slate-500">Sunday: {plan.recommendedHospital.openingHours.sunday}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 block">Toll-Free Helpline:</strong>
                <a href={`tel:${plan.recommendedHospital.contactPhone}`} className="text-teal-700 font-bold hover:underline">
                  {plan.recommendedHospital.contactPhone}
                </a>
                <br />
                <span className="text-slate-500">{plan.recommendedHospital.helplinePhone}</span>
              </div>
            </div>
          </div>

          {/* Hospital On-site Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Key Patient-Friendly Support Features
            </h4>
            <div className="flex flex-wrap gap-2">
              {plan.recommendedHospital.features.map((feat, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-50 text-teal-800 text-xs font-medium border border-teal-200">
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                  {feat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Barrier-to-Solution Intelligence Engine (Section 4 & 6 of PDF) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Barrier-to-Solution Engine (Active Mitigations)
            </h3>
            <p className="text-xs text-slate-500">
              Automated translation of identified socio-economic barriers into concrete, actionable steps.
            </p>
          </div>
          <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full">
            {plan.detectedBarriers.length} Solved
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {plan.detectedBarriers.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-teal-300 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 text-[11px] font-bold uppercase bg-amber-100 text-amber-900 rounded">
                  Barrier: {item.barrier}
                </span>
                <span className="text-[10px] font-semibold text-slate-500">
                  Severity: {item.severity}
                </span>
              </div>
              <p className="text-xs text-slate-600 italic">
                "{item.problemSummary}"
              </p>
              <div className="p-2.5 rounded-lg bg-teal-50 border border-teal-200 text-xs text-teal-950 font-medium">
                <strong className="text-teal-900">Actionable Solution: </strong>
                {item.actionableSolution}
              </div>
              {item.supportResources.length > 0 && (
                <div className="pt-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Resources:</span>
                  <ul className="text-[11px] text-slate-600 list-disc list-inside space-y-0.5">
                    {item.supportResources.map((res, rIdx) => (
                      <li key={rIdx}>{res}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Transit Guidance & Step-by-Step Directions (Page 1 from PDF: "HOW to go") */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Bus className="w-5 h-5 text-sky-600" />
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Transit & Commute Guidance (HOW to go)
            </h3>
            <p className="text-xs text-slate-500">
              Calculated travel itinerary, bus schedule, and walking instructions from {plan.user.cityOrVillage}.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-sky-50 border border-sky-200">
            <span className="text-[10px] text-sky-700 font-bold uppercase block">Recommended Transit</span>
            <span className="text-sm font-extrabold text-sky-950">{plan.transportGuidance.recommendedMode}</span>
          </div>

          <div className="p-3 rounded-xl bg-sky-50 border border-sky-200">
            <span className="text-[10px] text-sky-700 font-bold uppercase block">Estimated Transit Fare</span>
            <span className="text-sm font-extrabold text-sky-950">{plan.transportGuidance.estimatedFare}</span>
          </div>

          <div className="p-3 rounded-xl bg-sky-50 border border-sky-200">
            <span className="text-[10px] text-sky-700 font-bold uppercase block">One-Way Travel Time</span>
            <span className="text-sm font-extrabold text-sky-950">{plan.transportGuidance.transitTime}</span>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <h4 className="text-xs font-bold uppercase text-slate-700">Step-by-Step Route:</h4>
          <div className="space-y-1.5">
            {plan.transportGuidance.stepByStepRoute.map((step, sIdx) => (
              <div key={sIdx} className="flex items-start gap-3 text-xs text-slate-700 p-2 rounded-lg bg-slate-50">
                <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  {sIdx + 1}
                </span>
                <span className="leading-snug">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mandatory Documents Checklist to Carry (Page 10, 11 from PDF) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Mandatory Documents to Carry (Checklist)
              </h3>
              <p className="text-xs text-slate-500">
                Check off items before leaving home to ensure instant fee waiver at the offline desk.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {Object.values(checkedDocs).filter(Boolean).length} of {plan.requiredDocuments.length} Ready
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {plan.requiredDocuments.map((doc, dIdx) => {
            const isChecked = !!checkedDocs[doc.docName];
            return (
              <button
                key={dIdx}
                type="button"
                onClick={() => toggleDoc(doc.docName)}
                className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  isChecked
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="mt-1 accent-emerald-600 cursor-pointer shrink-0"
                />
                <div>
                  <p className="text-xs font-bold leading-tight flex items-center gap-1.5">
                    <span>{doc.docName}</span>
                    {doc.mandatory && (
                      <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded">
                        Required
                      </span>
                    )}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">{doc.purpose}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Plan: Step-by-Step Visit Instructions (Page 12 from PDF) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <CheckCircle className="w-5 h-5 text-teal-600" />
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Step-by-Step Action Plan (HOW to register)
            </h3>
            <p className="text-xs text-slate-500">
              Complete arrival workflow at the satellite hospital offline reception.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {plan.stepByStepInstructions.map((instruction, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-start gap-3">
              <span className="font-extrabold text-teal-700 shrink-0">#{idx + 1}</span>
              <p className="leading-relaxed">{instruction}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA & Print Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold">
            {language === 'hi' ? 'स्वास्थ्य पास अपने फोन पर या प्रिंट में रखें' : 'Keep this Health Pass with you'}
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Present this card or reference number at Hospital Gate 1 Offline Desk for instant fee waiver.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPrintModal}
            className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save Physical Card</span>
          </button>
        </div>
      </div>
    </div>
  );
};
