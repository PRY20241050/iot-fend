"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import Header from "../shared/Header";
import { useRouter } from "next/navigation";
import { SimpleTable } from "../shared/simple-table";
import { columnsEmissionsLimitTable } from "./useEmissionsLimitTable";
import { emissionsLimitTableData } from "@/mocks/emissions-limit";

export default function EmissionsLimit() {
  const { push } = useRouter();

  return (
    <section className="wrapper">
      <div className="inner-wrapper pt-8">
        <Header
          showTitle
          title="Límites de emisiones"
          btnAction={() => {
            push("/limite-emisiones/agregar");
          }}
          btnIcon={<PlusIcon className="h-4 w-4 mr-2" />}
          btnLabel="Añadir límite"
        />
        <SimpleTable
          data={emissionsLimitTableData}
          columns={columnsEmissionsLimitTable}
        />
      </div>
    </section>
  );
}
