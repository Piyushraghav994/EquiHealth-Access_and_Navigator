import React, { useState, useEffect } from 'react';
import { Hospital } from '../../types/hospital';
import { HospitalImageGallery } from './HospitalImageGallery';
import { HospitalServices } from './HospitalServices';
import { HospitalTimings } from './HospitalTimings';
import { HospitalAppointment } from './HospitalAppointment';
import { OfflineRegistrationGuide } from './OfflineRegistrationGuide';
import { RequiredDocuments } from './RequiredDocuments';
import { HospitalCosts } from './HospitalCosts';
import { AccessibilityInfo } from './AccessibilityInfo';
import { HospitalLocation } from './HospitalLocation';
import { RecommendationReasons } from './RecommendationReasons';
import { HealthcareAccessPlan } from './HealthcareAccessPlan';
import { 
  Building2, 
  MapPin, 
  Bus, 
  Clock, 
  Phone, 
  PhoneCall, 
  Globe, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2,
  Calendar,
  Layers,
  Navigation
} from 'lucide-react';

interface HospitalDetailsProps {
  hospital: Hospital;
  onBack?: () => void;
  onOpenPdfModal?: () => void;
  initialShowMap?: boolean;
}

export const HospitalDetails: React.FC<HospitalDetailsProps> = ({
  hospital,
  onBack,
  onOpenPdfModal,
  initialShowMap = false
}) => {
  const [showMap, setShowMap] = useState<boolean>(initialShowMap);

  useEffect(() => {
    if (initialShowMap !== undefined) {
      setShowMap(initialShowMap);
    }
  }, [initialShowMap]);
  const {
    name,
    type,
    category,
    description,
    images = [],
    address,
    location,
    distance,
    travel,
    services = [],
    registration,
    appointment,
    timings,
    costs = [],
    documents = [],
    accessibility,
    contact,
    facilities = [],
    governmentBenefits = [],
    recommendation,
    accessPlan,
    status
  } = hospital;

  const fullAddress = [
    address.addressLine,
    address.village,
    address.city,
    address.district,
    address.state,
    address.pincode
  ].filter(Boolean).join(', ');

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-12">
      
      {/* Navigation Header / Back Button */}
      {onBack && (
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Hospitals</span>
          </button>

          {recommendation?.isBestMatch && (
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Best Match Healthcare Facility
            </span>
          )}
        </div>
      )}

      {/* SECTION 1: HOSPITAL OVERVIEW HERO */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 font-bold text-xs uppercase tracking-wider border border-teal-200">
                {type}
              </span>
              {category && (
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold text-xs">
                  {category}
                </span>
              )}
              {status?.verified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified Facility
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-teal-700 shrink-0" />
              <span>{fullAddress}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 px-4 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Distance</span>
              <span className="text-base font-extrabold text-slate-900">{distance.value} {distance.unit}</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 px-4 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Transit Time</span>
              <span className="text-base font-extrabold text-slate-900">{travel.estimatedTime}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowMap(true);
                setTimeout(() => {
                  const mapEl = document.getElementById('details-map-view');
                  if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer self-stretch sm:self-auto justify-center"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{showMap ? 'Directions Active' : 'View Map / Directions'}</span>
            </button>
          </div>
        </div>

        {description && (
          <p className="text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-4">
            {description}
          </p>
        )}
      </div>

      {/* SECTION 2: IMAGE GALLERY */}
      {images && images.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-teal-700" />
            <span>Facility Photographs & Overview</span>
          </h2>
          <HospitalImageGallery images={images} hospitalName={name} />
        </section>
      )}

      {/* SECTION 13: WHY THIS HOSPITAL WAS RECOMMENDED */}
      {recommendation?.reasons && recommendation.reasons.length > 0 && (
        <section className="space-y-3">
          <RecommendationReasons recommendation={recommendation} />
        </section>
      )}

      {/* SECTION 14: PERSONALIZED HEALTHCARE ACCESS PLAN */}
      {accessPlan?.steps && accessPlan.steps.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-700" />
            <span>Personalized Healthcare Access Plan</span>
          </h2>
          <HealthcareAccessPlan accessPlan={accessPlan} />
        </section>
      )}

      {/* SECTION 3: SERVICES */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-teal-700" />
            <span>Available Clinical Services</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            {services.length} services recorded
          </span>
        </div>
        <HospitalServices services={services} />
      </section>

      {/* SECTION 4: APPOINTMENT INFORMATION */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-teal-700" />
          <span>Appointment & Consultation Channels</span>
        </h2>
        <HospitalAppointment appointment={appointment} hospitalName={name} />
      </section>

      {/* SECTION 5: OFFLINE REGISTRATION GUIDE */}
      {registration?.offline && (
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-teal-700" />
            <span>Offline Registration Counter Guide</span>
          </h2>
          <OfflineRegistrationGuide registration={registration} />
        </section>
      )}

      {/* SECTION 6: REQUIRED DOCUMENTS */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-teal-700" />
          <span>Required Verification Documents</span>
        </h2>
        <RequiredDocuments documents={documents} />
      </section>

      {/* SECTION 7: HOSPITAL TIMINGS */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-teal-700" />
          <span>Operating Hours & Casualty Schedule</span>
        </h2>
        <HospitalTimings timings={timings} />
      </section>

      {/* SECTION 8: ESTIMATED COST & GOVERNMENT SUBSIDIES */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-black text-xs">
            ₹
          </span>
          <span>Estimated Cost & Government Subsidies</span>
        </h2>

        {/* Dynamic Estimated Cost & Government Subsidies Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900">
            <div className="w-7 h-7 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center font-bold text-sm">
              ₹
            </div>
            <h3 className="text-base font-bold">Estimated Cost & Government Subsidies</h3>
          </div>

          <div className="space-y-2 text-sm text-slate-600 max-w-md">
            <div className="flex justify-between items-center">
              <span>Standard Outpatient Care</span>
              <span className="font-semibold text-slate-900">
                ₹{costs.reduce((acc, c) => acc + (c.max || c.min || 0), 0) || 500}
              </span>
            </div>

            {governmentBenefits && governmentBenefits.length > 0 && (
              <div className="flex justify-between items-center text-emerald-700 font-medium">
                <span>Potential Government Subsidy</span>
                <span className="font-semibold">- ₹400</span>
              </div>
            )}

            <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-base">
              <span className="font-bold text-slate-900">Estimated Payable Amount</span>
              <span className="font-extrabold text-emerald-700 text-lg">
                ₹{Math.max(10, (costs.reduce((acc, c) => acc + (c.max || c.min || 0), 0) || 500) - (governmentBenefits && governmentBenefits.length > 0 ? 400 : 0))}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 italic">
            (Subject to eligibility verification by {name} or relevant public authority.)
          </p>
        </div>

        {/* Itemized Diagnostic and Outpatient Service Breakdown */}
        <div className="space-y-2 pt-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Outpatient & Diagnostic Service Breakdown
          </h3>
          <HospitalCosts costs={costs} />
        </div>
      </section>

      {/* SECTION 9: ACCESSIBILITY & SUPPORT */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-teal-700" />
          <span>Accessibility, Disability & Senior Support</span>
        </h2>
        <AccessibilityInfo accessibility={accessibility} />
      </section>

      {/* SECTION 10: FACILITIES */}
      {facilities && facilities.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-teal-700" />
            <span>Campus Amenities & Facilities</span>
          </h2>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
            <div className="flex flex-wrap gap-2.5">
              {facilities.map((fac, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
                  <span>{fac}</span>
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 11: GOVERNMENT BENEFITS */}
      {governmentBenefits && governmentBenefits.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <span>Government Health Schemes & Cashless Benefits</span>
          </h2>
          <div className="space-y-3">
            {governmentBenefits.map((scheme, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-emerald-950">
                    {scheme.schemeName}
                  </h4>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Potentially Applicable
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {scheme.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 12: HOSPITAL LOCATION / MAP */}
      <section id="details-map-view" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-teal-700" />
            <span>Location & Geographic Navigation</span>
          </h2>
          {showMap && (
            <button
              type="button"
              onClick={() => setShowMap(false)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline cursor-pointer"
            >
              Hide Map
            </button>
          )}
        </div>

        {!showMap ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="space-y-1 md:col-span-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Physical Address
                </span>
                <p className="font-semibold text-slate-900 leading-snug">
                  {fullAddress}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Transit & Distance
                </span>
                <p className="font-bold text-slate-900">
                  {distance.value} {distance.unit}
                </p>
                <p className="text-slate-600 text-xs flex items-center gap-1">
                  <Bus className="w-3.5 h-3.5 text-slate-400" />
                  <span>~ {travel.estimatedTime} ({travel.mode})</span>
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setShowMap(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>View Map / Directions</span>
              </button>
              <span className="text-xs text-slate-500">
                Click to open patient route and interactive navigation map
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <HospitalLocation hospital={hospital} />
          </div>
        )}
      </section>

      {/* SECTION 15: CONTACT INFORMATION */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Phone className="w-5 h-5 text-teal-700" />
          <span>Official Hospital Contact & Helpdesk</span>
        </h2>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Primary Telephone</span>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Phone className="w-4 h-4 text-teal-700 shrink-0" />
              <span>{contact.phone || 'Not available'}</span>
            </div>
          </div>

          {contact.emergencyPhone && (
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">Emergency Helpline</span>
              <div className="flex items-center gap-2 text-sm font-bold text-red-700">
                <PhoneCall className="w-4 h-4 text-red-600 shrink-0" />
                <span>{contact.emergencyPhone}</span>
              </div>
            </div>
          )}

          {contact.helpDesk && (
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Help Desk & Enquiries</span>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Phone className="w-4 h-4 text-teal-700 shrink-0" />
                <span>{contact.helpDesk}</span>
              </div>
            </div>
          )}

          {contact.website && (
            <div className="space-y-1 sm:col-span-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Official Portal</span>
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-teal-800 hover:text-teal-900 font-semibold underline truncate"
              >
                <Globe className="w-3.5 h-3.5 shrink-0" />
                <span>{contact.website}</span>
              </a>
            </div>
          )}

        </div>
      </section>

    </div>
  );
};
