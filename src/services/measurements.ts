import { MeasurementWithDevice } from "@/types/measurement";
import { PaginationResponse } from "@/types/models";
import { MEASUREMENTS_PAGINATED_URL } from "./consts";
import { fetcher } from "@/lib/api/api";
import { FilterStoreValues } from "@/store/useFilterStore";

export type GetMeasurementsWithDeviceParams = Omit<
  FilterStoreValues,
  "gases"
> & {
  page?: number;
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
}: GetMeasurementsWithDeviceParams): Promise<
  PaginationResponse<MeasurementWithDevice>
> => {
  return await fetcher<PaginationResponse<MeasurementWithDevice>>({
    url: MEASUREMENTS_PAGINATED_URL,
    params: {
      page,
      ...(scale && { group_by: scale }),
      brickyard_ids: brickyardsIds?.join(","),
      start_date: dateFrom,
      end_date: dateTo,
      ...(device && { device_id: device }),
      ...(gases && gases.length > 0 && { gas_types: gases.join(",") }),
      ...(emissionLimit && { by_emission_limit_id: emissionLimit }),
    },
  });
};
