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

  const { dateFrom, dateTo, gases, scale, device } = useFilterStore((state) => ({
    dateFrom: state.dateFrom,
    dateTo: state.dateTo,
    gases: state.gases,
    scale: state.scale,
    device: state.device,
  }));

  const { push } = useRouter();

  const { items, isLoading, updateParams } = usePaginationFetchData<
    GetMeasurementsWithDeviceParams,
    MeasurementWithDevice
  >(getMeasurementsWithDevice, {});

  useEffect(() => {
    updateParams({
      brickyardsIds: user?.brickyard && [user?.brickyard?.id],
      dateFrom: dateFrom as Date,
      dateTo: dateTo as Date,
      device: device as number,
      gases,
      scale,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.brickyard?.id, dateFrom, dateTo, gases]);

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
        />
      </div>
      <Filter />
    </LayoutPrimary>
  );
}
