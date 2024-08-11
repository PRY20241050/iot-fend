"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import Header from "../shared/Header";
import { useRouter } from "next/navigation";
import { SimpleTable } from "../shared/simple-table";
import { columnsEmissionsLimitTable } from "./useEmissionsLimitTable";
import { LayoutPrimary } from "../layouts";
import useEmissionLimits from "./useEmissionLimits";

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
          push("/limite-emisiones/agregar");
        }}
        btnIcon={<PlusIcon className="h-4 w-4 mr-2" />}
        btnLabel="Añadir límite"
      />
      <SimpleTable data={items} columns={columnsEmissionsLimitTable} />
    </LayoutPrimary>
  );
}
