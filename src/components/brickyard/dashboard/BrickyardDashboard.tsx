"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Filter, Header } from "@/components/shared";
import { BarChartIcon, PieChartIcon } from "@radix-ui/react-icons";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { LayoutPrimary } from "@/components/layouts";
import { useMemo, useState } from "react";
import { ChartCards } from "./chart-cards";
import { GaugeCards } from "./gauge-cards";
import { useRequest } from "@/lib/api/swr";
import { brickyardByIdUrl } from "@/services/consts";
import { Brickyard } from "@/types/brickyard";
import { GaugeContext } from "@/components/shared/context";
import { stringToBoolean } from "@/lib/helpers/string";

export default function BrickyardDashboard() {
  const { brickyardName, isGauge, toggleGauge } = useBrickyardDashboard();

  const gaugeValue = useMemo(() => ({ isGauge }), [isGauge]);

  return (
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
  );
}

function useBrickyardDashboard() {
  const { brickyardId } = useParams();
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
          url: brickyardByIdUrl(String(brickyardId)),
        }
      : null                                                                                                                                                                                                                                                                                                                                                                                                                           
  );

  const { replace } = useRouter();
  const pathname = usePathname();

  const toggleGauge = () => {
    replace(`${pathname}?gauge=${!isGauge}`);
    setIsGauge((state) => !state);
  };

  const brickyardName = brickyardId ? data?.name : user?.brickyard?.name;

  return {
    brickyardId,
    brickyardName,
    isGauge,
    toggleGauge,
  };
}
