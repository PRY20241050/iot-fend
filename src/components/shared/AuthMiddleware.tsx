"use client";

import { AuthState, useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const selector = (state: AuthState) => ({
  verifyIsAuthenticated: state.verifyIsAuthenticated,
  resetState: state.resetState,
});

export default function AuthMiddleware({ children }: Props) {
  const { verifyIsAuthenticated } = useAuthStore(selector);

  useEffect(() => {
    verifyIsAuthenticated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
