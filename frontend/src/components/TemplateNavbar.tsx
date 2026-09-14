import React from 'react';
import { Heart, User, Menu, X, LogIn } from 'lucide-react';
import { LogoutButton } from './LogoutButton';

export type TemplateNavView = 'home' | 'intake' | 'login' | 'dashboard';
export type DashboardSidebarTab = 'dashboard' | 'my-plan' | 'nearby-hospitals' | 'schemes' | 'documents' | 'support';

interface TemplateNavbarProps {
  currentView: TemplateNavView;
  setCurrentView: (view: TemplateNavView) => void;
  dashboardTab?: DashboardSidebarTab;
  setDashboardTab?: (tab: DashboardSidebarTab) => void;
  userName?: string;
  equiHealthId?: string;
  isAuthenticated?: boolean;
  onLogout?: () => void;
  onOpenIntake?: () => void;
  onOpenLogin?: () => void;
}

export const TemplateNavbar: React.FC<TemplateNavbarProps> = ({
  currentView,
  setCurrentView,
  dashboardTab,
  setDashboardTab,
  userName = 'Priya Sharma',
  equiHealthId,
  isAuthenticated = false,
  onLogout,
  onOpenIntake,
  onOpenLogin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (view: TemplateNavView, tab?: DashboardSidebarTab) => {
    setCurrentView(view);
    if (tab && setDashboardTab) {
      setDashboardTab(tab);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 group cursor-pointer text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-600 to-emerald-700 flex items-center justify-center text-white shadow-xs">
            <Heart className="w-5 h-5 fill-white/20 stroke-[2.2]" />
          </div>
          <div>
            <span className="font-bold text-base sm:text-lg text-slate-900 tracking-tight block leading-tight">
              EquiHealth
            </span>
            <span className="text-xs font-semibold text-teal-700 tracking-wide block -mt-0.5">
              Navigator
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {currentView === 'home' ? (
            <>
              <button 
                onClick={() => handleNavClick('home')} 
                className="text-sm font-semibold text-teal-800 hover:text-teal-900 transition-colors cursor-pointer"
              >
                Home
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('features-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                About
              </button>
              <button 
                onClick={() => handleNavClick('dashboard', 'schemes')} 
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Schemes
              </button>
              <button 
                onClick={() => handleNavClick('dashboard', 'nearby-hospitals')} 
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Hospitals
              </button>
              <button 
                onClick={() => handleNavClick('dashboard', 'support')} 
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Contact
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => handleNavClick('dashboard', 'dashboard')} 
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  dashboardTab === 'dashboard' ? 'text-teal-800 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => handleNavClick('dashboard', 'schemes')} 
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  dashboardTab === 'schemes' ? 'text-teal-800 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Schemes
              </button>
              <button 
                onClick={() => handleNavClick('dashboard', 'nearby-hospitals')} 
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  dashboardTab === 'nearby-hospitals' ? 'text-teal-800 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Hospitals
              </button>
              <button 
                onClick={() => handleNavClick('dashboard', 'support')} 
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  dashboardTab === 'support' ? 'text-teal-800 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Contact
              </button>
            </>
          )}
        </nav>

        {/* Right CTA / User Profile Area */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => handleNavClick('dashboard', 'dashboard')}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 transition-colors cursor-pointer border border-slate-200"
                title="Account Profile & Plan"
              >
                <div className="w-7 h-7 rounded-lg bg-teal-800 text-white flex items-center justify-center font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
                <div className="hidden sm:flex flex-col text-left pr-1 leading-none gap-0.5">
                  <span className="text-xs font-semibold text-slate-800">
                    {userName}
                  </span>
                  {equiHealthId && (
                    <span className="text-[10px] font-mono font-bold text-teal-800 tracking-wide">
                      {equiHealthId}
                    </span>
                  )}
                </div>
              </button>

              <LogoutButton
                onLogoutSuccess={onLogout}
                className="hidden sm:flex"
              />
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <button 
                type="button"
                id="nav-login-btn"
                onClick={() => {
                  if (onOpenLogin) onOpenLogin();
                  else handleNavClick('login');
                }}
                className={`px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                  currentView === 'login' ? 'text-teal-900 font-semibold' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                id="nav-signup-btn"
                onClick={() => {
                  if (onOpenIntake) onOpenIntake();
                  else handleNavClick('intake');
                }}
                className="px-5 py-2 text-sm font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Sign Up</span>
              </button>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="block w-full text-left py-2.5 text-sm font-medium text-slate-700 hover:text-teal-800 transition-colors"
          >
            Home
          </button>
          
          {isAuthenticated ? (
            <>
              <div className="py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs gap-2">
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-slate-800 block truncate">{userName}</span>
                  {equiHealthId && (
                    <span className="font-mono text-teal-800 font-semibold block truncate">{equiHealthId}</span>
                  )}
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-medium shrink-0">Logged In</span>
              </div>
              <button
                type="button"
                onClick={() => handleNavClick('dashboard', 'dashboard')}
                className="block w-full text-left py-2.5 text-sm font-medium text-slate-700 hover:text-teal-800 transition-colors"
              >
                Dashboard
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('dashboard', 'my-plan')}
                className="block w-full text-left py-2.5 text-sm font-medium text-slate-700 hover:text-teal-800 transition-colors"
              >
                My Plan
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('dashboard', 'schemes')}
                className="block w-full text-left py-2.5 text-sm font-medium text-slate-700 hover:text-teal-800 transition-colors"
              >
                Schemes
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('dashboard', 'nearby-hospitals')}
                className="block w-full text-left py-2.5 text-sm font-medium text-slate-700 hover:text-teal-800 transition-colors"
              >
                Nearby Hospitals
              </button>
              <div className="pt-2 border-t border-slate-200">
                <LogoutButton
                  onLogoutSuccess={() => {
                    setMobileMenuOpen(false);
                    if (onLogout) onLogout();
                  }}
                  variant="button"
                  className="w-full min-h-[44px]"
                />
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleNavClick('dashboard', 'schemes')}
                className="block w-full text-left py-2.5 text-sm font-medium text-slate-700 hover:text-teal-800 transition-colors"
              >
                Schemes
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('dashboard', 'nearby-hospitals')}
                className="block w-full text-left py-2.5 text-sm font-medium text-slate-700 hover:text-teal-800 transition-colors"
              >
                Nearby Hospitals
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('dashboard', 'support')}
                className="block w-full text-left py-2.5 text-sm font-medium text-slate-700 hover:text-teal-800 transition-colors"
              >
                Need Help? / Contact
              </button>
              <div className="pt-2 border-t border-slate-200 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenLogin) onOpenLogin();
                    else handleNavClick('login');
                  }}
                  className="w-full min-h-[44px] py-2.5 text-center text-sm font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Login with EquiHealth ID
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenIntake) onOpenIntake();
                    else handleNavClick('intake');
                  }}
                  className="w-full min-h-[44px] py-2.5 text-center text-sm font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg transition-colors"
                >
                  Register (Sign Up)
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
};
