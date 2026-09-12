import { EquiHealthUserRecord } from '../types/registration';
import { userService } from './userService';

const STORAGE_SESSION_KEY = 'equihealth_auth_session';

export interface AuthSession {
  equiHealthId: string;
  user: EquiHealthUserRecord;
  loggedInAt: string;
}

export interface AuthResult {
  success: boolean;
  message: string;
  user?: EquiHealthUserRecord;
}

/**
 * Authentication Service
 * Manages user authentication, session state in localStorage, and prototype login/logout.
 * Ready for future Spring Security (POST /api/auth/login) JWT integration.
 */
export const authService = {
  /**
   * Log in user with EquiHealth ID and PIN / Password
   */
  async login(equiHealthId: string, pin: string): Promise<AuthResult> {
    if (!equiHealthId || !equiHealthId.trim()) {
      return {
        success: false,
        message: 'Please enter your EquiHealth ID.'
      };
    }

    const cleanId = equiHealthId.trim().toUpperCase();

    // Verify format looks like EQH-XXXX-XXXX
    const idFormatRegex = /^EQH-[A-Z0-9]{4}-[A-Z0-9]{4}$/i;
    if (!idFormatRegex.test(cleanId)) {
      return {
        success: false,
        message: 'Invalid ID format. EquiHealth IDs follow the format EQH-XXXX-XXXX (e.g. EQH-7K42-91M8).'
      };
    }

    if (!pin || pin.trim().length < 4) {
      return {
        success: false,
        message: 'Please enter your 4-digit PIN or password.'
      };
    }

    // Look up user in localStorage
    const user = userService.getUserByEquiHealthId(cleanId);

    if (!user) {
      return {
        success: false,
        message: `No account found with EquiHealth ID "${cleanId}". Please check the ID or sign up for a new account.`
      };
    }

    // Check PIN (if user has a set PIN, compare; if default or matching, succeed)
    if (user.pin && user.pin !== pin.trim()) {
      // If entered pin isn't matching, check if it's prototype default '1234' or saved pin
      return {
        success: false,
        message: 'Incorrect PIN / Password. Please try again or recover your ID.'
      };
    }

    // Create session
    const session: AuthSession = {
      equiHealthId: user.equiHealthId,
      user,
      loggedInAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
    } catch (e) {
      console.warn('Failed to persist auth session', e);
    }

    return {
      success: true,
      message: 'Login successful!',
      user
    };
  },

  /**
   * Get currently authenticated session
   */
  getCurrentSession(): AuthSession | null {
    try {
      const data = localStorage.getItem(STORAGE_SESSION_KEY);
      if (data) {
        return JSON.parse(data) as AuthSession;
      }
    } catch (e) {
      console.warn('Failed to parse auth session', e);
    }
    return null;
  },

  /**
   * Check if a valid session exists
   */
  isAuthenticated(): boolean {
    return this.getCurrentSession() !== null;
  },

  /**
   * Log out user: clears the active session from localStorage.
   * NOTE: Never deletes registered users from localStorage.
   */
  logout(): void {
    try {
      localStorage.removeItem(STORAGE_SESSION_KEY);
    } catch (e) {
      console.warn('Failed to clear auth session', e);
    }
  },

  /**
   * Look up EquiHealth ID using registered phone number
   */
  recoverEquiHealthId(phone: string): { found: boolean; equiHealthId?: string; fullName?: string; message?: string } {
    if (!phone || phone.trim().length < 5) {
      return {
        found: false,
        message: 'Please enter a valid phone number.'
      };
    }

    const matchedUser = userService.getUserByPhone(phone);
    if (!matchedUser) {
      return {
        found: false,
        message: 'No registered EquiHealth account found with this phone number.'
      };
    }

    return {
      found: true,
      equiHealthId: matchedUser.equiHealthId,
      fullName: matchedUser.basicInformation.fullName
    };
  }
};
