import { MeasurementWithDevice } from "@/types/measurement";
import { PaginationResponse } from "@/types/models";
import { MEASUREMENTS_HISTORY_URL } from "./consts";
import { fetcher } from "@/lib/api/api";
import { FilterStoreValues } from "@/store/useFilterStore";

export type GetMeasurementsWithDeviceParams = Omit<
  FilterStoreValues,
  "gases"
> & {
  page?: number;
  paginated?: boolean;
  gases?: number[];
  brickyardsIds?: number[];
};

export const getMeasurementsWithDevice = async ({
  page,
  brickyardsIds,
  gases,
  dateFrom,
  dateTo,
  scale,
  device,
  emissionLimit,
  paginated = true,
}: GetMeasurementsWithDeviceParams): Promise<
  PaginationResponse<MeasurementWithDevice>
> => {
  return await fetcher<PaginationResponse<MeasurementWithDevice>>({
    url: MEASUREMENTS_HISTORY_URL,
    params: {
      page,
      ...(scale && { group_by: scale }),
      brickyard_ids: brickyardsIds?.join(","),
      start_date: dateFrom,
      end_date: dateTo,
      paginated,
      ...(device && { device_id: device }),
      ...(gases && gases.length > 0 && { gas_types: gases.join(",") }),
      ...(emissionLimit && { by_emission_limit_id: emissionLimit }),
    },
  });
};
