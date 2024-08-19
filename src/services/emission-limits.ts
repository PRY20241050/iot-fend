import { destroy, fetcher, post } from "@/lib/api/api";
import {
  EMISSION_LIMITS_URL,
  emissionLimitsByBrickyardIdUrl,
  emissionLimitsByIdUrl,
  emissionLimitsByInstitutionIdUrl,
} from "./consts";
import { CreateEmissionLimit, EmissionLimits } from "@/types/emission-limits";

export type GetEmissionLimitsParams = {
  id?: number;
  brickyard_id?: number;
  institution_id?: number;
  is_public?: boolean;
  is_default?: boolean;
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

export const deleteEmissionLimit = async (id: number) => {
  return await destroy({
    url: emissionLimitsByIdUrl(id.toString()),
  });
};

// Get emission limits by brickyard id or institution id

export type GetEmissionLimitsByBoIParams = {
  brickyard_id?: number;
  brickyard_ids?: number[];
  institution_id?: number;
  add_institution?: boolean;
  add_brickyard?: boolean;
  add_management?: boolean;
  is_public?: boolean;
  paginated?: boolean;
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
