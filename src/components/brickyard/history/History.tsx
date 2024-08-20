"use client";

import { Filter, SimpleTable } from "@/components/shared";
import { columnsHistoryTable } from "./useHistoryTable";
import { LayoutPrimary } from "@/components/layouts";
import { GaugeContext, UserTypeContext } from "@/components/shared/context";
import useHistory from "./useHistory";
import { useMemo } from "react";

interface Props {
  brickyardId?: string;
  institution?: boolean;
}

export default function History({ brickyardId, institution = false }: Props) {
  const {
    items,
    isLoading,
    page,
    paginationInfo,
    fetchNextPage,
    fetchPrevPage,
  } = useHistory({ brickyardId });

  const userTypeValue = useMemo(
    () => ({ brickyardId, institution }),
    [brickyardId, institution]
  );
  const gaugeValue = useMemo(() => ({ isGauge: false }), []);

  return (
    <UserTypeContext.Provider value={userTypeValue}>
      <GaugeContext.Provider value={gaugeValue}>
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
