import { useRequest } from "@/lib/api/swr";
import { emissionLimitsByIdUrl, lastMeasurementUrl } from "@/services/consts";
import { useFilterStore } from "@/store/useFilterStore";
import { EmissionLimits } from "@/types/emission-limits";
import { SensorWithLastMeasurement } from "@/types/sensor";
import { useEffect, useState } from "react";
import { gauges as initialGauges } from "@/mocks/dashboard";
import { GAUGE_REVALIDATION_INTERVAL } from "@/lib/utils";

export default function useGaugeCard() {
  const [gauges, setGauges] = useState(initialGauges);

  const { device, emissionLimit } = useFilterStore((state) => ({
    device: state.device,
    emissionLimit: state.emissionLimit,
  }));

  const { data: limitData, isLoading: limitIsLoading } =
    useRequest<EmissionLimits>(
      emissionLimit
        ? {
            url: emissionLimitsByIdUrl(emissionLimit),
          }
        : null
    );

  const { data: sensorsData, mutate: revalidateSensors } = useRequest<
    SensorWithLastMeasurement[]
  >(
    device
      ? {
          url: lastMeasurementUrl(device),
        }
      : null
  );

  useEffect(() => {
    if (!limitData) return;

    setGauges(
      initialGauges.map((gauge) => {
        // Find the limit for the gauge
        const maxLimit = limitData?.limit_history.find((limit) => {
          return limit.gas_type === gauge.id;
        });

        // If the limit exists, update the gauge with the limit and is_default set to false. Otherwise, return the default gauge.
        return maxLimit
          ? {
              ...gauge,
              limit: {
                is_default: false,
                max_limit: maxLimit.max_limit,
                gas_type: maxLimit.gas_type,
              },
            }
          : gauge;
      })
    );
  }, [limitData]);

  useEffect(() => {
    if (!sensorsData) return;

    const gapTime = Date.now() - GAUGE_REVALIDATION_INTERVAL;

    setGauges((prevGauges) =>
      prevGauges.map((gauge) => {
        const sensor = sensorsData.find((sensor) => {
          return sensor.gas_type === gauge.id;
        });

        if (sensor) {
          const measurementTime = new Date(
            sensor.last_measurement.created_at
          ).getTime();
          const value =
            measurementTime >= gapTime
              ? Number(sensor.last_measurement.value)
              : 0;
          return { ...gauge, value };
        }

        return gauge;
      })
    );
  }, [sensorsData]);

  useEffect(() => {
    const interval = setInterval(() => {
      revalidateSensors();
    }, GAUGE_REVALIDATION_INTERVAL);

    return () => clearInterval(interval);
  }, [revalidateSensors]);

  return { limitIsLoading, gauges };
}
