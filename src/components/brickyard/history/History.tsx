"use client";

import { Filter, Header, SimpleTable } from "@/components/shared";
import { columnsHistoryTable } from "./useHistoryTable";
import { LayoutPrimary } from "@/components/layouts";
import useHistory from "./useHistory";
import { BarChartIcon, ListBulletIcon } from "@radix-ui/react-icons";
import { ChartCards } from "../dashboard/chart-cards";

export default function History() {
  const {
    items,
    isLoading,
    page,
    paginationInfo,
    isHistogram,
    fetchNextPage,
    fetchPrevPage,
    toggleHistogram,
  } = useHistory();

  return (
    <LayoutPrimary className="tablet-lg:flex tablet-lg:gap-6">
      <div className="flex-grow max-w-full overflow-x-auto mb-5">
        <Header
          btnAction={toggleHistogram}
          btnIcon={
            isHistogram ? (
              <ListBulletIcon className="h-4 w-4 mr-2" />
            ) : (
              <BarChartIcon className="h-4 w-4 mr-2" />
            )
          }
          btnLabel={isHistogram ? "Ver tabla" : "Ver histograma"}
        />
        {isHistogram ? (
          <ChartCards />
        ) : (
          <SimpleTable
            data={items}
            isLoading={isLoading}
            columns={columnsHistoryTable}
            page={page}
            paginationInfo={paginationInfo}
            fetchNextPage={fetchNextPage}
            fetchPrevPage={fetchPrevPage}
            className="min-w-[42rem] pt-3"
            // tableRowClass={cn({
            //   "bg-status-danger/10": !isLoading && emissionLimit,
            // })}
          />
        )}
      </div>
      <Filter />
    </LayoutPrimary>
  );
}
