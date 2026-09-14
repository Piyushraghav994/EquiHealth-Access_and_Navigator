import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LogoutButtonProps {
  onLogoutSuccess?: () => void;
  className?: string;
  variant?: 'nav' | 'button';
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  onLogoutSuccess,
  className = '',
  variant = 'nav'
}) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    if (onLogoutSuccess) {
      onLogoutSuccess();
    }
  };

  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={handleLogout}
        className={`px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 ${className}`}
        title="Sign out of EquiHealth session"
      >
        <LogOut className="w-3.5 h-3.5 text-slate-500" />
        <span>Logout</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={`text-slate-500 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium ${className}`}
      title="Sign out of your session"
    >
      <LogOut className="w-4 h-4 text-slate-500" />
      <span className="hidden sm:inline">Logout</span>
    </button>
  );
};
