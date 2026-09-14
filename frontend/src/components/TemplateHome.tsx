import React from 'react';
import { 
  ArrowRight, 
  FileText, 
  Award, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Heart,
  Stethoscope,
  Users
} from 'lucide-react';

interface TemplateHomeProps {
  onGetStarted: () => void;
  onExploreSchemes: () => void;
  onExploreHospitals: () => void;
}

export const TemplateHome: React.FC<TemplateHomeProps> = ({
  onGetStarted,
  onExploreSchemes,
  onExploreHospitals
}) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between bg-white text-slate-900">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-slate-900 tracking-tight leading-[1.12]">
                Healthcare <br className="hidden sm:inline" />
                for Everyone, <br className="hidden sm:inline" />
                <span className="text-teal-800 relative inline-block">
                  Made Simple
                  <span className="absolute bottom-1 left-0 w-full h-1.5 bg-teal-200/70 -z-10 rounded-full" />
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed pt-1">
                Find the right healthcare services, government schemes and nearby hospitals — based on your unique needs.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onGetStarted}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-teal-800 hover:bg-teal-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('features-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right Hero Visual Illustration matching Template.png */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg">
              {/* Illustration Frame */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-teal-50/60 to-emerald-50/40 p-6 border border-teal-100 shadow-sm">
                
                {/* Visual Representation of Indian Healthcare & Family Illustration */}
                <div className="relative aspect-4/3 rounded-2xl bg-white border border-teal-100 p-6 flex flex-col justify-between overflow-hidden shadow-xs">
                  
                  {/* Background Hospital Building Outline */}
                  <div className="absolute top-3 right-4 opacity-15 pointer-events-none">
                    <Building2 className="w-36 h-36 text-teal-800" />
                  </div>

                  {/* Better Health Brighter Tomorrow Badge */}
                  <div className="self-end z-10">
                    <div className="px-3.5 py-1.5 rounded-lg bg-white/95 border border-teal-200 shadow-xs flex items-center gap-1.5 text-[11px] font-bold text-teal-900 uppercase tracking-wide">
                      <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
                      BETTER HEALTH BRIGHTER TOMORROW
                    </div>
                  </div>

                  {/* Characters Silhouette & Stylized Healthcare Art */}
                  <div className="relative z-10 flex items-end justify-center gap-4 pt-6 pb-2">
                    
                    {/* Doctor Card Profile */}
                    <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-200 flex flex-col items-center text-center w-36 sm:w-40 transform -rotate-1 hover:rotate-0 transition-transform">
                      <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center mb-2 shadow-inner">
                        <Stethoscope className="w-8 h-8 stroke-[2.2]" />
                      </div>
                      <span className="text-xs font-bold text-slate-900 leading-tight">Govt Medical Officer</span>
                      <span className="text-[10px] text-teal-700 font-semibold mt-0.5">Rural Health Clinic</span>
                      <div className="mt-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                        Verified Doctor
                      </div>
                    </div>

                    {/* Patient & Family Card Profile */}
                    <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-200 flex flex-col items-center text-center w-40 sm:w-44 transform rotate-1 hover:rotate-0 transition-transform">
                      <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mb-2 shadow-inner">
                        <Users className="w-8 h-8 stroke-[2.2]" />
                      </div>
                      <span className="text-xs font-bold text-slate-900 leading-tight">Patient & Family</span>
                      <span className="text-[10px] text-slate-500 font-medium mt-0.5">Ayushman Bharat Eligible</span>
                      <div className="mt-2 text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-bold">
                        100% Cashless Care
                      </div>
                    </div>

                  </div>

                  {/* Trust Footer inside graphic */}
                  <div className="relative z-10 bg-slate-50 rounded-xl p-2.5 border border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Empaneled Satellite Hospitals</span>
                    </div>
                    <span className="text-teal-700 font-bold">Zero Paperwork</span>
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4 Feature Cards Section matching Template.png */}
      <section id="features-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1: Personalized Guidance */}
          <div 
            onClick={onGetStarted}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-teal-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Personalized Guidance
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Based on your unique situation
            </p>
          </div>

          {/* Card 2: Government Schemes */}
          <div 
            onClick={onExploreSchemes}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Government Schemes
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Check your eligibility
            </p>
          </div>

          {/* Card 3: Nearby Hospitals */}
          <div 
            onClick={onExploreHospitals}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Nearby Hospitals
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Find the best options
            </p>
          </div>

          {/* Card 4: Step-by-Step Support */}
          <div 
            onClick={onGetStarted}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-rose-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Step-by-Step Support
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              From documents to registration
            </p>
          </div>

        </div>
      </section>

      {/* Bottom Slogan Banner matching Template.png */}
      <footer className="border-t border-slate-100 py-6 sm:py-8 text-center px-4 bg-slate-50/50 mt-8">
        <p className="text-sm sm:text-base font-semibold text-teal-900 tracking-wide">
          “Equal Access. Healthier Communities. Brighter Futures.”
        </p>
      </footer>
    </div>
  );
};
