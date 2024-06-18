"use client";

import { useAuthStore } from "@/store/useAuthStore";
import Filter from "../shared/filter";
import Header from "../shared/Header";
import {
  BarChartIcon,
  ListBulletIcon,
  PieChartIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { LayoutPrimary } from "../layouts";
import { useState } from "react";
import { Button } from "../ui/button";
import { ChartCards, GaugeCards } from "./chart-cards";

export default function Dashboard() {
  const [isGauge, setIsGauge] = useState(true);

  const { user, isBrickyard } = useAuthStore((state) => ({
    user: state.user,
    isBrickyard: state.isBrickyard,
  }));

  const { push } = useRouter();

  return (
    <LayoutPrimary className="flex gap-6">
      <div className="flex-grow">
        <Header
          showTitle={isBrickyard}
          title={`Ladrillera ${user?.brickyard?.name ?? "Sin nombre"}`}
          btnAction={() => {
            push("/historial");
          }}
          btnIcon={<ListBulletIcon className="h-4 w-4 mr-2" />}
          btnLabel="Ver historial"
        >
          <Button
            onClick={() => setIsGauge((state) => !state)}
            variant="outline"
            className="ml-auto"
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
        <div className="grid grid-cols-2 gap-6 my-4">
          {isGauge ? <GaugeCards /> : <ChartCards />}
        </div>
      </div>
      <Filter isGauge={isGauge} />
    </LayoutPrimary>
  );
}
