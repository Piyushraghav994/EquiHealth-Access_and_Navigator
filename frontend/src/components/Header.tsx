import React from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  SlidersHorizontal, 
  BookOpen, 
  BarChart3, 
  Server, 
  Languages, 
  PhoneCall,
  ShieldCheck,
  Building2,
  CalendarCheck
} from 'lucide-react';

export type ActiveTab = 'navigator' | 'eligible-services' | 'what-if' | 'rag-explorer' | 'admin-analytics' | 'spring-spec';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  onEmergencyClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  onEmergencyClick
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Banner: Emergency Helpline */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            24/7 Government Healthcare Access & Assistance
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onEmergencyClick}
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-600/90 hover:bg-rose-600 text-white font-semibold transition-colors cursor-pointer"
          >
            <PhoneCall className="w-3 h-3 animate-bounce" />
            <span>Emergency 108 Helpline</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('navigator')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                  EquiHealth Navigator
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-200 rounded">
                  v2.4
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                {language === 'hi' 
                  ? 'सुलभ और निष्पक्ष स्वास्थ्य सेवा मार्गदर्शक' 
                  : 'AI-Assisted Healthcare Access & Navigation Platform'}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80">
            <button
              onClick={() => setActiveTab('navigator')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'navigator'
                  ? 'bg-white text-teal-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>{language === 'hi' ? 'रोगी प्रोफाइल व विवरण' : 'Patient Intake & PDF'}</span>
            </button>

            <button
              onClick={() => setActiveTab('eligible-services')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'eligible-services'
                  ? 'bg-white text-teal-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'hi' ? 'योग्य सेवाएं और बुकिंग' : 'Eligible Directory & Booking'}</span>
            </button>

            <button
              onClick={() => setActiveTab('what-if')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'what-if'
                  ? 'bg-white text-teal-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" />
              <span>{language === 'hi' ? 'व्हाट-इफ़ सिमुलेटर' : 'What-If Simulator'}</span>
            </button>

            <button
              onClick={() => setActiveTab('rag-explorer')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'rag-explorer'
                  ? 'bg-white text-teal-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === 'hi' ? 'सरकारी योजना RAG' : 'Govt Policy RAG'}</span>
            </button>

            <button
              onClick={() => setActiveTab('admin-analytics')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'admin-analytics'
                  ? 'bg-white text-teal-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-sky-600" />
              <span>{language === 'hi' ? 'एडमिन एनालिटिक्स' : 'Admin & Analytics'}</span>
            </button>

            <button
              onClick={() => setActiveTab('spring-spec')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'spring-spec'
                  ? 'bg-white text-teal-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Server className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'hi' ? 'स्प्रिंग बूट आर्किटेक्चर' : 'Spring Boot Architecture'}</span>
            </button>
          </nav>

          {/* Right Controls: Language Selector */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded ${
                  language === 'en'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 text-xs font-bold rounded ${
                  language === 'hi'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="हिंदी में बदलें (Hindi)"
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden flex items-center justify-between overflow-x-auto py-2 border-t border-slate-100 gap-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('navigator')}
            className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap rounded-md ${
              activeTab === 'navigator' ? 'bg-teal-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            {language === 'hi' ? 'रोगी प्रोफाइल' : 'Intake & PDF'}
          </button>
          <button
            onClick={() => setActiveTab('eligible-services')}
            className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap rounded-md ${
              activeTab === 'eligible-services' ? 'bg-teal-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            {language === 'hi' ? 'योग्य सेवाएं' : 'Eligible Services'}
          </button>
          <button
            onClick={() => setActiveTab('what-if')}
            className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap rounded-md ${
              activeTab === 'what-if' ? 'bg-teal-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            {language === 'hi' ? 'व्हाट-इफ़' : 'What-If'}
          </button>
          <button
            onClick={() => setActiveTab('rag-explorer')}
            className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap rounded-md ${
              activeTab === 'rag-explorer' ? 'bg-teal-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            {language === 'hi' ? 'योजना RAG' : 'Policy RAG'}
          </button>
          <button
            onClick={() => setActiveTab('admin-analytics')}
            className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap rounded-md ${
              activeTab === 'admin-analytics' ? 'bg-teal-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            {language === 'hi' ? 'एनालिटिक्स' : 'Analytics'}
          </button>
          <button
            onClick={() => setActiveTab('spring-spec')}
            className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap rounded-md ${
              activeTab === 'spring-spec' ? 'bg-teal-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            {language === 'hi' ? 'स्प्रिंग API' : 'Spring API'}
          </button>
        </div>
      </div>
    </header>
  );
};
