import { MeasurementWithDevice } from "@/types/measurement";
import { PaginationResponse } from "@/types/models";
import { MEASUREMENTS_URL } from "./consts";
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
}: GetMeasurementsWithDeviceParams): Promise<
  PaginationResponse<MeasurementWithDevice>
> => {
  return await fetcher<PaginationResponse<MeasurementWithDevice>>({
    url: `${MEASUREMENTS_URL}/paginated/`,
    params: {
      page,
      group_by: scale,
      brickyard_ids: brickyardsIds?.join(","),
      start_date: dateFrom,
      end_date: dateTo,
      ...(device && { device_id: device }),
      ...(gases && gases.length > 0 && { gas_types: gases.join(",") }),
    },
  });
};
