import { destroy, fetcher } from "@/lib/api/api";
import { PaginationResponse } from "@/types/models";
import {
  emissionLimitsByBrickyardIdUrl,
  emissionLimitsByIdUrl,
} from "./consts";
import { EmissionLimits } from "@/types/emission-limits";

export type GetEmissionLimitsParams = {
  brickyard_id?: number;
  add_institution?: boolean;
  add_management?: boolean;
  is_public?: boolean;
  paginated?: boolean;
};

export const getEmissionLimitsByBrickyardId = async (
  params: GetEmissionLimitsParams
) => {
  const { brickyard_id, ...otherParams } = params;

  return await fetcher<PaginationResponse<EmissionLimits>>({
    url: brickyard_id ? emissionLimitsByBrickyardIdUrl(brickyard_id) : "",
    params: otherParams,
  });
};

export const deleteEmissionLimit = async (id: number) => {
  return await destroy({
    url: emissionLimitsByIdUrl(id.toString()),
  });
};
