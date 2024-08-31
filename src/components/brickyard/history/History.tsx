"use client";

import { Filter, SimpleTable } from "@/components/shared";
import { columnsHistoryTable } from "./useHistoryTable";
import { LayoutPrimary } from "@/components/layouts";
import { GaugeContext } from "@/components/shared/context";
import useHistory from "./useHistory";
import { useMemo } from "react";

export default function History() {
  const {
    items,
    isLoading,
    page,
    paginationInfo,
    fetchNextPage,
    fetchPrevPage,
  } = useHistory();

  const gaugeValue = useMemo(() => ({ isGauge: false }), []);

  return (
    <GaugeContext.Provider value={gaugeValue}>
      <LayoutPrimary className="tablet-lg:flex tablet-lg:gap-6">
        <div className="flex-grow max-w-full overflow-x-auto mb-5">
          <SimpleTable
            data={items}
            isLoading={isLoading}
            columns={columnsHistoryTable}
            page={page}
            paginationInfo={paginationInfo}
            fetchNextPage={fetchNextPage}
            fetchPrevPage={fetchPrevPage}
            className="min-w-[42rem]"
            // tableRowClass={cn({
            //   "bg-status-danger/10": !isLoading && emissionLimit,
            // })}
          />
        </div>
        <Filter />
      </LayoutPrimary>
    </GaugeContext.Provider>
  );
}
