import { useRequest } from "@/lib/api/swr";
import { initChart } from "@/mocks/dashboard";
import { emissionLimitsByIdUrl } from "@/services/consts";
import { useFilterStore } from "@/store/useFilterStore";
import { Chart } from "@/types/dashboard";
import { EmissionLimits } from "@/types/emission-limits";
import { useEffect, useState } from "react";

export default function useChartCards() {
  const [chartData, setChartData] = useState<Chart[]>(initChart);

  const { dateFrom, dateTo, scale, device, emissionLimit, gases } =
    useFilterStore();

  const { data: emissionLimitData, isLoading: emissionLimitIsLoading } =
    useRequest<EmissionLimits>(
      emissionLimit
        ? {
            url: emissionLimitsByIdUrl(emissionLimit),
          }
        : null
    );

  useEffect(() => {
    if (!emissionLimitData) return;

    setChartData((prev) =>
      prev.map((card) => {
        const limit = emissionLimitData?.limit_history.find(
          (limit) => limit.gas_type === card.gas_type
        );

        return {
          ...card,
          max_limit: limit
            ? {
                value: Number(limit?.max_limit),
                name: emissionLimitData?.name ?? "",
              }
            : undefined,
        };
      })
    );
  }, [emissionLimitData]);

  return {
    chartData,
    gases,
    emissionLimitData,
    emissionLimitIsLoading,
  };
}
