"use client";

import LoadingPage from "@/components/shared/loading-page";
import { Navbar } from "@/components/shared/navbar";
import { HOME_PATH } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isBrickyard, isInstitution, errorWhileAuthentication } = useAuthStore(
    (state) => ({
      isBrickyard: state.isBrickyard,
      isInstitution: state.isInstitution,
      errorWhileAuthentication: state.errorWhileAuthentication,
    })
  );

  const { push } = useRouter();

  return (
    <main>
      <Navbar className="fixed" />
      <div className="pt-[var(--navbar-height)]">{children}</div>
    </main>
  );

  if (isBrickyard || errorWhileAuthentication) {
    return (
      <main>
        <Navbar className="fixed" />
        <div className="pt-[var(--navbar-height)]">{children}</div>
      </main>
    );
  } else if (isInstitution || errorWhileAuthentication) {
    push(HOME_PATH);
  } else return <LoadingPage />;
}
