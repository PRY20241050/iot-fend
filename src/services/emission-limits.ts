import { destroy, fetcher, post } from "@/lib/api/api";
import { PaginationResponse } from "@/types/models";
import {
  EMISSION_LIMITS_URL,
  emissionLimitsByBrickyardIdUrl,
  emissionLimitsByIdUrl,
} from "./consts";
import { CreateEmissionLimit, EmissionLimits } from "@/types/emission-limits";

export const createEmissionLimit = async (data: CreateEmissionLimit) => {
  return await post<EmissionLimits>({
    url: EMISSION_LIMITS_URL,
    params: data,
  });
};

export const deleteEmissionLimit = async (id: number) => {
  return await destroy({
    url: emissionLimitsByIdUrl(id.toString()),
  });
};

export type GetEmissionLimitsParams = {
  brickyard_id?: number;
  add_institution?: boolean;
  add_management?: boolean;
  is_public?: boolean;
  paginated?: boolean;
};

export const getEmissionLimitsByBrickyardIdPaginated = async (
  params: GetEmissionLimitsParams
) => {
  const { brickyard_id, ...otherParams } = params;

  return await fetcher<PaginationResponse<EmissionLimits>>({
    url: brickyard_id ? emissionLimitsByBrickyardIdUrl(brickyard_id) : "",
    params: otherParams,
  });
};

export const getEmissionLimitsByBrickyardId = async (
  params: GetEmissionLimitsParams
) => {
  const { brickyard_id, ...otherParams } = params;

  return await fetcher<EmissionLimits[]>({
    url: brickyard_id ? emissionLimitsByBrickyardIdUrl(brickyard_id) : "",
    params: otherParams,
  });
};
