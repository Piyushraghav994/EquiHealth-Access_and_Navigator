import React, { useState, useEffect } from 'react';
import { UserProfile, PersonalizedHealthcarePlan } from '../types';
import { DashboardSidebarTab } from './TemplateNavbar';
import { Hospital } from '../types/hospital';
import { hospitalService } from '../services/hospitalService';
import { HospitalCard } from './hospitals/HospitalCard';
import { HospitalDetails } from './hospitals/HospitalDetails';
import { HospitalLocation } from './hospitals/HospitalLocation';
import { HospitalsPage } from '../pages/HospitalsPage';
import { HospitalDetailsPage } from '../pages/HospitalDetailsPage';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Building2, 
  Award, 
  FileText, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  Bus, 
  Clock, 
  FileCheck, 
  Phone, 
  Mail, 
  MessageSquare, 
  Download, 
  Navigation, 
  ExternalLink,
  Info,
  Check
} from 'lucide-react';

interface TemplateDashboardProps {
  user: UserProfile;
  plan?: PersonalizedHealthcarePlan | null;
  activeTab: DashboardSidebarTab;
  setActiveTab: (tab: DashboardSidebarTab) => void;
  onOpenPdfModal: () => void;
  onModifyIntake: () => void;
}

export const TemplateDashboard: React.FC<TemplateDashboardProps> = ({
  user,
  plan,
  activeTab,
  setActiveTab,
  onOpenPdfModal,
  onModifyIntake
}) => {
  const [selectedSchemeDetail, setSelectedSchemeDetail] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [recommendedHospital, setRecommendedHospital] = useState<Hospital | null>(null);
  const [selectedHospitalDetailId, setSelectedHospitalDetailId] = useState<string | null>(null);
  const [openMapInDetails, setOpenMapInDetails] = useState<boolean>(false);
  const [hospitalSubView, setHospitalSubView] = useState<'recommended' | 'directory'>('recommended');
  const [allHospitalsCount, setAllHospitalsCount] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    hospitalService.getRecommendedHospitals(user).then(list => {
      if (isMounted && list.length > 0) {
        setRecommendedHospital(list[0]);
      }
    });
    hospitalService.getHospitals().then(all => {
      if (isMounted) {
        setAllHospitalsCount(all.length);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my-plan', label: 'My Plan', icon: ClipboardList },
    { id: 'nearby-hospitals', label: 'Nearby Hospitals', icon: Building2 },
    { id: 'schemes', label: 'Schemes', icon: Award },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Optional Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 animate-fade-in border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Menu matching Screen 4 of Template.png */}
        <aside className="lg:col-span-3 bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          <div className="p-2 border-b border-slate-100 flex flex-col sm:flex-row lg:flex-col justify-between sm:items-center lg:items-start gap-1">
            <div className="min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Navigation</span>
              <strong className="text-xs font-bold text-slate-800 truncate block">
                Patient: {user.fullName || 'Priya Sharma'}
              </strong>
            </div>
            {user.equiHealthId && (
              <span className="text-[11px] font-mono text-teal-800 font-semibold block shrink-0">
                ID: {user.equiHealthId}
              </span>
            )}
          </div>

          <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-1.5 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id as DashboardSidebarTab);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full flex items-center gap-2 sm:gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                    isActive
                      ? 'bg-teal-50 text-teal-900 border border-teal-200/80 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-teal-800' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onModifyIntake}
              className="w-full text-center py-2 text-xs font-medium text-teal-800 hover:text-teal-900 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
            >
              Edit Intake Details
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="lg:col-span-9 space-y-6">

          {/* VIEW 1: DASHBOARD / SCHEME ELIGIBILITY RESULT (Screen 4 of Template.png) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Scheme Eligibility Result
                </h1>
                <button
                  type="button"
                  onClick={onOpenPdfModal}
                  className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-teal-800 bg-white hover:bg-teal-50 rounded-lg border border-teal-300 shadow-xs transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-teal-600" />
                  <span>Download Plan (PDF)</span>
                </button>
              </div>

              {/* Green Success Eligibility Banner */}
              <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-6 sm:p-7 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      You may be eligible!
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Based on the information provided, you may be eligible for the following government healthcare scheme(s).
                    </p>
                  </div>
                </div>

                {/* Primary Scheme Card: Ayushman Bharat - PMJAY */}
                <div className="bg-white rounded-xl p-5 border border-emerald-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-800 font-black text-sm shrink-0">
                      <Award className="w-6 h-6 text-teal-700" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900">
                          Ayushman Bharat – PMJAY
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Provides free treatment for eligible families at empanelled hospitals.
                      </p>
                      <button
                        onClick={() => setSelectedSchemeDetail('pmjay')}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-teal-800 hover:text-teal-900 mt-2 cursor-pointer"
                      >
                        <span>View Scheme Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="self-start sm:self-center">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100/90 text-emerald-800 border border-emerald-200">
                      Potentially Eligible
                    </span>
                  </div>
                </div>
              </div>

              {/* Other Possible Schemes */}
              <div className="space-y-4 pt-2">
                <h2 className="text-base font-bold text-slate-900">
                  Other Possible Schemes
                </h2>

                <div className="space-y-3">
                  {/* Scheme 1: State Health Assurance Scheme */}
                  <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          State Health Assurance Scheme
                        </h3>
                        <button
                          onClick={() => setSelectedSchemeDetail('state')}
                          className="inline-flex items-center gap-1 text-xs font-medium text-teal-800 hover:text-teal-900 mt-0.5 cursor-pointer"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => showToast('Checked! Eligible under Uttar Pradesh BPL health quota.')}
                      className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer self-start sm:self-center"
                    >
                      Check Eligibility
                    </button>
                  </div>

                  {/* Scheme 2: National Programme for Prevention and Control of Diabetes */}
                  <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          National Programme for Prevention and Control of Diabetes
                        </h3>
                        <button
                          onClick={() => setSelectedSchemeDetail('npcdcs')}
                          className="inline-flex items-center gap-1 text-xs font-medium text-teal-800 hover:text-teal-900 mt-0.5 cursor-pointer"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => showToast(`Free blood glucose screening active at ${recommendedHospital?.name || 'partner health center'}.`)}
                      className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer self-start sm:self-center"
                    >
                      Check Eligibility
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Navigation Cards below */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div 
                  onClick={() => setActiveTab('my-plan')}
                  className="p-5 rounded-xl bg-white border border-slate-200 hover:border-teal-300 hover:shadow-xs transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center">
                      <ClipboardList className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Personalized Healthcare Plan</h4>
                      <p className="text-xs text-slate-500">5-step guidance to receive treatment</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-800 group-hover:translate-x-1 transition-all" />
                </div>

                <div 
                  onClick={() => setActiveTab('nearby-hospitals')}
                  className="p-5 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-xs transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Recommended Hospital</h4>
                      <p className="text-xs text-slate-500">
                        {recommendedHospital 
                          ? `${recommendedHospital.name} (${recommendedHospital.distance.value} ${recommendedHospital.distance.unit} away)`
                          : 'Verified Healthcare Facilities'}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-800 group-hover:translate-x-1 transition-all" />
                </div>
              </div>

            </div>
          )}

          {/* VIEW 2: MY PLAN / YOUR PERSONALIZED HEALTHCARE PLAN (Screen 6 of Template.png) */}
          {activeTab === 'my-plan' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Your Personalized Healthcare Plan
                  </h1>
                  <p className="text-xs text-slate-500">Step-by-step guidance tailored to your needs</p>
                </div>
              </div>

              {/* 5 Numbered Steps matching Screen 6 */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                
                {/* Step 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      Collect Required Documents
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Take your ID proof, address proof, income-related document, and any other scheme-specific documents.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      Visit the Recommended Hospital
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      {recommendedHospital 
                        ? `Go to ${recommendedHospital.name} (${recommendedHospital.distance.value} ${recommendedHospital.distance.unit} away).`
                        : 'Go to your nearest recommended healthcare facility.'}
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      Register at the Hospital
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Complete the registration at the offline help desk.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      Request the Required Service
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Ask for your diabetes checkup.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    5
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      Verify the Scheme and Benefits
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Confirm your eligibility and the applicable government benefits.
                    </p>
                  </div>
                </div>

              </div>

              {/* Green Footer Card with Download Plan (PDF) Button matching Screen 6 */}
              <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">
                      You're one step closer to better health!
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      If you need any assistance, our support team is here to help.
                    </p>
                  </div>
                </div>

                <button
                  onClick={onOpenPdfModal}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Plan (PDF)</span>
                </button>
              </div>

            </div>
          )}

          {/* VIEW 3: NEARBY HOSPITALS / RECOMMENDED HOSPITAL & MAP (Data-Driven Architecture) */}
          {activeTab === 'nearby-hospitals' && (
            <div className="space-y-6">
              
              {/* If User is Viewing Full Details of a Specific Hospital */}
              {selectedHospitalDetailId ? (
                <div className="space-y-4">
                  <HospitalDetailsPage
                    hospitalId={selectedHospitalDetailId}
                    initialShowMap={openMapInDetails}
                    onBack={() => {
                      setSelectedHospitalDetailId(null);
                      setOpenMapInDetails(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onOpenPdfModal={onOpenPdfModal}
                  />
                </div>
              ) : (
                <div className="space-y-6">
                  
                  {/* Sub-Navigation: Toggle between Recommended Facility and Full Directory */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                    <div>
                      <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        {hospitalSubView === 'recommended' ? 'Recommended Hospital' : 'Hospital Directory & Search'}
                      </h1>
                      <p className="text-xs text-slate-500">
                        {hospitalSubView === 'recommended'
                          ? 'Best matching healthcare facility for your location and verified medical needs'
                          : 'Search and filter all empanelled government and community healthcare centers'}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setHospitalSubView('recommended')}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                          hospitalSubView === 'recommended'
                            ? 'bg-teal-800 text-white shadow-xs'
                            : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        ★ Recommended Match
                      </button>

                      <button
                        type="button"
                        onClick={() => setHospitalSubView('directory')}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                          hospitalSubView === 'directory'
                            ? 'bg-teal-800 text-white shadow-xs'
                            : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        All Facilities ({allHospitalsCount})
                      </button>
                    </div>
                  </div>

                  {/* Subview 1: Recommended Match View */}
                  {hospitalSubView === 'recommended' && (
                    <div className="space-y-6">
                      {recommendedHospital ? (
                        <>
                          {/* Recommended Hospital Card */}
                          <div className="space-y-2">
                            <HospitalCard
                              hospital={recommendedHospital}
                              onSelectHospital={(id) => {
                                setSelectedHospitalDetailId(id);
                                setOpenMapInDetails(false);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              onViewOnMap={(h) => {
                                setSelectedHospitalDetailId(h.id);
                                setOpenMapInDetails(true);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                            />
                          </div>

                          {/* Quick Banner to explore other hospitals */}
                          <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                              <h4 className="text-sm font-bold text-teal-950">Looking for other facilities?</h4>
                              <p className="text-xs text-teal-800 mt-0.5">
                                Browse all {allHospitalsCount} verified healthcare facilities with specialized filters for distance, services, and accessibility.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setHospitalSubView('directory')}
                              className="px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-xs"
                            >
                              Explore Directory ({allHospitalsCount})
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
                          <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
                          <h3 className="text-base font-bold text-slate-800">Loading recommended hospital...</h3>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Subview 2: All Hospitals Directory View */}
                  {hospitalSubView === 'directory' && (
                    <HospitalsPage
                      onSelectHospitalId={(id) => {
                        setSelectedHospitalDetailId(id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      onOpenPdfModal={onOpenPdfModal}
                    />
                  )}

                </div>
              )}

            </div>
          )}

          {/* VIEW 4: SCHEMES DIRECTORY (Screen 4 Details & Government Schemes) */}
          {activeTab === 'schemes' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Government Healthcare Schemes
                </h1>
                <p className="text-xs text-slate-500">Official health coverage and diagnostic subsidies</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                
                {/* Ayushman Bharat PM-JAY */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                        National Scheme
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">
                        Ayushman Bharat – Pradhan Mantri Jan Arogya Yojana (PM-JAY)
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Potentially Eligible
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600">
                    Provides health insurance cover of up to ₹5,00,000 per family per year for secondary and tertiary care hospitalization to over 12 crore poor and vulnerable families.
                  </p>

                  <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-1.5 text-slate-700">
                    <p><strong>Benefits:</strong> Cashless hospital care, free pre- and post-hospitalization, free diagnostics.</p>
                    <p><strong>Required Documents:</strong> Aadhaar Card, Ration Card / SECC 2011 status.</p>
                    <p><strong>Offline Verification:</strong> Ayushman Mitra help desk at Gate 1 of {recommendedHospital?.name || 'empanelled hospital'}.</p>
                  </div>
                </div>

                {/* State Health Assurance Scheme */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-50 px-2 py-0.5 rounded">
                        State Health Scheme
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">
                        State Government Health Assurance Scheme
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                      State Subsidized
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600">
                    Targeted state coverage extending medical relief to families holding BPL cards, Antyodaya cards, or registered informal construction worker cards.
                  </p>

                  <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-1.5 text-slate-700">
                    <p><strong>Benefits:</strong> Subsidized OPD medicines, emergency blood transfusion, maternity incentives.</p>
                    <p><strong>Required Documents:</strong> State domicile certificate, BPL/Ration card, Jan Aadhaar / State ID.</p>
                  </div>
                </div>

                {/* National Programme for Prevention and Control of Diabetes */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                        National Health Mission
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">
                        National Programme for Prevention and Control of Diabetes, CVD & Stroke (NPCDCS)
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                      Free Diagnostics
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600">
                    Dedicated NCD clinics providing free routine screening for diabetes, hypertension, and common cancers for all citizens aged 30 and above.
                  </p>

                  <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-1.5 text-slate-700">
                    <p><strong>Benefits:</strong> Free random and fasting blood sugar tests, free BP monitoring, free lifestyle counseling.</p>
                    <p><strong>Required Documents:</strong> Any valid photo ID proof.</p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* VIEW 5: DOCUMENTS REQUIRED (Screen 8 of Template.png) */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Documents Required
                </h1>
                <p className="text-xs text-slate-500">Carry these documents for offline registration and benefit verification</p>
              </div>

              {/* 4 Document Cards matching Screen 8 */}
              <div className="space-y-3">
                
                {/* 1. Government ID Proof (Purple icon) */}
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        Government ID Proof
                      </h3>
                      <p className="text-xs text-slate-500">
                        (e.g., Aadhaar Card, Voter ID)
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                    Required
                  </span>
                </div>

                {/* 2. Address Proof (Blue icon) */}
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        Address Proof
                      </h3>
                      <p className="text-xs text-slate-500">
                        (e.g., Aadhaar Card, Ration Card, Electricity Bill)
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                    Required
                  </span>
                </div>

                {/* 3. Income-related Document (Orange icon) */}
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        Income-related Document
                      </h3>
                      <p className="text-xs text-slate-500">
                        (e.g., Income Certificate, BPL Card)
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                    Required
                  </span>
                </div>

                {/* 4. Any other scheme-specific document (Green icon) */}
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        Any other scheme-specific document
                      </h3>
                      <p className="text-xs text-slate-500">
                        (as applicable)
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 shrink-0">
                    If Applicable
                  </span>
                </div>

              </div>

              {/* Helpful Offline Desk Tip */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
                <Info className="w-4 h-4 text-teal-800 shrink-0 mt-0.5" />
                <p>
                  <strong>No photocopier nearby?</strong> Do not worry. The hospital offline registration help desk at Gate 1 will scan your original Aadhaar or Ration Card free of charge and return it to you immediately.
                </p>
              </div>

            </div>
          )}

          {/* VIEW 6: SUPPORT / NEED HELP? (Screen 9 of Template.png) */}
          {activeTab === 'support' && (
            <div className="space-y-8">
              
              {/* Header with Headset Icon */}
              <div className="text-center space-y-2 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto shadow-xs border border-emerald-100">
                  <HelpCircle className="w-8 h-8 stroke-[2.2]" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Need Help?
                </h1>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Our support team is here to assist you.
                </p>
              </div>

              {/* 3 Contact Cards matching Screen 9 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                
                {/* Call Us Card */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col items-center text-center space-y-3 hover:border-teal-300 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">Call Us</h3>
                    <p className="text-sm font-extrabold text-teal-800 font-mono">1800-123-4567</p>
                    <p className="text-xs text-slate-500">(Toll Free)</p>
                  </div>
                </div>

                {/* Email Us Card */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col items-center text-center space-y-3 hover:border-teal-300 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">Email Us</h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800">support@equihealth.gov.in</p>
                    <p className="text-xs text-slate-500">Fast 24-hr Response</p>
                  </div>
                </div>

                {/* Chat with Us Card */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col items-center text-center space-y-3 hover:border-teal-300 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">Chat with Us</h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800">Available 9 AM – 6 PM</p>
                    <p className="text-xs text-slate-500">Live Care Assistants</p>
                  </div>
                </div>

              </div>

              {/* Bottom Slogan Banner matching Screen 9 */}
              <div className="text-center pt-8 border-t border-slate-100">
                <p className="text-sm sm:text-base font-bold text-teal-900 tracking-wide">
                  Better Health. Brighter Futures. Together.
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
