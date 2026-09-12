/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserProfile, PersonalizedHealthcarePlan, RegistrationResponse } from './types';
import { PRESET_PERSONAS } from './data/mockData';
import { springBootApi } from './services/springBootApi';
import { userService } from './services/userService';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TemplateNavbar, TemplateNavView, DashboardSidebarTab } from './components/TemplateNavbar';
import { TemplateHome } from './components/TemplateHome';
import { RegistrationForm } from './components/registration/RegistrationForm';
import { LoginPage } from './components/LoginPage';
import { TemplateDashboard } from './components/TemplateDashboard';
import { PatientPdfModal } from './components/PatientPdfModal';
import { EquiHealthUserRecord } from './types/registration';

function EquiHealthAppContent() {
  const { currentUser, isAuthenticated, logout } = useAuth();

  // Navigation view: 'home' | 'intake' | 'login' | 'dashboard'
  const [currentView, setCurrentView] = useState<TemplateNavView>('home');
  const [dashboardTab, setDashboardTab] = useState<DashboardSidebarTab>('dashboard');
  
  // EquiHealth ID to prefill on login page (e.g. from registration success)
  const [prefilledLoginId, setPrefilledLoginId] = useState<string>('');

  // PDF Modal State
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // User Profile State (Default to baseline case study)
  const [user, setUser] = useState<UserProfile>(PRESET_PERSONAS[0].data);
  const [healthcarePlan, setHealthcarePlan] = useState<PersonalizedHealthcarePlan | null>(null);
  const [, setIsEvaluating] = useState(false);

  // When active session exists or changes, sync user profile & personalized plan
  useEffect(() => {
    let isMounted = true;
    async function syncSessionData() {
      setIsEvaluating(true);
      try {
        if (currentUser) {
          const mappedUser = userService.mapRegistrationToUserProfile(currentUser, user, currentUser.equiHealthId);
          if (isMounted) setUser(mappedUser);
          const plan = await springBootApi.evaluateProfile(mappedUser);
          if (isMounted) setHealthcarePlan(plan);
        } else {
          // Default baseline persona
          const defaultUser = PRESET_PERSONAS[0].data;
          if (isMounted) setUser(defaultUser);
          const plan = await springBootApi.evaluateProfile(defaultUser);
          if (isMounted) setHealthcarePlan(plan);
        }
      } catch (e) {
        console.error('Failed to sync session data', e);
      } finally {
        if (isMounted) setIsEvaluating(false);
      }
    }

    syncSessionData();
    return () => { isMounted = false; };
  }, [currentUser]);

  // Handler when registration is completed and user clicks "Continue to Login"
  const handleContinueToLoginFromRegistration = (equiHealthId: string) => {
    setPrefilledLoginId(equiHealthId);
    setCurrentView('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler for successful login
  const handleLoginSuccess = async (userRecord: EquiHealthUserRecord) => {
    setIsEvaluating(true);
    try {
      const updatedUser = userService.mapRegistrationToUserProfile(userRecord, user, userRecord.equiHealthId);
      setUser(updatedUser);
      const plan = await springBootApi.evaluateProfile(updatedUser);
      setHealthcarePlan(plan);
      setCurrentView('dashboard');
      setDashboardTab('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      console.error('Error post-login initialization:', e);
      setCurrentView('dashboard');
      setDashboardTab('dashboard');
    } finally {
      setIsEvaluating(false);
    }
  };

  // Handler for logout action
  const handleLogout = () => {
    logout();
    setCurrentView('login');
    setPrefilledLoginId('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Template Header & Navigation */}
      <TemplateNavbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        dashboardTab={dashboardTab}
        setDashboardTab={setDashboardTab}
        userName={currentUser?.fullName || user.fullName || 'Priya Sharma'}
        equiHealthId={currentUser?.equiHealthId || user.equiHealthId}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onOpenIntake={() => {
          setCurrentView('intake');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLogin={() => {
          setCurrentView('login');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* VIEW 1: LANDING PAGE */}
        {currentView === 'home' && (
          <TemplateHome
            onGetStarted={() => {
              setCurrentView('intake');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreSchemes={() => {
              if (isAuthenticated) {
                setCurrentView('dashboard');
                setDashboardTab('schemes');
              } else {
                setCurrentView('login');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreHospitals={() => {
              if (isAuthenticated) {
                setCurrentView('dashboard');
                setDashboardTab('nearby-hospitals');
              } else {
                setCurrentView('login');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 2: MODULAR 4-STEP USER REGISTRATION FORM + REVIEW */}
        {currentView === 'intake' && (
          <RegistrationForm
            initialData={{
              basicInformation: {
                fullName: user.fullName || '',
                age: user.age ? String(user.age) : '',
                gender: user.gender || '',
                phone: user.phone || ''
              },
              geographicalInformation: {
                residentialArea: user.residentialArea === 'Rural' ? 'Rural (Village)' : user.residentialArea || '',
                state: user.state || '',
                district: user.district || '',
                cityVillage: user.cityOrVillage || ''
              },
              financialInformation: {
                annualIncome: user.annualIncomeTier === 'Low' ? 'Below ₹3 lakh' : user.annualIncomeTier === 'Medium' ? '₹3–5 lakh' : '₹5–10 lakh',
                healthInsurance: user.healthInsurance === 'No insurance' ? 'No' : 'Yes',
                employmentStatus: user.employmentStatus || ''
              },
              accessibilityInformation: {
                digitalLiteracy: user.digitalLiteracy || 'Medium',
                preferredLanguage: user.preferredLanguage || 'Hindi',
                otherLanguage: '',
                accessibilityRequirement: user.disabilities || 'None'
              }
            }}
            onContinueToLogin={handleContinueToLoginFromRegistration}
            onCancel={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 3: LOGIN PAGE (EquiHealth ID + PIN/Password + Forgot ID Recovery) */}
        {currentView === 'login' && (
          <LoginPage
            initialEquiHealthId={prefilledLoginId}
            onLoginSuccess={handleLoginSuccess}
            onNavigateToRegister={() => {
              setCurrentView('intake');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCancel={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 4: DASHBOARD & SUB-VIEWS (Protected for authenticated users) */}
        {currentView === 'dashboard' && (
          isAuthenticated ? (
            <TemplateDashboard
              user={user}
              plan={healthcarePlan}
              activeTab={dashboardTab}
              setActiveTab={setDashboardTab}
              onOpenPdfModal={() => setIsPdfModalOpen(true)}
              onModifyIntake={() => {
                setCurrentView('intake');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : (
            <div className="max-w-md mx-auto px-4 py-12 text-center space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center mx-auto">
                  <span className="text-xl font-bold">🔒</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900">Sign in required</h2>
                <p className="text-xs text-slate-600">
                  Please log in with your EquiHealth ID to view your personalized health dashboard and eligibility recommendations.
                </p>
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentView('login')}
                    className="w-full py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Go to Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentView('intake')}
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Register New Account
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </main>

      {/* Official Patient Clinical Intake & Plan PDF Modal with Print / Save as PDF */}
      {isPdfModalOpen && (
        <PatientPdfModal
          user={user}
          plan={healthcarePlan}
          onClose={() => setIsPdfModalOpen(false)}
          language="en"
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <EquiHealthAppContent />
    </AuthProvider>
  );
}
