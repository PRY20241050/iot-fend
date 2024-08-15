"use client";

import { EmissionsLimitAdd } from "@/components/emissions-limit";
import { getEmissionLimitsByBrickyardId } from "@/services/emission-limits";
import { useAuthStore } from "@/store/useAuthStore";
import { EmissionLimits } from "@/types/emission-limits";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LimiteEmisionesEditPage() {
  const { id } = useParams();

  const [emissionLimit, setEmissionLimit] = useState<
    EmissionLimits | undefined
  >();

  if (!/^\d+$/.test(id as string)) {
    redirect("/limite-emisiones");
  }

  const { user, isBrickyard } = useAuthStore((state) => ({
    user: state.user,
    isBrickyard: state.isBrickyard,
  }));

  useEffect(() => {
    if (!user) {
      return;
    }

    if (isBrickyard) {
      getEmissionLimitsByBrickyardId({
        brickyard_id: user.brickyard?.id,
      })
        .then((res) => {
          setEmissionLimit((prev) =>
            res.find((limit) => limit.id === Number(id))
          );
        })
        .catch(() => {
          console.error("Error fetching emission limit");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isBrickyard, id]);

  return <EmissionsLimitAdd initialData={emissionLimit} />;
}
