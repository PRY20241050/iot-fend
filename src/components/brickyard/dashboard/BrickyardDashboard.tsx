"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Filter, Header } from "@/components/shared";
import {
  BarChartIcon,
  ListBulletIcon,
  PieChartIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { LayoutPrimary } from "@/components/layouts";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChartCards } from "./chart-cards";
import { GaugeCards } from "./gauge-cards";
import { GaugeLegend } from "./gauge-cards/GaugeCard";
import { useRequest } from "@/lib/api/swr";
import { brickyardByIdUrl } from "@/services/consts";
import { Brickyard } from "@/types/brickyard";
import { HISTORIAL_PATH, historialBrickyardPath } from "@/lib/utils";
import { UserTypeContext } from "@/components/shared/context";

interface Props {
  brickyardId?: string;
  institution?: boolean;
}

export default function BrickyardDashboard({
  brickyardId,
  institution = false,
}: Props) {
  const { brickyardName, goToHistory, isGauge, setIsGauge } =
    useBrickyardDashboard({ brickyardId, institution });

  return (
    <UserTypeContext.Provider value={{ brickyardId, institution }}>
      <LayoutPrimary className="tablet-lg:flex tablet-lg:gap-6">
        <div className="flex-grow">
          <Header
            title={brickyardName ? `Ladrillera ${brickyardName}` : ""}
            btnAction={goToHistory}
            btnIcon={<ListBulletIcon className="h-4 w-4 mr-2" />}
            btnLabel="Ver historial"
          >
            <Button
              onClick={() => setIsGauge((state) => !state)}
              variant="outline"
              className="phone-xl:ml-auto"
            >
              {isGauge ? (
                <>
                  <BarChartIcon className="h-4 w-4 mr-2" /> Ver histograma
                </>
              ) : (
                <>
                  <PieChartIcon className="h-4 w-4 mr-2" /> Ver medidores
                </>
              )}
            </Button>
          </Header>
          {isGauge && <GaugeLegend />}
          <div className="grid phone-xl:grid-cols-2 gap-6 my-4">
            {isGauge ? <GaugeCards /> : <ChartCards />}
          </div>
        </div>
        <Filter isGauge={isGauge} />
      </LayoutPrimary>
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

  const { push } = useRouter();

  const brickyardName = institution ? data?.name : user?.brickyard?.name;
  const goToHistory = () => {
    if (brickyardId) return push(historialBrickyardPath(brickyardId));
    return push(HISTORIAL_PATH);
  };

  return {
    brickyardName,
    isGauge,
    setIsGauge,
    goToHistory,
  };
}
