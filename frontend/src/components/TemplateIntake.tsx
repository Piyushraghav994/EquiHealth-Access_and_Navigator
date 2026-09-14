import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  HeartPulse, 
  Wallet, 
  Navigation, 
  CheckCircle2,
  FileText
} from 'lucide-react';

interface TemplateIntakeProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  onSubmit: () => void;
  isEvaluating?: boolean;
}

export const TemplateIntake: React.FC<TemplateIntakeProps> = ({
  user,
  setUser,
  onSubmit,
  isEvaluating = false
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const steps = [
    { number: 1, title: 'Personal Details', subtitle: 'Basic information' },
    { number: 2, title: 'Healthcare Needs', subtitle: 'What do you need?' },
    { number: 3, title: 'Socio-Economic Details', subtitle: 'Help us understand you' },
    { number: 4, title: 'Barriers & Preferences', subtitle: 'Make it easier for you' },
    { number: 5, title: 'Review & Submit', subtitle: "You're almost there!" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Stepper matching Template.png Screen 2 & 3 */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">Intake Process</h3>
            <p className="text-xs text-slate-500">Complete 5 quick steps to find eligible care</p>
          </div>

          <div className="space-y-4">
            {steps.map((step) => {
              const isCompleted = currentStep > step.number;
              const isActive = currentStep === step.number;

              return (
                <div
                  key={step.number}
                  onClick={() => {
                    // Allow navigating to visited or previous steps
                    if (step.number < currentStep) {
                      setCurrentStep(step.number);
                    }
                  }}
                  className={`flex items-start gap-3 p-2 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-teal-50/70'
                      : step.number < currentStep
                      ? 'cursor-pointer hover:bg-slate-50'
                      : 'opacity-60'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                      isActive
                        ? 'bg-teal-800 text-white shadow-xs'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4 stroke-[2.5]" /> : step.number}
                  </div>

                  <div className="space-y-0.5">
                    <h4 className={`text-sm font-semibold leading-tight ${
                      isActive ? 'text-teal-900 font-bold' : 'text-slate-800'
                    }`}>
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-tight">
                      {step.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Form Container matching Template.png */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          
          {/* STEP 1: PERSONAL DETAILS */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Personal Details</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Let's start with some basic information</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={user.fullName}
                    onChange={(e) => setUser(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-sm font-medium text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Age *
                    </label>
                    <input
                      type="number"
                      value={user.age || ''}
                      onChange={(e) => setUser(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                      placeholder="e.g. 32"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-sm font-medium text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Gender *
                    </label>
                    <select
                      value={user.gender}
                      onChange={(e) => setUser(prev => ({ ...prev, gender: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-sm font-medium text-slate-900 bg-white"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Location *
                    </label>
                    <select
                      value={user.residentialArea}
                      onChange={(e) => setUser(prev => ({ ...prev, residentialArea: e.target.value as any }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-sm font-medium text-slate-900 bg-white"
                    >
                      <option value="Rural">Rural Area</option>
                      <option value="Semi-urban">Semi-urban Area</option>
                      <option value="Urban">Urban Area</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      State *
                    </label>
                    <select
                      value={user.state}
                      onChange={(e) => setUser(prev => ({ ...prev, state: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-sm font-medium text-slate-900 bg-white"
                    >
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Delhi NCT">Delhi NCT</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      District *
                    </label>
                    <input
                      type="text"
                      value={user.district}
                      onChange={(e) => setUser(prev => ({ ...prev, district: e.target.value }))}
                      placeholder="e.g. Lucknow"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-sm font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Language *
                  </label>
                  <select
                    value={user.preferredLanguage}
                    onChange={(e) => setUser(prev => ({ ...prev, preferredLanguage: e.target.value as any }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-sm font-medium text-slate-900 bg-white"
                  >
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="Rajasthani">Rajasthani</option>
                    <option value="Urdu">Urdu</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-teal-800 hover:bg-teal-900 text-white text-sm font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: HEALTHCARE NEEDS */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Healthcare Needs</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Tell us about your medical requirement</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Primary Health Concern *
                  </label>
                  <select
                    value={user.healthConcerns[0] || 'Diabetes'}
                    onChange={(e) => setUser(prev => ({ ...prev, healthConcerns: [e.target.value] }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-sm font-medium text-slate-900 bg-white"
                  >
                    <option value="Diabetes">Diabetes</option>
                    <option value="Hypertension (High Blood Pressure)">Hypertension (High Blood Pressure)</option>
                    <option value="Maternal & Pregnancy Care">Maternal & Pregnancy Care</option>
                    <option value="Child Health & Immunization">Child Health & Immunization</option>
                    <option value="General Checkup / Fever">General Checkup / Fever</option>
                    <option value="Joint Pain / Arthritis">Joint Pain / Arthritis</option>
                    <option value="Eye Examination">Eye Examination</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Type of Service Needed *
                  </label>
                  <select
                    value={user.primaryNeedToday}
                    onChange={(e) => setUser(prev => ({ ...prev, primaryNeedToday: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-sm font-medium text-slate-900 bg-white"
                  >
                    <option value="General Checkup">General Checkup</option>
                    <option value="Blood Test / Laboratory Screening">Blood Test / Laboratory Screening</option>
                    <option value="Doctor Consultation">Doctor Consultation</option>
                    <option value="Blood Pressure Checkup">Blood Pressure Checkup</option>
                    <option value="Medicine Refill">Medicine Refill</option>
                    <option value="Full Health Checkup">Full Health Checkup</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Any existing medical condition?
                  </label>
                  <textarea
                    rows={3}
                    value={user.additionalInfo || 'Not diagnosed yet, just a routine checkup.'}
                    onChange={(e) => setUser(prev => ({ ...prev, additionalInfo: e.target.value }))}
                    placeholder="Describe any existing conditions or symptoms..."
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-sm font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-teal-800 hover:bg-teal-900 text-white text-sm font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SOCIO-ECONOMIC DETAILS */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Socio-Economic Details</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Help us understand you for government scheme eligibility</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Annual Income Tier *
                  </label>
                  <select
                    value={user.annualIncomeTier}
                    onChange={(e) => setUser(prev => ({ ...prev, annualIncomeTier: e.target.value as any }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-sm font-medium text-slate-900 bg-white"
                  >
                    <option value="Low">Low (&lt; ₹1.5 Lakhs/year - BPL/Antyodaya Eligible)</option>
                    <option value="Medium">Medium (₹1.5 - ₹5 Lakhs/year)</option>
                    <option value="High">High (&gt; ₹5 Lakhs/year)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Existing Health Insurance
                  </label>
                  <select
                    value={user.healthInsurance}
                    onChange={(e) => setUser(prev => ({ ...prev, healthInsurance: e.target.value as any }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-sm font-medium text-slate-900 bg-white"
                  >
                    <option value="PM-JAY (Ayushman Bharat)">PM-JAY (Ayushman Bharat)</option>
                    <option value="No insurance">No private insurance / Seeking Gov Scheme</option>
                    <option value="State Government Scheme">State Government Scheme</option>
                    <option value="Private Insurance">Private Insurance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Employment Status
                  </label>
                  <select
                    value={user.employmentStatus}
                    onChange={(e) => setUser(prev => ({ ...prev, employmentStatus: e.target.value as any }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-sm font-medium text-slate-900 bg-white"
                  >
                    <option value="Informal/Daily wages">Informal / Daily wage worker</option>
                    <option value="Self-employed">Self-employed / Farmer / Artisan</option>
                    <option value="Homemaker">Homemaker</option>
                    <option value="Salaried">Salaried Employee</option>
                    <option value="Unemployed">Unemployed</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-teal-800 hover:bg-teal-900 text-white text-sm font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: BARRIERS & PREFERENCES */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Barriers & Preferences</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Make it easier for you to access care</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Distance to Hospital (km)
                    </label>
                    <input
                      type="number"
                      value={user.hospitalDistanceKm || 10}
                      onChange={(e) => setUser(prev => ({ ...prev, hospitalDistanceKm: parseInt(e.target.value) || 0 }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-sm font-medium text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Preferred Travel Mode
                    </label>
                    <select
                      value={user.modeOfTravel}
                      onChange={(e) => setUser(prev => ({ ...prev, modeOfTravel: e.target.value as any }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-sm font-medium text-slate-900 bg-white"
                    >
                      <option value="Public transport (bus/auto)">Public transport (Bus / Auto)</option>
                      <option value="Hired cab / Shared jeep">Shared Auto / Jeep</option>
                      <option value="Two-wheeler">Two-wheeler (Motorcycle/Scooter)</option>
                      <option value="Walking / Bicycle">Walking / Bicycle</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Identified Challenges & Barriers
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {[
                      { id: 'Cost', label: 'Out-of-pocket treatment costs' },
                      { id: 'Transportation', label: 'Long travel distance / bus availability' },
                      { id: 'Digital access', label: 'No smartphone / low digital literacy' },
                      { id: 'Childcare', label: 'Need to bring young children along' },
                      { id: 'Language', label: 'Prefer regional language / verbal guidance' }
                    ].map(barrier => {
                      const isChecked = user.identifiedBarriers.includes(barrier.id as any);
                      return (
                        <label
                          key={barrier.id}
                          className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-colors ${
                            isChecked
                              ? 'bg-teal-50 border-teal-300 text-teal-900 font-semibold'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setUser(prev => ({ ...prev, identifiedBarriers: [...prev.identifiedBarriers, barrier.id as any] }));
                              } else {
                                setUser(prev => ({ ...prev, identifiedBarriers: prev.identifiedBarriers.filter(b => b !== barrier.id) }));
                              }
                            }}
                            className="rounded text-teal-800 focus:ring-teal-700 h-4 w-4"
                          />
                          <span>{barrier.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-teal-800 hover:bg-teal-900 text-white text-sm font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW & SUBMIT */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Review & Submit</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">You're almost there! Review your intake profile</p>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Name</span>
                    <strong className="text-slate-900 text-sm">{user.fullName || 'Priya Sharma'}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Age & Gender</span>
                    <strong className="text-slate-900">{user.age || 32} Y • {user.gender || 'Female'}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Location</span>
                    <strong className="text-slate-900">{user.district}, {user.state} ({user.residentialArea})</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Language</span>
                    <strong className="text-slate-900">{user.preferredLanguage}</strong>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Health Need</span>
                    <strong className="text-teal-800 font-semibold">{user.primaryNeedToday} ({user.healthConcerns[0] || 'General'})</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Income & Insurance</span>
                    <strong className="text-slate-900">{user.annualIncomeTier} Income • {user.healthInsurance}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Travel & Distance</span>
                    <strong className="text-slate-900">{user.hospitalDistanceKm} km via {user.modeOfTravel}</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={isEvaluating}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-teal-800 hover:bg-teal-900 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  {isEvaluating ? (
                    <span>Evaluating Profile...</span>
                  ) : (
                    <>
                      <span>Submit & View Healthcare Plan</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
