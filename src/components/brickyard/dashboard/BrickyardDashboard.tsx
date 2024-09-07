"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Filter, Header } from "@/components/shared";
import { useParams } from "next/navigation";
import { LayoutPrimary } from "@/components/layouts";
import { GaugeCards } from "./gauge-cards";
import { useRequest } from "@/lib/api/swr";
import { brickyardByIdUrl } from "@/services/consts";
import { Brickyard } from "@/types/brickyard";

export default function BrickyardDashboard() {
  const { brickyardName } = useBrickyardDashboard();

  return (
    <LayoutPrimary className="tablet-lg:flex tablet-lg:gap-6">
      <div className="flex-grow">
        <Header
          title={brickyardName && `Ladrillera ${brickyardName}`}
          hideBtn
        />
        <GaugeCards />
      </div>
      <Filter />
    </LayoutPrimary>
  );
}

function useBrickyardDashboard() {
  const { brickyardId } = useParams();

  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));

  const { data } = useRequest<Brickyard>(
    brickyardId
      ? {
          url: brickyardByIdUrl(String(brickyardId)),
        }
      : null
  );

  const brickyardName = brickyardId ? data?.name : user?.brickyard?.name;

  return {
    brickyardId,
    brickyardName,
  };
}
