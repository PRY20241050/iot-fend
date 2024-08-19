"use client";

import { EmissionsLimitAdd } from "@/components/emissions-limit";
import { LIMITE_EMISIONES_PATH } from "@/lib/utils";
import { getEmissionLimits } from "@/services/emission-limits";
import { useAuthStore } from "@/store/useAuthStore";
import { EmissionLimits } from "@/types/emission-limits";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LimiteEmisionesEditPage() {
  const { slug } = useParams();

  const [emissionLimit, setEmissionLimit] = useState<
    EmissionLimits | undefined
  >();

  if (!/^\d+$/.test(slug as string)) {
    redirect(LIMITE_EMISIONES_PATH);
  }

  const { user, isBrickyard, isInstitution } = useAuthStore((state) => ({
    user: state.user,
    isBrickyard: state.isBrickyard,
    isInstitution: state.isInstitution,
  }));

  useEffect(() => {
    if (!user) {
      return;
    }

    getEmissionLimits({
      ...(isBrickyard && {
        brickyard_id: user.brickyard?.id,
      }),
      ...(isInstitution && {
        institution_id: user.institution?.id,
      }),
      id: Number(slug),
    })
      .then((res) => {
        if (res.length === 0) redirect(LIMITE_EMISIONES_PATH);
        setEmissionLimit(res[0]);
      })
      .catch(() => {
        console.error("Error fetching emission limit");
      });
  }, [user, isBrickyard, slug, isInstitution]);

  return <EmissionsLimitAdd initialData={emissionLimit} />;
}
