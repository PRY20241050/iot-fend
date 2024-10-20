import { clearAuthTokenFromCookie, getAuthTokenFromCookie } from "@/lib/auth";
import { getUser } from "@/services/user";
import { Token, User } from "@/types/auth";
import { create } from "zustand";

export interface AuthStateValues {
  user: User | null;
  isAuthenticated: boolean;
  isBrickyard: boolean;
  isInstitution: boolean;
  errorWhileAuthentication: boolean;
}

export interface AuthStateActions {
  setUser: (user: User) => void;
  verifyIsAuthenticated: () => Promise<boolean>;
  resetState: () => void;
  logOut: () => void;
}

interface AuthState extends AuthStateValues, AuthStateActions {}

export const authSelector = (state: AuthState): Pick<AuthState, "user"> => ({
  user: state.user,
});

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isInstitution: false,
  isBrickyard: false,
  isAuthenticated: false,
  errorWhileAuthentication: false,
  setUser: (user: User) =>
    set({
      user,
      isAuthenticated: true,
      isBrickyard: user.brickyard !== null,
      isInstitution: user.institution !== null,
    }),
  /**
   * Verifies if the user is authenticated by checking if the access token is valid
   * This method executes before hydrating the state
   * @returns boolean
   */
  verifyIsAuthenticated: async () => {
    const auth = getAuthTokenFromCookie();
    const { logOut, setUser } = get();

    if (!auth) {
      logOut();
      return false;
    }

    const tokens: Token = {
      access: auth.access_token ?? "",
      refresh: auth.refresh_token,
    };

    const { data, error } = await getUser(tokens.access);

    if (data) {
      setUser?.(data);
      return true;
    }

    if (error) {
      set({
        errorWhileAuthentication: true,
      });
    }

    return false;
  },
  resetState: () =>
    set({
      isAuthenticated: false,
      isBrickyard: false,
      isInstitution: false,
      user: null,
    }),
  logOut: () => {
    clearAuthTokenFromCookie();
    get().resetState();
  },
}));
