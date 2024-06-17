import { useRequest } from "@/lib/api/swr";
import { EMISSION_LIMITS_URL } from "@/services/consts";
import { EmissionsLimit } from "@/types/emissions-limit";
import { useEffect } from "react";
import { ChartCard, GaugeCard } from "../chart-card";
import { charts, gauges } from "@/mocks/dashboard";

const skeletonItems = [...Array.from({ length: 4 }, (_, i) => i)];

export function ChartCards() {
  return (
    <>
      {charts.map((chart, index) => (
        <ChartCard key={chart.id} index={index} {...chart} />
      ))}
    </>
  );
}

export function GaugeCards() {
  const { data, error, isLoading } = useRequest<EmissionsLimit[]>({
    url: EMISSION_LIMITS_URL,
    params: {
      is_institution: 1,
      is_default: 1,
    },
  });

  useEffect(() => {
    if (data) {
      gauges.forEach((gauge) => {
        const limit = data[0].limit_history.find((limit) => {
          return limit.gas_type === gauge.id;
        });
        if (limit) {
          gauge.limit = limit;
        }
      });
    }
  }, [data]);

  return (
    <>
      {isLoading
        ? skeletonItems.map((_, index) => <GaugeCard.Sk key={index} />)
        : gauges.map((gauge, index) => (
            <GaugeCard key={gauge.id} index={index} {...gauge} />
          ))}
    </>
  );
}
