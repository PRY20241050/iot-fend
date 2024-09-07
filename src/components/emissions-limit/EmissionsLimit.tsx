"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import Header from "../shared/Header";
import { useParams, useRouter } from "next/navigation";
import { SimpleTable } from "../shared/simple-table";
import { columnsEmissionsLimitTable } from "./useEmissionsLimitTable";
import { LayoutPrimary } from "../layouts";
import useEmissionLimits from "./useEmissionLimits";
import { CREAR_LIMITE_EMISIONES_PATH } from "@/lib/utils";

export default function EmissionsLimit() {
  const { push } = useRouter();
  const { brickyardId } = useParams();

  const {
    items,
    isLoading,
    paginationInfo,
    page,
    fetchNextPage,
    fetchPrevPage,
  } = useEmissionLimits();

  const columns = brickyardId
    ? columnsEmissionsLimitTable.slice(0, -1)
    : columnsEmissionsLimitTable;

  return (
    <LayoutPrimary className="tablet-lg:flex tablet-lg:gap-6">
      <div className="flex-grow max-w-full overflow-x-auto mb-5">
        <Header
          showTitle
          title="Límite de emisiones"
          hideBtn={!!brickyardId}
          btnAction={() => {
            push(CREAR_LIMITE_EMISIONES_PATH);
          }}
          btnIcon={<PlusIcon className="h-4 w-4 mr-2" />}
          btnLabel="Añadir límite"
        />
        <SimpleTable
          data={items}
          isLoading={isLoading}
          columns={columns}
          page={page}
          paginationInfo={paginationInfo}
          fetchNextPage={fetchNextPage}
          fetchPrevPage={fetchPrevPage}
          className="min-w-[56rem] my-4"
        />
      </div>
    </LayoutPrimary>
  );
}
