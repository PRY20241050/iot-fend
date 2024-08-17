"use client";

import LoadingPage from "@/components/shared/loading-page";
import { Navbar } from "@/components/shared/navbar";
import { DASHBOARD_PATH } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isBrickyard, isInstitution } = useAuthStore((state) => ({
    isBrickyard: state.isBrickyard,
    isInstitution: state.isInstitution,
  }));

  const { push } = useRouter();

  if (isBrickyard) {
    push(DASHBOARD_PATH);
  }

  if (isInstitution) {
    return (
      <main>
        <Navbar className="fixed" />
        <div className="pt-16">{children}</div>
      </main>
    );
  }

  return <LoadingPage />;
}