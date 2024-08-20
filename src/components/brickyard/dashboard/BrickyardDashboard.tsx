"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Filter, Header } from "@/components/shared";
import { BarChartIcon, PieChartIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LayoutPrimary } from "@/components/layouts";
import { useMemo, useState } from "react";
import { ChartCards } from "./chart-cards";
import { GaugeCards } from "./gauge-cards";
import { useRequest } from "@/lib/api/swr";
import { brickyardByIdUrl } from "@/services/consts";
import { Brickyard } from "@/types/brickyard";
import { GaugeContext, UserTypeContext } from "@/components/shared/context";
import { stringToBoolean } from "@/lib/helpers/string";

interface Props {
  brickyardId?: string;
  institution?: boolean;
}

export default function BrickyardDashboard({
  brickyardId,
  institution = false,
}: Props) {
  const { brickyardName, isGauge, toggleGauge } = useBrickyardDashboard({
    brickyardId,
    institution,
  });

  const userTypeValue = useMemo(
    () => ({ brickyardId, institution }),
    [brickyardId, institution]
  );
  const gaugeValue = useMemo(() => ({ isGauge }), [isGauge]);

  return (
    <UserTypeContext.Provider value={userTypeValue}>
      <GaugeContext.Provider value={gaugeValue}>
        <LayoutPrimary className="tablet-lg:flex tablet-lg:gap-6">
          <div className="flex-grow">
            <Header
              title={brickyardName ? `Ladrillera ${brickyardName}` : ""}
              btnAction={toggleGauge}
              btnIcon={
                isGauge ? (
                  <BarChartIcon className="h-4 w-4 mr-2" />
                ) : (
                  <PieChartIcon className="h-4 w-4 mr-2" />
                )
              }
              btnLabel={isGauge ? "Ver histograma" : "Ver medidores"}
            />
            {isGauge ? <GaugeCards /> : <ChartCards />}
          </div>
          <Filter />
        </LayoutPrimary>
      </GaugeContext.Provider>
    </UserTypeContext.Provider>
  );
}

function useBrickyardDashboard({ brickyardId, institution }: Props) {
  const params = useSearchParams();
  const [isGauge, setIsGauge] = useState(
    stringToBoolean(params.get("gauge") ?? "true")
  );

  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));

  const { data } = useRequest<Brickyard>(
    brickyardId
      ? {
          url: brickyardByIdUrl(brickyardId),
        }
      : null
  );

  const { replace } = useRouter();
  const pathname = usePathname();

  const toggleGauge = () => {
    replace(`${pathname}?gauge=${!isGauge}`);
    setIsGauge((state) => !state);
  };

  const brickyardName = institution ? data?.name : user?.brickyard?.name;

  return {
    brickyardName,
    isGauge,
    toggleGauge,
  };
}
