import { useRequest } from "@/lib/api/swr";
import { emissionLimitsByIdUrl, lastMeasurementUrl } from "@/services/consts";
import { useFilterStore } from "@/store/useFilterStore";
import { EmissionLimits } from "@/types/emission-limits";
import { SensorWithLastMeasurement } from "@/types/sensor";
import { useEffect, useState } from "react";
import { gauges as initialGauges } from "@/mocks/dashboard";
import { REVALIDATION_INTERVAL_IN_MILISECONDS } from "@/lib/utils";

export default function useGaugeCards() {
  const [gauges, setGauges] = useState(initialGauges);
  const [updateCount, setUpdateCount] = useState(0);

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

    setGauges((prevGauges) =>
      prevGauges.map((gauge) => {
        const sensor = sensorsData.find((sensor) => {
          return sensor.gas_type === gauge.id;
        });

        if (sensor) {
          const measurementTime = new Date(
            sensor.last_measurement.created_at
          ).getTime();
          const gapTime = Date.now() - measurementTime;

          const value =
            gapTime < REVALIDATION_INTERVAL_IN_MILISECONDS
              ? Number(sensor.last_measurement.value)
              : null;
          return { ...gauge, value };
        }

        return {
          ...gauge,
          value: null,
        };
      })
    );
  }, [sensorsData, updateCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      revalidateSensors().finally(() => {
        setUpdateCount((count) => count + 1);
      });
    }, REVALIDATION_INTERVAL_IN_MILISECONDS);

    return () => clearInterval(interval);
  }, [revalidateSensors]);

  return { limitIsLoading, gauges };
}
