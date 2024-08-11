import { fetcher } from "@/lib/api/api";
import { PaginationResponse } from "@/types/models";
import { EMISSION_LIMITS_URL } from "./consts";
import { EmissionLimits } from "@/types/emission-limits";

export type GetEmissionLimitsParams = {
    brickyard_id?: number;
    show_institution?: boolean;
    is_public?: boolean;
    paginated?: boolean;
}

export const getEmissionLimits = async (params: GetEmissionLimitsParams) => {
  return await fetcher<PaginationResponse<EmissionLimits>>({
    url: EMISSION_LIMITS_URL,
    params,
  });
};
