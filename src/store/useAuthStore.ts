import { clearAuthTokenFromCookie, getAuthTokenFromCookie } from "@/lib/auth";
import { getUser } from "@/services/user";
import { Token, User } from "@/types/auth";
import { create } from "zustand";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isBrickyard: boolean;
  isInstitution: boolean;
  userType: "brickyard" | "institution" | null;
  setUser: (user: User) => void;
  verifyIsAuthenticated: () => Promise<boolean>;
  resetState: () => void;
  logOut: () => void;
}

export const authSelector = (state: AuthState): Pick<AuthState, "user"> => ({
  user: state.user,
});

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  userType: null,
  isInstitution: false,
  isBrickyard: false,
  isAuthenticated: false,
  setUser: (user: User) =>
    set({
      user,
      userType:
        user.brickyard !== null
          ? "brickyard"
          : user.institution !== null
          ? "institution"
          : null,
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
    const { resetState, setUser } = get();

    const logOut = () => {
      clearAuthTokenFromCookie();
      resetState();
    };

    if (!auth) {
      logOut();
      return false;
    }

    const tokens: Token = {
      access: auth.access_token ?? "",
      refresh: auth.refresh_token,
    };

    const { data } = await getUser(tokens.access);

    if (data) {
      setUser?.(data);
      return true;
    }

    return false;
  },
  resetState: () =>
    set({
      isAuthenticated: false,
      userType: null,
      isBrickyard: false,
      isInstitution: false,
      user: null,
    }),
  logOut: () => {
    clearAuthTokenFromCookie();
    get().resetState();
  },
}));
