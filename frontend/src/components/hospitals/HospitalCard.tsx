import React, { useState } from 'react';
import { Hospital } from '../../types/hospital';
import { 
  Building2, 
  MapPin, 
  Bus, 
  CheckCircle2, 
  FileCheck, 
  Clock, 
  ChevronRight, 
  ArrowUpRight 
} from 'lucide-react';

interface HospitalCardProps {
  hospital: Hospital;
  onSelectHospital?: (hospitalId: string) => void;
  onViewOnMap?: (hospital: Hospital) => void;
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80';

export const HospitalCard: React.FC<HospitalCardProps> = ({
  hospital,
  onSelectHospital,
  onViewOnMap
}) => {
  const [imageError, setImageError] = useState(false);

  const {
    id,
    name,
    type,
    category,
    images = [],
    address,
    distance,
    travel,
    services = [],
    registration,
    timings,
    recommendation
  } = hospital;

  const primaryImage = !imageError && images.length > 0 ? images[0] : DEFAULT_IMAGE;

  // Check if primary services are available
  const hasAvailableServices = services.some(s => s.available);

  // Registration type display text
  const registrationText = registration.online && registration.offline
    ? 'Online & Offline'
    : registration.offline
    ? 'Offline'
    : registration.online
    ? 'Online'
    : 'Walk-in';

  // Handle opening details
  const handleCardClick = (e: React.MouseEvent) => {
    // If user clicked inside an action button, don't trigger the card container click
    if ((e.target as HTMLElement).closest('button, a')) {
      return;
    }
    if (onSelectHospital) {
      onSelectHospital(id);
    }
  };

  const fullLocationString = [
    address.addressLine,
    address.village,
    address.city,
    address.district
  ].filter(Boolean).join(', ');

  const timingsSummary = timings.emergency 
    ? `Emergency: ${timings.emergency}` 
    : (timings.monday || 'OPD Working Days');

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-teal-400 transition-all cursor-pointer relative"
      id={`hospital-card-${id}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        
        {/* Left Column: Hospital Image / Visual Container */}
        <div className="md:col-span-5 bg-slate-900 relative min-h-[220px] sm:min-h-[240px] flex items-center justify-center overflow-hidden">
          <img
            src={primaryImage}
            alt={name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-90"
            referrerPolicy="no-referrer"
          />

          {/* Dark Overlay with Metadata Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 p-5 flex flex-col justify-between text-white">
            <div className="flex justify-between items-start">
              <span className="px-2.5 py-1 rounded-md bg-teal-800/90 text-white font-bold text-[10px] uppercase tracking-wider backdrop-blur-xs shadow-xs">
                {type}
              </span>
              <Building2 className="w-6 h-6 text-teal-300/80" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-black text-white leading-tight drop-shadow-xs">
                {name}
              </h3>
              <p className="text-xs text-teal-200/90 line-clamp-1">
                {fullLocationString}
              </p>

              <div className="text-[11px] text-slate-300 flex items-center gap-1.5 pt-1.5 border-t border-white/15">
                <Clock className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                <span className="truncate">{timingsSummary}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Hospital Details */}
        <div className="md:col-span-7 p-5 sm:p-7 flex flex-col justify-between space-y-4">
          
          <div className="space-y-3">
            {/* Header: Name and Best Match Badge */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                  {name}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {category || type}
                </p>
              </div>

              {recommendation?.isBestMatch && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0 shadow-2xs">
                  Best Match
                </span>
              )}
            </div>

            {/* Core Metrics & Status List */}
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{distance.value} {distance.unit} away ({address.city})</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Bus className="w-4 h-4 text-slate-400 shrink-0" />
                <span>~ {travel.estimatedTime} (by {travel.mode})</span>
              </div>

              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Required Service:{' '}
                  <strong className={hasAvailableServices ? 'text-slate-900' : 'text-amber-700'}>
                    {hasAvailableServices ? 'Available' : 'Check Availability'}
                  </strong>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <FileCheck className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  Registration: <strong className="text-slate-900">{registrationText}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  Type: <strong className="text-slate-900">{type}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Card Action Buttons: Removed "Get Directions", Kept "View on Map", Added "View Details" */}
          <div className="flex flex-col min-[420px]:flex-row flex-wrap items-stretch min-[420px]:items-center gap-2.5 sm:gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onViewOnMap) {
                  onViewOnMap(hospital);
                } else if (onSelectHospital) {
                  onSelectHospital(id);
                }
              }}
              className="min-h-[44px] px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer text-center flex items-center justify-center"
            >
              View on Map
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onSelectHospital) {
                  onSelectHospital(id);
                }
              }}
              className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-teal-800 hover:bg-teal-900 text-white shadow-xs transition-colors cursor-pointer"
            >
              <span>View Full Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
