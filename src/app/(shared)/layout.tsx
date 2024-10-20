"use client";

import LoadingPage from "@/components/shared/loading-page";
import { Navbar } from "@/components/shared/navbar";
import { useToast } from "@/components/ui/use-toast";
import { DEFAULT_ERROR } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();

  const { isAuthenticated, errorWhileAuthentication } = useAuthStore(
    (state) => ({
      isAuthenticated: state.isAuthenticated,
      errorWhileAuthentication: state.errorWhileAuthentication,
    })
  );

  useEffect(() => {
    if (errorWhileAuthentication) {
      toast({
        variant: "destructive",
        title: DEFAULT_ERROR.header,
        description: DEFAULT_ERROR.server,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorWhileAuthentication]);

  if (isAuthenticated || errorWhileAuthentication) {
    return (
      <main>
        <Navbar className="fixed" />
        <div className="pt-[var(--navbar-height)]">{children}</div>
      </main>
    );
  }

  return <LoadingPage />;
}
