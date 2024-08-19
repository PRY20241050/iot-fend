"use client";

import LoadingPage from "@/components/shared/loading-page";
import { Navbar } from "@/components/shared/navbar";
import { cn, DASHBOARD_PATH } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useParams, useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isBrickyard, isInstitution } = useAuthStore((state) => ({
    isBrickyard: state.isBrickyard,
    isInstitution: state.isInstitution,
  }));

  const { push } = useRouter();
  const { id } = useParams();

  if (isBrickyard) {
    push(DASHBOARD_PATH);
  }

  if (isInstitution) {
    return (
      <main>
        <Navbar className="fixed" />
        <div
          className={cn("pt-[var(--navbar-height)]", {
            "pt-[var(--navbar-height-with-subnav)]": id,
          })}
        >
          {children}
        </div>
      </main>
    );
  }

  return <LoadingPage />;
}
