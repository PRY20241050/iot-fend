"use client";

import { useAuthStore } from "@/store/useAuthStore";
import Filter from "../shared/filter";
import Header from "../shared/Header";
import { useRouter } from "next/navigation";
import { BarChartIcon } from "@radix-ui/react-icons";
import { SimpleTable } from "../shared/simple-table";
import { columnsHistoryTable } from "./useHistoryTable";
import { LayoutPrimary } from "../layouts";
import { usePaginationFetchData } from "@/hooks/usePaginationFetchData";
import { MeasurementWithDevice } from "@/types/measurement";
import {
  getMeasurementsWithDevice,
  GetMeasurementsWithDeviceParams,
} from "@/services/measurements";
import { useEffect } from "react";
import { useFilterStore } from "@/store/useFilterStore";

export default function History() {
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

  const { push } = useRouter();

  const { items, paginationInfo, isLoading, page, fetchData, updateParams } =
    usePaginationFetchData<
      GetMeasurementsWithDeviceParams,
      MeasurementWithDevice
    >(getMeasurementsWithDevice, {});

  useEffect(() => {
    updateParams({
      brickyardsIds: user?.brickyard && [user?.brickyard?.id],
      dateFrom: dateFrom as Date,
      dateTo: dateTo as Date,
      device,
      gases,
      scale,
      emissionLimit,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    user?.brickyard?.id,
    user?.brickyard,
    dateFrom,
    dateTo,
    device,
    gases,
    scale,
    emissionLimit,
  ]);

  const fetchNextPage = () => {
    fetchData(page + 1);
  };

  const fetchPrevPage = () => {
    fetchData(page - 1);
  };

  return (
    <LayoutPrimary className="flex gap-6">
      <div className="flex-grow">
        <Header
          showTitle={isBrickyard}
          title={`Ladrillera ${user?.brickyard?.name ?? "Sin nombre"}`}
          btnAction={() => {
            push("/dashboard");
          }}
          btnIcon={<BarChartIcon className="h-4 w-4 mr-2" />}
          btnLabel="Ver graficos"
        />
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
  );
}
