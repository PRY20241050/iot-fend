import { useRequest } from "@/lib/api/swr";
import { DEVICES_URL, EMISSION_LIMITS_URL } from "@/services/consts";
import { useFilterStore } from "@/store/useFilterStore";
import { EmissionsLimit } from "@/types/emissions-limit";
import { SensorWithLastMeasurement } from "@/types/sensor";
import { useEffect, useState } from "react";
import { gauges as initialGauges } from "@/mocks/dashboard";

// 2 minutes (1000 * 60 * 2)
const REVALIDATION_INTERVAL = 120000;

export default function useGaugeCard() {
  const { device } = useFilterStore((state) => ({
    device: state.device,
  }));

  const { data: limitsData, isLoading: limitsIsLoading } = useRequest<
    EmissionsLimit[]
  >({
    url: EMISSION_LIMITS_URL,
    params: {
      is_institution: 1,
      is_default: 1,
    },
  });

  // TODO: 100 is a device that I don't spect to exist (refactor this later)
  const { data: sensorsData, mutate: revalidateSensors } = useRequest<
    SensorWithLastMeasurement[]
  >({
    url: `${DEVICES_URL}/${device ?? 100}/sensors/last_measurements/`,
  });

  const [gauges, setGauges] = useState(initialGauges);

  useEffect(() => {
    if (limitsData) {
      setGauges((prevGauges) =>
        prevGauges.map((gauge) => {
          const limit = limitsData[0].limit_history.find((limit) => {
            return limit.gas_type === gauge.id;
          });
          return limit ? { ...gauge, limit } : gauge;
        })
      );
    }
  }, [limitsData]);

  useEffect(() => {
    if (sensorsData) {
      const twoMinutesAgo = Date.now() - REVALIDATION_INTERVAL;
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
    }
  }, [sensorsData, device]);

  useEffect(() => {
    const interval = setInterval(() => {
      revalidateSensors();
    }, REVALIDATION_INTERVAL);

    return () => clearInterval(interval);
  }, [revalidateSensors]);

  return { limitsIsLoading, gauges };
}
