import { useRequest } from "@/lib/api/swr";
import { DEVICES_URL, EMISSION_LIMITS_URL } from "@/services/consts";
import { useFilterStore } from "@/store/useFilterStore";
import { EmissionsLimit } from "@/types/emissions-limit";
import { SensorWithLastMeasurement } from "@/types/sensor";
import { useCallback, useEffect, useState } from "react";
import { gauges as initialGauges } from "@/mocks/dashboard";
import { GAUGE_REVALIDATION_INTERVAL } from "@/lib/utils";

export default function useGaugeCard() {
  const [gauges, setGauges] = useState(initialGauges);

  const { device, emissionLimit } = useFilterStore((state) => ({
    device: state.device,
    emissionLimit: state.emissionLimit,
  }));

  const { data: limitData, isLoading: limitIsLoading } =
    useRequest<EmissionsLimit>(
      emissionLimit
        ? {
            url: `${EMISSION_LIMITS_URL}/${emissionLimit}`,
          }
        : null
    );

  const { data: sensorsData, mutate: revalidateSensors } = useRequest<
    SensorWithLastMeasurement[]
  >(
    device
      ? {
          url: `${DEVICES_URL}/${device}/sensors/last_measurements/`,
        }
      : null
  );

  const updateGaugesWithLimitData = useCallback(() => {
    if (!limitData) return;

    setGauges(
      initialGauges.map((gauge) => {
        const limit = limitData?.limit_history.find((limit) => {
          return limit.gas_type === gauge.id;
        });
        return limit ? { ...gauge, limit } : gauge;
      })
    );
  }, [limitData]);

  const updateGaugesWithSensorData = useCallback(() => {
    if (!sensorsData) return;

    const twoMinutesAgo = Date.now() - GAUGE_REVALIDATION_INTERVAL;

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
            measurementTime >= twoMinutesAgo
              ? Number(sensor.last_measurement.value)
              : 0;
          return { ...gauge, value };
        }

        return gauge;
      })
    );
  }, [sensorsData]);

  useEffect(() => {
    updateGaugesWithLimitData();
  }, [updateGaugesWithLimitData]);

  useEffect(() => {
    updateGaugesWithSensorData();
  }, [updateGaugesWithSensorData]);

  useEffect(() => {
    const interval = setInterval(() => {
      revalidateSensors();
    }, GAUGE_REVALIDATION_INTERVAL);

    return () => clearInterval(interval);
  }, [revalidateSensors]);

  return { limitIsLoading, gauges };
}
