"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Filter, SimpleTable } from "@/components/shared";
import { columnsHistoryTable } from "./useHistoryTable";
import { LayoutPrimary } from "@/components/layouts";
import { usePaginationFetchData } from "@/hooks/usePaginationFetchData";
import { MeasurementWithDevice } from "@/types/measurement";
import {
  getMeasurementsWithDevice,
  GetMeasurementsWithDeviceParams,
} from "@/services/measurements";
import { useEffect } from "react";
import { useFilterStore } from "@/store/useFilterStore";
import { GaugeContext, UserTypeContext } from "@/components/shared/context";

interface Props {
  brickyardId?: string;
  institution?: boolean;
}

export default function History({ brickyardId, institution = false }: Props) {
  const { user, isBrickyard } = useAuthStore((state) => ({
    user: state.user,
    isBrickyard: state.isBrickyard,
  }));

  const { dateFrom, dateTo, gases, scale, device, emissionLimit } =
    useFilterStore((state) => ({
      dateFrom: state.dateFrom,
      dateTo: state.dateTo,
      gases: state.gases,
      scale: state.scale,
      device: state.device,
      emissionLimit: state.emissionLimit,
    }));

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

  return (
    <UserTypeContext.Provider value={{ brickyardId, institution }}>
      <GaugeContext.Provider value={{ isGauge: false }}>
        <LayoutPrimary className="flex gap-6">
          <div className="flex-grow">
            <SimpleTable
              data={items}
              isLoading={isLoading}
              columns={columnsHistoryTable}
              page={page}
              paginationInfo={paginationInfo}
              fetchNextPage={fetchNextPage}
              fetchPrevPage={fetchPrevPage}
              // tableRowClass={cn({
              //   "bg-status-danger/10": !isLoading && emissionLimit,
              // })}
            />
          </div>
          <Filter />
        </LayoutPrimary>
      </GaugeContext.Provider>
    </UserTypeContext.Provider>
  );
}
