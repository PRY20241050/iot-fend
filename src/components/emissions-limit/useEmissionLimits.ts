import { usePaginationFetchData } from "@/hooks/usePaginationFetchData";
import {
  getEmissionLimitsByBrickyardId,
  GetEmissionLimitsParams,
} from "@/services/emission-limits";
import { useAuthStore } from "@/store/useAuthStore";
import { EmissionLimits } from "@/types/emission-limits";
import { useEffect } from "react";

export default function useEmissionLimits() {
  const { user, isBrickyard } = useAuthStore((state) => ({
    user: state.user,
    isBrickyard: state.isBrickyard,
  }));

  const { items, paginationInfo, isLoading, page, fetchData, updateParams } =
    usePaginationFetchData<GetEmissionLimitsParams, EmissionLimits>(
      getEmissionLimitsByBrickyardId,
      {}
    );

  useEffect(() => {
    updateParams({
      ...(isBrickyard && {
        brickyard_id: user?.brickyard?.id,
      }),
      paginated: true,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBrickyard, user?.brickyard?.id]);

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
