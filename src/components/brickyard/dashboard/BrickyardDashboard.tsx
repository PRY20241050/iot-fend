"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Filter, Header } from "@/components/shared";
import { BarChartIcon, PieChartIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import { LayoutPrimary } from "@/components/layouts";
import { useState } from "react";
import { ChartCards } from "./chart-cards";
import { GaugeCards } from "./gauge-cards";
import { GaugeLegend } from "./gauge-cards/GaugeCard";
import { useRequest } from "@/lib/api/swr";
import { brickyardByIdUrl } from "@/services/consts";
import { Brickyard } from "@/types/brickyard";
import { GaugeContext, UserTypeContext } from "@/components/shared/context";

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

  return (
    <UserTypeContext.Provider value={{ brickyardId, institution }}>
      <GaugeContext.Provider value={{ isGauge }}>
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
            {isGauge && <GaugeLegend />}
            <div className="grid phone-xl:grid-cols-2 gap-6 my-4">
              {isGauge ? <GaugeCards /> : <ChartCards />}
            </div>
          </div>
          <Filter />
        </LayoutPrimary>
      </GaugeContext.Provider>
    </UserTypeContext.Provider>
  );
}

function useBrickyardDashboard({ brickyardId, institution }: Props) {
  const [isGauge, setIsGauge] = useState(true);

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
