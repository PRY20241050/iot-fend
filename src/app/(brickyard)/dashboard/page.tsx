"use client";

import {
  BrickyardDashboard,
  InstitutionDashboard,
} from "@/components/dashboard";
import LoadingPage from "@/components/shared/loading-page";
import { useAuthStore } from "@/store/useAuthStore";

export default function DashboardPage() {
  const { user, isBrickyard, isInstitution } = useAuthStore((state) => ({
    user: state.user,
    isBrickyard: state.isBrickyard,
    isInstitution: state.isInstitution,
  }));

  if (!user) {
    return <LoadingPage />;
  }

  if (isBrickyard) {
    return <BrickyardDashboard />;
  }

  if (isInstitution) {
    return <InstitutionDashboard />;
  }

  return null;
}
