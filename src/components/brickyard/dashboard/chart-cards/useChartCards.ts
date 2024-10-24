import { useRequest } from "@/lib/api/swr";
import { formatDateToTimeforChart } from "@/lib/helpers/date";
import { initChart } from "@/mocks/dashboard";
import {
  emissionLimitsByIdUrl,
  MEASUREMENTS_HISTORY_GROUPED_BY_GAS_URL,
} from "@/services/consts";
import { useAuthStore } from "@/store/useAuthStore";
import { useFilterStore } from "@/store/useFilterStore";
import { Chart, ChartAPI } from "@/types/dashboard";
import { EmissionLimits } from "@/types/emission-limits";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useChartCards() {
  const [chartData, setChartData] = useState<Chart[]>(initChart);

  const { dateFrom, dateTo, scale, device, emissionLimit, gases } =
    useFilterStore();

  const { brickyardId } = useParams();

  const { isBrickyard, user } = useAuthStore((state) => ({
    isBrickyard: state.isBrickyard,
    user: state.user,
  }));

  const { data: emissionLimitData, isLoading: emissionLimitIsLoading } =
    useRequest<EmissionLimits>(
      emissionLimit
        ? {
            url: emissionLimitsByIdUrl(emissionLimit),
          }
        : null
    );

  const {
    data: chartAPIData,
    isLoading: chartAPIDataIsLoading,
    error: chartAPIError,
  } = useRequest<ChartAPI[]>(
    isBrickyard || brickyardId
      ? {
          url: MEASUREMENTS_HISTORY_GROUPED_BY_GAS_URL,
          params: {
            brickyard_ids: isBrickyard ? user?.brickyard?.id : brickyardId,
            limit: 100,
            ...(dateFrom && { start_date: dateFrom }),
            ...(dateTo && { end_date: dateTo }),
            ...(device && { device_id: device }),
            ...(scale && { group_by: scale }),
            order_by: "gas_type,-date",
          },
        }
      : null
  );

  useEffect(() => {
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

  useEffect(() => {
    if (!chartAPIData) {
      if (chartAPIError) {
        setChartData((prev) => initChart);
      }
      return;
    }

    setChartData((prev) =>
      prev.map((card) => {
        const measurementGroupedByGas = chartAPIData.find(
          (data) => data.gas_type === card.gas_type
        );

        const { measurements, min, max, avg } = measurementGroupedByGas || {};

        return {
          gas_type: card.gas_type,
          title: card.title,
          measurements: measurements
            ?.map((measurement) => ({
              ...measurement,
              date: formatDateToTimeforChart(
                measurement.date,
                "America/Lima",
                scale ? (scale as any) : "second"
              ),
            }))
            .reverse(),
          min: min ? Number(min).toFixed(3) : undefined,
          max: max ? Number(max).toFixed(3) : undefined,
          avg: avg ? Number(avg).toFixed(3) : undefined,
          max_limit: card.max_limit,
        };
      })
    );
  }, [chartAPIData, scale, chartAPIError]);

  return {
    chartData,
    gases,
    emissionLimitData,
    emissionLimitIsLoading,
    chartAPIDataIsLoading,
  };
}
