import React, { useState } from 'react';
import { 
  UserProfile, 
  FacilityCategory, 
  SatelliteHospital, 
  PathlabServiceItem, 
  ChemistFacility, 
  BookingRecord 
} from '../types';
import { SATELLITE_HOSPITALS, PATHLAB_SERVICES, CHEMIST_FACILITIES } from '../data/mockData';
import { 
  Building2, 
  FlaskConical, 
  Pill, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Calendar, 
  IndianRupee, 
  Search, 
  SlidersHorizontal, 
  ArrowRight, 
  ShieldCheck, 
  Printer, 
  Sparkles, 
  Check, 
  AlertCircle,
  FileText,
  UserCheck,
  ChevronDown
} from 'lucide-react';

interface EligibleServicesBookingProps {
  user: UserProfile;
  language: 'en' | 'hi';
  onOpenPatientPdf?: () => void;
}

export const EligibleServicesBooking: React.FC<EligibleServicesBookingProps> = ({
  user,
  language,
  onOpenPatientPdf
}) => {
  // Primary Eligible Dropdown category
  const [selectedCategory, setSelectedCategory] = useState<FacilityCategory>('govt-hospitals');
  // Secondary location filter
  const [locationFilter, setLocationFilter] = useState<'all' | 'Central' | 'East' | 'Rural'>('all');
  // Search keyword
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Booking Modal State
  const [bookingItem, setBookingItem] = useState<{
    category: FacilityCategory;
    title: string;
    facilityName: string;
    costMin: number;
    costMax: number;
    isOnline: boolean;
    isOffline: boolean;
  } | null>(null);

  const [bookingDate, setBookingDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [bookingTimeSlot, setBookingTimeSlot] = useState<string>('Morning (9:00 AM - 12:00 PM)');
  const [bookingMode, setBookingMode] = useState<
    'Online Tele-Consult' | 'In-Person Hospital Visit' | 'Pathlab Walk-In' | 'Home Sample Collection' | 'Chemist Pickup'
  >('In-Person Hospital Visit');

  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  // Filtered Hospitals
  const filteredHospitals = SATELLITE_HOSPITALS.filter(hosp => {
    const matchLoc = locationFilter === 'all' || hosp.locationType === locationFilter;
    const matchSearch = hosp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hosp.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hosp.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchLoc && matchSearch;
  });

  // Filtered Pathlab tests
  const filteredPathlab = PATHLAB_SERVICES.filter(test => {
    const matchSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
  });

  // Filtered Chemists
  const filteredChemists = CHEMIST_FACILITIES.filter(chem => {
    const matchLoc = locationFilter === 'all' || chem.branchType === locationFilter;
    const matchSearch = chem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chem.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chem.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchLoc && matchSearch;
  });

  // Calculation of Patient Subsidies
  const calculatePatientCost = (minCost: number, maxCost: number) => {
    const avg = Math.round((minCost + maxCost) / 2);
    let subsidyRate = 0;
    let schemeName = 'None';

    if (user.healthInsurance === 'PM-JAY (Ayushman Bharat)') {
      subsidyRate = 1.0; // 100% covered
      schemeName = 'PM-JAY Cashless Entitlement';
    } else if (user.annualIncomeTier === 'Low' || user.employmentStatus === 'Informal/Daily wages') {
      subsidyRate = 0.85; // 85% covered under National Health Mission / BPL
      schemeName = 'NHM Free Diagnostic & BPL Waiver';
    } else if (user.healthInsurance === 'State Government Scheme') {
      subsidyRate = 0.80;
      schemeName = 'State Arogya Subsidy';
    }

    const discount = Math.round(avg * subsidyRate);
    const net = Math.max(0, avg - discount);

    return {
      originalAverage: avg,
      discount,
      netPayable: net,
      schemeName
    };
  };

  const handleOpenBooking = (
    category: FacilityCategory,
    title: string,
    facilityName: string,
    costMin: number,
    costMax: number,
    isOnline: boolean,
    isOffline: boolean
  ) => {
    setBookingItem({
      category,
      title,
      facilityName,
      costMin,
      costMax,
      isOnline,
      isOffline
    });

    if (category === 'govt-hospitals') {
      setBookingMode('In-Person Hospital Visit');
    } else if (category === 'pathlab') {
      setBookingMode('Pathlab Walk-In');
    } else {
      setBookingMode('Chemist Pickup');
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingItem) return;

    const costs = calculatePatientCost(bookingItem.costMin, bookingItem.costMax);
    const randomToken = `EQH-${bookingItem.category.toUpperCase().slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: BookingRecord = {
      id: `bk-${Date.now()}`,
      tokenNumber: randomToken,
      patientName: user.fullName || 'Patient',
      patientAge: user.age || 40,
      patientPhone: user.phone || '9876543210',
      facilityCategory: bookingItem.category,
      facilityName: bookingItem.facilityName,
      serviceTitle: bookingItem.title,
      appointmentDate: bookingDate,
      timeSlot: bookingTimeSlot,
      bookingType: bookingMode,
      originalCost: costs.originalAverage,
      subsidizedAmount: costs.discount,
      netPayableCost: costs.netPayable,
      appliedScheme: costs.schemeName,
      status: 'Confirmed',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      notes: user.identifiedBarriers.length > 0 
        ? `Barrier Support: Gate 1 Assisted Desk (${user.identifiedBarriers.join(', ')})`
        : 'Direct counter verification with Government ID'
    };

    setConfirmedBooking(newBooking);
    setBookingItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card with Patient Status & PDF Description Trigger */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-teal-600/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-slate-900">
                {language === 'hi' ? 'योग्य स्वास्थ्य सेवा और बुकिंग निर्देशिका' : 'Eligible Healthcare Services & Booking Directory'}
              </h2>
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800 rounded-full">
                Government Empaneled Network
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Registered Patient: <strong className="text-slate-900">{user.fullName || 'Priya Sharma'}</strong> ({user.age || 42} yrs, {user.residentialArea} • {user.cityOrVillage}) | Scheme: <strong className="text-teal-700">{user.healthInsurance}</strong>
            </p>
          </div>
        </div>

        {onOpenPatientPdf && (
          <button
            onClick={onOpenPatientPdf}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer shrink-0 self-start md:self-auto"
          >
            <FileText className="w-4 h-4 text-teal-400" />
            <span>{language === 'hi' ? 'रोगी विवरण PDF देखें' : 'View Patient Description (PDF)'}</span>
          </button>
        )}
      </div>

      {/* Main Interactive Controls: ELIGIBLE DROPDOWN MENU & FILTERS */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-teal-400 block mb-0.5">
              Select Healthcare Category
            </span>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-teal-400" />
              Eligible Dropdown Menu & Service Navigator
            </h3>
          </div>

          {/* Location Radio / Filter */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl text-xs">
            <span className="text-slate-400 text-[11px] px-2 font-medium">Branch:</span>
            {(['all', 'Central', 'East', 'Rural'] as const).map(loc => (
              <button
                key={loc}
                onClick={() => setLocationFilter(loc)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  locationFilter === loc
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {loc === 'all' ? 'All Locations' : loc}
              </button>
            ))}
          </div>
        </div>

        {/* The Mandatory Dropdown Menu & Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Main Category Dropdown */}
          <div className="sm:col-span-5 relative">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Choose Eligible Healthcare Facility Category:
            </label>
            <div className="relative">
              <select
                id="eligible-category-dropdown"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as FacilityCategory)}
                className="w-full appearance-none px-4 py-3 text-sm font-bold rounded-xl bg-slate-800 border-2 border-teal-500/80 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer pr-10 shadow-inner"
              >
                <option value="govt-hospitals">
                  🏥 Government Hospitals (Central, East & Rural Satellite Branches)
                </option>
                <option value="pathlab">
                  🔬 Pathlab (Diagnostics, Blood Tests, BP & Diabetes Monitoring)
                </option>
                <option value="chemist">
                  💊 Chemist (Jan Aushadhi Subsidized Pharmacies & Dispensaries)
                </option>
              </select>
              <ChevronDown className="w-5 h-5 text-teal-400 absolute right-3 top-3.5 pointer-events-none" />
            </div>
          </div>

          {/* Quick Tab Selector for Visual Ease */}
          <div className="sm:col-span-4 flex flex-col justify-end">
            <div className="grid grid-cols-3 gap-1.5 bg-slate-800 p-1.5 rounded-xl border border-slate-700">
              <button
                onClick={() => setSelectedCategory('govt-hospitals')}
                className={`py-2 px-2 text-xs font-bold rounded-lg transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                  selectedCategory === 'govt-hospitals'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Govt Hospitals</span>
              </button>

              <button
                onClick={() => setSelectedCategory('pathlab')}
                className={`py-2 px-2 text-xs font-bold rounded-lg transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                  selectedCategory === 'pathlab'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Pathlab</span>
              </button>

              <button
                onClick={() => setSelectedCategory('chemist')}
                className={`py-2 px-2 text-xs font-bold rounded-lg transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                  selectedCategory === 'chemist'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Pill className="w-3.5 h-3.5" />
                <span>Chemist</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="sm:col-span-3 flex flex-col justify-end">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search services or tests..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 pl-8"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. GOVERNMENT HOSPITALS VIEW                                              */}
      {/* ========================================================================= */}
      {selectedCategory === 'govt-hospitals' && (
        <div className="space-y-5">
          {/* Hospital Specifications Highlight Bar */}
          <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-teal-600 text-white">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-teal-950 font-bold block">
                  Official Government Satellite Hospital Network:
                </strong>
                <span className="text-teal-800">
                  1. Central (City center) • 2. East (Suburban) • 3. Rural (Village)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-teal-900 bg-white/80 px-3 py-1.5 rounded-xl border border-teal-200">
              <Clock className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span>
                <strong>Opening Hours:</strong> Mon-Sat: 8 AM - 8 PM | Sun: 10 AM - 6 PM | Emergency: 24/7
              </span>
            </div>
          </div>

          {/* Hospital Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {filteredHospitals.map(hosp => {
              const isRural = hosp.locationType === 'Rural';
              const isEast = hosp.locationType === 'East';
              const isCentral = hosp.locationType === 'Central';

              return (
                <div
                  key={hosp.id}
                  className={`rounded-2xl border bg-white flex flex-col justify-between transition-all hover:shadow-md ${
                    isRural && user.residentialArea === 'Rural'
                      ? 'border-teal-500 ring-2 ring-teal-500/20 shadow-sm'
                      : 'border-slate-200 shadow-xs'
                  }`}
                >
                  {/* Card Header */}
                  <div className="p-5 border-b border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                        isCentral 
                          ? 'bg-sky-100 text-sky-800' 
                          : isEast 
                            ? 'bg-indigo-100 text-indigo-800' 
                            : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        Location: {hosp.locationType}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        {hosp.bookingMode}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-slate-900 leading-snug">
                      {hosp.name}
                    </h3>

                    {/* Exact Location Description from prompt */}
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                      <strong>Location Type: </strong>
                      {isCentral && 'City center; Well-equipped, online booking.'}
                      {isEast && 'Suburban; Mid-range, mixed online/offline.'}
                      {isRural && 'Village; Basic services, offline only.'}
                    </div>

                    <p className="text-xs text-slate-500 flex items-start gap-1.5 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{hosp.address}</span>
                    </p>
                  </div>

                  {/* Card Body: Hours, Transport, Features */}
                  <div className="p-5 space-y-3.5 text-xs">
                    {/* Mandatory Opening Hours */}
                    <div className="p-3 rounded-xl bg-teal-50/50 border border-teal-100 space-y-1 text-slate-800">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-teal-600" />
                        Standard Opening Hours:
                      </span>
                      <p className="text-[11px] font-medium">• Mon-Sat: <strong>{hosp.openingHours.monSat}</strong></p>
                      <p className="text-[11px] font-medium">• Sunday: <strong>{hosp.openingHours.sunday}</strong></p>
                      <p className="text-[11px] font-medium text-rose-700">• Emergency: <strong>{hosp.openingHours.emergency}</strong></p>
                    </div>

                    {/* Contact & Transit */}
                    <div className="space-y-1 text-[11px] text-slate-600">
                      <p className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>Helpline: <strong>{hosp.helplinePhone}</strong></span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>Distance: <strong>~{hosp.distanceKmFromUser} km from your area</strong></span>
                      </p>
                    </div>

                    {/* Features checklist */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Facility Access Features:</span>
                      {hosp.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                          <CheckCircle2 className="w-3 h-3 text-teal-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Action Button */}
                  <div className="p-4 border-t border-slate-100 bg-slate-50/60 rounded-b-2xl">
                    <button
                      onClick={() => handleOpenBooking(
                        'govt-hospitals',
                        'General OPD & Physician Consultation',
                        hosp.name,
                        200,
                        500,
                        hosp.bookingMode.includes('online'),
                        true
                      )}
                      className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {hosp.bookingMode === 'Offline desk only'
                          ? 'Generate Offline Desk Token'
                          : 'Book Hospital Appointment'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. PATHLAB (DIAGNOSTICS & PATHOLOGY) VIEW                                 */}
      {/* ========================================================================= */}
      {selectedCategory === 'pathlab' && (
        <div className="space-y-5">
          {/* Prominent Standard Cost Structure Banner requested by user */}
          <div className="p-5 rounded-2xl bg-white border border-teal-200 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-teal-600 text-white">
                  <IndianRupee className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
                    Standard Pathlab Cost Structure & Government Subsidies
                  </h3>
                  <p className="text-xs text-slate-500">Official capped tariff across government-accredited laboratory desks</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {user.healthInsurance === 'PM-JAY (Ayushman Bharat)' 
                  ? '100% Cashless for PM-JAY Cardholders' 
                  : 'Up to 85% BPL/NHM Diagnostic Waiver'}
              </span>
            </div>

            {/* Exact Cost Structure Grid from Prompt */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Doctor Consultation</span>
                <strong className="text-base font-extrabold text-slate-900 mt-0.5 block">Rs 200 - 500</strong>
                <span className="text-[10px] text-teal-700 font-semibold block">Free with BPL/PM-JAY</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Blood Test (Basic)</span>
                <strong className="text-base font-extrabold text-slate-900 mt-0.5 block">Rs 300 - 500</strong>
                <span className="text-[10px] text-teal-700 font-semibold block">CBC, Glucose, Liver</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">BP Check</span>
                <strong className="text-base font-extrabold text-emerald-700 mt-0.5 block">Free - Rs 100</strong>
                <span className="text-[10px] text-emerald-700 font-semibold block">Free at all branches</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Diabetes Screening</span>
                <strong className="text-base font-extrabold text-slate-900 mt-0.5 block">Rs 400 - 600</strong>
                <span className="text-[10px] text-teal-700 font-semibold block">Glucose + HbA1c</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center col-span-2 sm:col-span-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Full Health Checkup</span>
                <strong className="text-base font-extrabold text-teal-800 mt-0.5 block">Rs 1500 - 2500</strong>
                <span className="text-[10px] text-teal-700 font-semibold block">Comprehensive Multi-panel</span>
              </div>
            </div>
          </div>

          {/* All Booking Options for Pathlab (Exact list requested by user) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredPathlab.map(test => {
              const pricing = calculatePatientCost(test.normalCostMin, test.normalCostMax);

              return (
                <div
                  key={test.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                        {test.category}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500">
                        {test.turnAroundTime}
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                      • {test.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {test.description}
                    </p>

                    {/* Standard Tariff vs Patient Net Payable */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                      <div className="flex items-center justify-between text-slate-500">
                        <span>Standard Tariff:</span>
                        <span className="font-bold text-slate-800">{test.costRange}</span>
                      </div>
                      <div className="flex items-center justify-between text-teal-900 pt-1 border-t border-slate-200">
                        <span className="font-bold">Estimated Net Payable:</span>
                        <span className="text-base font-black text-teal-700">
                          ₹{pricing.netPayable}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-700 block font-medium">
                        {pricing.discount > 0 ? `₹${pricing.discount} subsidized via ${pricing.schemeName}` : 'Standard counter fee'}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500 space-y-0.5">
                      <p>• <strong>Sample:</strong> {test.sampleType}</p>
                      <p>• <strong>Notes:</strong> {test.preparationNotes}</p>
                    </div>
                  </div>

                  {/* Booking Action */}
                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenBooking(
                        'pathlab',
                        test.title,
                        user.preferredHospitalId ? 'SCCDSC Satellite Pathlab' : 'SCCDSC Rural Satellite Lab Desk',
                        test.normalCostMin,
                        test.normalCostMax,
                        test.isOnlineAvailable,
                        test.isOfflineWalkIn
                      )}
                      className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Calendar className="w-3.5 h-3.5 text-teal-400" />
                      <span>Book Slot / Home Sample</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. CHEMIST / SUBSIDIZED PHARMACIES VIEW                                   */}
      {/* ========================================================================= */}
      {selectedCategory === 'chemist' && (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-950">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-600 text-white">
                <Pill className="w-4 h-4" />
              </div>
              <div>
                <strong className="font-bold block">
                  Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP) Generic Pharmacies:
                </strong>
                <span>High-quality generic medicines available at 50% to 85% lower cost than branded alternatives.</span>
              </div>
            </div>
            <span className="text-[11px] font-bold bg-white px-3 py-1 rounded-xl border border-amber-300">
              Offline Prescription Counter & Refills
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {filteredChemists.map(chem => (
              <div
                key={chem.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {chem.branchType} Branch Chemist
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {chem.bookingMode}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                    {chem.name}
                  </h3>
                  <p className="text-xs text-slate-500">{chem.address}</p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <strong className="text-emerald-700 block">{chem.subsidyDiscountText}</strong>
                    <p className="text-slate-600 text-[11px]">
                      Hours: <strong>{chem.openingHours.monSat}</strong> | Sun: <strong>{chem.openingHours.sunday}</strong>
                    </p>
                    <p className="text-[11px] text-rose-700">
                      Emergency: <strong>{chem.openingHours.emergency}</strong>
                    </p>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Available Services:</span>
                    {chem.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenBooking(
                      'chemist',
                      'Jan Aushadhi Generic Medicine Reservation / Refill',
                      chem.name,
                      50,
                      300,
                      false,
                      true
                    )}
                    className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Pill className="w-3.5 h-3.5" />
                    <span>Reserve Generic Medicine / Token</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* INTERACTIVE BOOKING MODAL (Online or Offline Token Generator)              */}
      {/* ========================================================================= */}
      {bookingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative my-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-teal-600 text-white">
                  <Calendar className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Book Service Slot & Generate Pass
                  </h3>
                  <p className="text-xs text-slate-500">{bookingItem.facilityName}</p>
                </div>
              </div>
              <button
                onClick={() => setBookingItem(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-teal-50 border border-teal-200">
                <span className="text-[10px] font-bold uppercase text-teal-800 block">Selected Item:</span>
                <p className="text-sm font-black text-teal-950 mt-0.5">{bookingItem.title}</p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-teal-200/60 text-xs">
                  <span>Standard Tariff: <strong>Rs {bookingItem.costMin} - {bookingItem.costMax}</strong></span>
                  <span className="font-bold text-teal-800">
                    Net Payable: ₹{calculatePatientCost(bookingItem.costMin, bookingItem.costMax).netPayable}
                  </span>
                </div>
              </div>

              {/* Patient Info Confirmation */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Patient Name:</label>
                  <input
                    type="text"
                    defaultValue={user.fullName || 'Priya Sharma'}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Contact Phone:</label>
                  <input
                    type="text"
                    defaultValue={user.phone || '+91-9876543210'}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
                    required
                  />
                </div>
              </div>

              {/* Booking Mode */}
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Preferred Booking Mode:</label>
                <select
                  value={bookingMode}
                  onChange={(e) => setBookingMode(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="In-Person Hospital Visit">In-Person Hospital Visit (Gate 1 Offline Desk / Kiosk)</option>
                  <option value="Pathlab Walk-In">Pathlab Walk-In (Fast Sample Desk)</option>
                  <option value="Home Sample Collection">Home Sample Collection (Doorstep Phlebotomist)</option>
                  <option value="Online Tele-Consult">Online Tele-Consult (Video / Phone Call with Doctor)</option>
                  <option value="Chemist Pickup">Jan Aushadhi Chemist Express Pickup Counter</option>
                </select>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Appointment Date:</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Time Slot:</label>
                  <select
                    value={bookingTimeSlot}
                    onChange={(e) => setBookingTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
                  >
                    <option value="Morning (8:00 AM - 11:00 AM)">Morning (8:00 AM - 11:00 AM)</option>
                    <option value="Midday (11:00 AM - 2:00 PM)">Midday (11:00 AM - 2:00 PM)</option>
                    <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                    <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setBookingItem(null)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Booking & Generate Voucher</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BOOKING CONFIRMATION MODAL & PHYSICAL PASS                                */}
      {/* ========================================================================= */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative my-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-600 text-white">
                  <CheckCircle2 className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Booking Confirmed & Token Generated!
                  </h3>
                  <p className="text-xs text-emerald-700 font-semibold">Ready to present at facility counter</p>
                </div>
              </div>
              <button
                onClick={() => setConfirmedBooking(null)}
                className="text-slate-400 hover:text-slate-700 font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Printable Pass Card */}
            <div className="border-2 border-dashed border-teal-500 rounded-xl p-5 bg-teal-50/40 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-teal-200 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase text-teal-800">Token Number:</span>
                  <p className="text-xl font-black text-teal-950">{confirmedBooking.tokenNumber}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase text-slate-500">Status:</span>
                  <span className="block font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                    {confirmedBooking.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Patient Name:</span>
                  <strong className="text-slate-900 text-sm">{confirmedBooking.patientName}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Facility:</span>
                  <strong className="text-slate-900">{confirmedBooking.facilityName}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Service:</span>
                  <strong className="text-teal-900">{confirmedBooking.serviceTitle}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Slot & Date:</span>
                  <strong className="text-slate-900">{confirmedBooking.appointmentDate} ({confirmedBooking.timeSlot.split(' ')[0]})</strong>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-teal-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Applied Subsidy:</span>
                  <strong className="text-emerald-700">{confirmedBooking.appliedScheme}</strong>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Net Payable at Counter:</span>
                  <strong className="text-lg font-black text-teal-950">₹{confirmedBooking.netPayableCost}</strong>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 bg-white/70 p-2 rounded border border-slate-200">
                <strong>Counter Guidance: </strong>
                Show this token #{confirmedBooking.tokenNumber} or paper printout at Gate 1 Offline Desk. Please bring your Aadhaar Card and Ration Card.
              </p>
            </div>

            {/* Print & Dismiss */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-teal-400" />
                <span>Print Pass Voucher</span>
              </button>
              <button
                onClick={() => setConfirmedBooking(null)}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
