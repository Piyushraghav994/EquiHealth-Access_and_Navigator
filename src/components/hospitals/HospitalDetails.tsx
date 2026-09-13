import React from 'react';
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
  Layers
} from 'lucide-react';

interface HospitalDetailsProps {
  hospital: Hospital;
  onBack?: () => void;
  onOpenPdfModal?: () => void;
}

export const HospitalDetails: React.FC<HospitalDetailsProps> = ({
  hospital,
  onBack,
  onOpenPdfModal
}) => {
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

      {/* SECTION 8: COSTS */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-black text-xs">
            ₹
          </span>
          <span>Estimated Outpatient & Diagnostic Costs</span>
        </h2>
        <HospitalCosts costs={costs} />
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
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-teal-700" />
          <span>Location & Geographic Navigation</span>
        </h2>
        <HospitalLocation hospital={hospital} />
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
