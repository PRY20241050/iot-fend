"use client";

import { AuthState, useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const selector = (state: AuthState) => ({
  verifyIsAuthenticated: state.verifyIsAuthenticated,
  resetState: state.resetState,
});

export default function AuthMiddleware({ children }: Props) {
  const [isHydrated, setIsHydrated] = useState(false);
  const { verifyIsAuthenticated } = useAuthStore(selector);

  useEffect(() => {
    if (!isHydrated) {
      verifyIsAuthenticated()
      setIsHydrated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated]);

  return <>{children}</>;
}
