"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import Header from "../shared/Header";
import { useRouter } from "next/navigation";
import { SimpleTable } from "../shared/simple-table";
import { columnsEmissionsLimitTable } from "./useEmissionsLimitTable";
import { LayoutPrimary } from "../layouts";
import useEmissionLimits from "./useEmissionLimits";
import { CREAR_LIMITE_EMISIONES_PATH } from "@/lib/utils";

export default function EmissionsLimit() {
  const { push } = useRouter();

  const {
    items,
    isLoading,
    paginationInfo,
    page,
    fetchNextPage,
    fetchPrevPage,
  } = useEmissionLimits();

  return (
    <LayoutPrimary>
      <Header
        showTitle
        title="Límite de emisiones"
        btnAction={() => {
          push(CREAR_LIMITE_EMISIONES_PATH);
        }}
        btnIcon={<PlusIcon className="h-4 w-4 mr-2" />}
        btnLabel="Añadir límite"
      />
      <SimpleTable
        data={items}
        isLoading={isLoading}
        columns={columnsEmissionsLimitTable}
        page={page}
        paginationInfo={paginationInfo}
        fetchNextPage={fetchNextPage}
        fetchPrevPage={fetchPrevPage}
      />
    </LayoutPrimary>
  );
}
