import { useAuthStore } from "@/store/useAuthStore";
import { usePaginationFetchData } from "@/hooks/usePaginationFetchData";
import { MeasurementWithDevice } from "@/types/measurement";
import {
  getMeasurementsWithDevice,
  GetMeasurementsWithDeviceParams,
} from "@/services/measurements";
import { useEffect } from "react";
import { useFilterStore } from "@/store/useFilterStore";
import { useParams } from "next/navigation";

export default function useHistory() {
  const { brickyardId } = useParams();
  const { user, isBrickyard } = useAuthStore((state) => ({
    user: state.user,
    isBrickyard: state.isBrickyard,
  }));

  const { dateFrom, dateTo, gases, scale, device, emissionLimit } =
    useFilterStore();

  const { items, paginationInfo, isLoading, page, fetchData, updateParams } =
    usePaginationFetchData<
      GetMeasurementsWithDeviceParams,
      MeasurementWithDevice
    >(getMeasurementsWithDevice, {});

  useEffect(() => {
    updateParams({
      brickyardsIds: isBrickyard ? [user?.brickyard?.id] : [brickyardId],
      dateFrom: dateFrom as Date,
      dateTo: dateTo as Date,
      device,
      gases,
      scale,
      emissionLimit,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.brickyard, dateFrom, dateTo, device, gases, scale, emissionLimit]);

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
