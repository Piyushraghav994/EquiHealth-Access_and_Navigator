import React from 'react';
import { HospitalAccessibility } from '../../types/hospital';
import { 
  CheckCircle2, 
  XCircle, 
  Accessibility, 
  Eye, 
  Ear, 
  Languages, 
  HeartHandshake, 
  Users
} from 'lucide-react';

interface AccessibilityInfoProps {
  accessibility?: HospitalAccessibility;
}

export const AccessibilityInfo: React.FC<AccessibilityInfoProps> = ({ accessibility }) => {
  if (!accessibility) {
    return (
      <div className="bg-slate-50 rounded-xl p-5 text-center text-slate-500 text-sm border border-slate-200">
        Information not available
      </div>
    );
  }

  const features = [
    {
      label: 'Wheelchair Accessible Ramps',
      enabled: accessibility.wheelchairAccessible || accessibility.rampsAvailable,
      icon: Accessibility
    },
    {
      label: 'Accessible Step-Free Entrance',
      enabled: accessibility.accessibleEntrance,
      icon: Accessibility
    },
    {
      label: 'Accessible Toilets',
      enabled: accessibility.accessibleToilet,
      icon: CheckCircle2
    },
    {
      label: 'Special Assistance Desk',
      enabled: accessibility.assistanceDesk,
      icon: HeartHandshake
    },
    {
      label: 'Priority Elderly & Senior Assistance',
      enabled: accessibility.elderlyAssistance,
      icon: Users
    },
    {
      label: 'Disability Support Cell',
      enabled: accessibility.disabilitySupport,
      icon: Accessibility
    },
    {
      label: 'Sign Language Support',
      enabled: accessibility.signLanguageSupport,
      icon: Ear
    },
    {
      label: 'Braille Signage',
      enabled: accessibility.brailleSignage,
      icon: Eye
    }
  ];

  return (
    <div className="space-y-4">
      {/* Grid of accessibility features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                feat.enabled
                  ? 'border-emerald-200 bg-emerald-50/40 text-slate-900'
                  : 'border-slate-200 bg-slate-50/50 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 shrink-0 ${feat.enabled ? 'text-emerald-700' : 'text-slate-400'}`} />
                <span className="text-xs sm:text-sm font-semibold">{feat.label}</span>
              </div>

              {feat.enabled ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md shrink-0">
                  <CheckCircle2 className="w-3 h-3" />
                  Yes
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-200/80 px-2 py-0.5 rounded-md shrink-0">
                  <XCircle className="w-3 h-3" />
                  No
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Language Support */}
      {accessibility.languageSupport && accessibility.languageSupport.length > 0 && (
        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800">
            <Languages className="w-4 h-4 text-teal-700 shrink-0" />
            <span>Spoken & Helpdesk Languages Supported:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {accessibility.languageSupport.map((lang, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-900 text-xs font-semibold"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
