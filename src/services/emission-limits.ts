import { destroy, fetcher, patch, post } from "@/lib/api/api";
import {
  EMISSION_LIMITS_URL,
  emissionLimitsByBrickyardIdUrl,
  emissionLimitsByIdUrl,
  emissionLimitsByInstitutionIdUrl,
} from "./consts";
import { CreateEmissionLimit, EditEmissionLimit, EmissionLimits } from "@/types/emission-limits";

export type GetEmissionLimitsParams = {
  is_active?: boolean;
  is_public?: boolean;
  brickyard_id?: number;
  institution_id?: number;
  id?: number;
};

export const getEmissionLimits = async <T = EmissionLimits[]>(
  params?: GetEmissionLimitsParams
) => {
  return await fetcher<T>({
    url: EMISSION_LIMITS_URL,
    params,
  });
};

export const createEmissionLimit = async (data: CreateEmissionLimit) => {
  return await post<EmissionLimits>({
    url: EMISSION_LIMITS_URL,
    params: data,
  });
};

export const editEmissionLimit = async (data: EditEmissionLimit, id: number) => {
  return await patch<EmissionLimits>({
    url: emissionLimitsByIdUrl(id.toString()),
    params: data,
  });
};

export const deleteEmissionLimit = async (id: number) => {
  return await destroy({
    url: emissionLimitsByIdUrl(id.toString()),
  });
};

// Get emission limits by brickyard id or institution id

export type GetEmissionLimitsByBoIParams = {
  is_public?: boolean;
  is_active?: boolean;
  paginated?: boolean;
  brickyard_id?: number;
  institution_id?: number;
  add_management?: boolean;
  only_public_institutions?: boolean;
  add_all_institutions?: boolean;
  only_public_brickyards?: boolean;
  add_all_brickyards?: boolean;
  add_brickyard_ids?: number[];
};

export const getEmissionLimitsByBoIId = async <T = EmissionLimits[]>(
  params: GetEmissionLimitsByBoIParams
): Promise<T> => {
  const { brickyard_id, institution_id, ...otherParams } = params;

  const urlBoI = () => {
    if (brickyard_id) return emissionLimitsByBrickyardIdUrl(brickyard_id);
    if (institution_id) return emissionLimitsByInstitutionIdUrl(institution_id);
    return "";
  };

  return await fetcher<T>({
    url: urlBoI(),
    params: otherParams,
  });
};
