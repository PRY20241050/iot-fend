"use client";

import LoadingPage from "@/components/shared/loading-page";
import { Navbar } from "@/components/shared/navbar";
import { useToast } from "@/components/ui/use-toast";
import { cn, DASHBOARD_PATH, DEFAULT_ERROR } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();

  const { isBrickyard, isInstitution, errorWhileAuthentication } = useAuthStore(
    (state) => ({
      isBrickyard: state.isBrickyard,
      isInstitution: state.isInstitution,
      errorWhileAuthentication: state.errorWhileAuthentication,
    })
  );

  const { push } = useRouter();
  const { brickyardId } = useParams();

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

  if (isInstitution || errorWhileAuthentication) {
    return (
      <main>
        <Navbar className="fixed" />
        <div
          className={cn("pt-[var(--navbar-height)]", {
            "pt-[var(--navbar-height-with-subnav)]": brickyardId,
          })}
        >
          {children}
        </div>
      </main>
    );
  } else if (isBrickyard || errorWhileAuthentication) {
    push(DASHBOARD_PATH);
  } else return <LoadingPage />;
}
