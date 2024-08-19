"use client";

import LoadingPage from "@/components/shared/loading-page";
import { Navbar } from "@/components/shared/navbar";
import { useAuthStore } from "@/store/useAuthStore";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
  }));

  if (isAuthenticated) {
    return (
      <main>
        <Navbar className="fixed" />
        <div className="pt-[var(--navbar-height)]">{children}</div>
      </main>
    );
  }

  return <LoadingPage />;
}
