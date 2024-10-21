"use client";

import LoadingPage from "@/components/shared/loading-page";
import { Navbar } from "@/components/shared/navbar";
import { cn, DASHBOARD_PATH } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useParams, useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isBrickyard, isInstitution, errorWhileAuthentication } = useAuthStore(
    (state) => ({
      isBrickyard: state.isBrickyard,
      isInstitution: state.isInstitution,
      errorWhileAuthentication: state.errorWhileAuthentication,
    })
  );

  const { push } = useRouter();
  const { brickyardId } = useParams();

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
