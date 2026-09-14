import React from 'react';
import { Hospital } from '../../types/hospital';
import { MapPin, Navigation, Bus, ExternalLink, Compass } from 'lucide-react';

interface HospitalLocationProps {
  hospital: Hospital;
}

export const HospitalLocation: React.FC<HospitalLocationProps> = ({ hospital }) => {
  const { address, location, distance, travel, name } = hospital;

  const lat = location?.latitude ?? 26.9124;
  const lng = location?.longitude ?? 75.7873;

  // External map links that work with dynamic coordinates
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const openStreetMapUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`;

  // Formatted address line
  const fullAddress = [
    address.addressLine,
    address.village ? `Village: ${address.village}` : null,
    address.city,
    address.district,
    address.state,
    address.pincode
  ].filter(Boolean).join(', ');

  return (
    <div className="space-y-4">
      {/* Address & Travel Info Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1 md:col-span-2">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Physical Address</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                {fullAddress || 'Address details on file'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Navigation className="w-4 h-4 text-teal-700" />
            <span>Transit & Distance</span>
          </div>
          <div className="text-xs text-slate-600 space-y-1">
            <p><strong>Distance:</strong> {distance.value} {distance.unit}</p>
            <p className="flex items-center gap-1.5">
              <Bus className="w-3.5 h-3.5 text-slate-400" />
              <span>{travel.estimatedTime} ({travel.mode})</span>
            </p>
          </div>
        </div>
      </div>

      {/* Stylized Interactive Map Container */}
      <div className="relative w-full h-80 sm:h-96 rounded-2xl border border-slate-200 overflow-hidden shadow-xs bg-slate-100 flex items-center justify-center">
        
        {/* Dynamic Vector Map Representation displaying hospital lat/long */}
        <svg className="w-full h-full object-cover" viewBox="0 0 800 400" preserveAspectRatio="none">
          <rect width="800" height="400" fill="#e2e8f0" />
          
          {/* Green vegetation / terrain zones */}
          <rect x="40" y="30" width="260" height="150" rx="16" fill="#cbd5e1" opacity="0.6" />
          <rect x="360" y="210" width="390" height="160" rx="24" fill="#dcfce7" opacity="0.7" />
          <rect x="520" y="20" width="240" height="140" rx="20" fill="#f1f5f9" />

          {/* Grid lines simulating road network */}
          <path d="M 120 400 L 120 0" stroke="#ffffff" strokeWidth="12" />
          <path d="M 0 310 L 800 310" stroke="#ffffff" strokeWidth="14" />
          <path d="M 0 140 L 800 140" stroke="#ffffff" strokeWidth="10" />
          <path d="M 460 0 L 460 400" stroke="#ffffff" strokeWidth="10" />
          <path d="M 280 400 L 680 0" stroke="#ffffff" strokeWidth="8" />

          {/* Route path to hospital */}
          <path
            d="M 220 310 L 340 310 L 460 220 L 460 140 L 590 140 L 590 100"
            fill="none"
            stroke="#0d9488"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="8 4"
          />

          {/* User origin pin */}
          <circle cx="220" cy="310" r="9" fill="#0284c7" />
          <circle cx="220" cy="310" r="16" fill="#0284c7" opacity="0.25" />

          {/* Destination Hospital Pin */}
          <circle cx="590" cy="100" r="12" fill="#0f766e" />
          <circle cx="590" cy="100" r="22" fill="#0f766e" opacity="0.3" />
        </svg>

        {/* User Marker Overlay */}
        <div className="absolute left-10 bottom-16 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
          <span>Your Registered Area</span>
        </div>

        {/* Hospital Marker Overlay */}
        <div className="absolute right-10 top-12 max-w-[240px] bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-teal-300 shadow-md space-y-1">
          <div className="flex items-center gap-1.5 text-teal-800 font-bold text-xs">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{name}</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Lat: {lat.toFixed(4)}, Long: {lng.toFixed(4)}
          </p>
          <div className="text-[11px] font-semibold text-emerald-700">
            {distance.value} {distance.unit} away
          </div>
        </div>

        {/* Coordinates Badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-700 hover:text-teal-800 text-xs font-bold shadow-xs border border-slate-200 transition-colors"
          >
            <span>Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <a
            href={openStreetMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-700 hover:text-teal-800 text-xs font-bold shadow-xs border border-slate-200 transition-colors"
          >
            <span>OpenStreetMap</span>
            <Compass className="w-3 h-3" />
          </a>
        </div>

      </div>
    </div>
  );
};
