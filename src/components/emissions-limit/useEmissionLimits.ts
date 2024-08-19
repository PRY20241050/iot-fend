import { usePaginationFetchData } from "@/hooks/usePaginationFetchData";
import {
  getEmissionLimitsByBoIId,
  GetEmissionLimitsByBoIParams,
} from "@/services/emission-limits";
import { useAuthStore } from "@/store/useAuthStore";
import { EmissionLimits } from "@/types/emission-limits";
import { PaginationResponse } from "@/types/models";
import { useEffect } from "react";

export default function useEmissionLimits() {
  const { user, isBrickyard, isInstitution } = useAuthStore((state) => ({
    user: state.user,
    isBrickyard: state.isBrickyard,
    isInstitution: state.isInstitution,
  }));

  const { items, paginationInfo, isLoading, page, fetchData, updateParams } =
    usePaginationFetchData<GetEmissionLimitsByBoIParams, EmissionLimits>(
      getEmissionLimitsByBoIId<PaginationResponse<EmissionLimits>>,
      {}
    );

  useEffect(() => {
    updateParams({
      ...(isBrickyard && {
        brickyard_id: user?.brickyard?.id,
      }),
      ...(isInstitution && {
        institution_id: user?.institution?.id,
      }),
      paginated: true,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBrickyard, isInstitution, user?.brickyard?.id]);

  const fetchNextPage = () => {
    fetchData(page + 1);
  };

  const fetchPrevPage = () => {
    fetchData(page - 1);
  };

  return {
    items,
    paginationInfo,
    isLoading,
    page,
    fetchNextPage,
    fetchPrevPage,
  };
}
