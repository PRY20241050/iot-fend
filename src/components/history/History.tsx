"use client";

import { useAuthStore } from "@/store/useAuthStore";
import Filter from "../shared/filter";
import Header from "../shared/Header";
import { useRouter } from "next/navigation";
import { BarChartIcon } from "@radix-ui/react-icons";
import { SimpleTable } from "../shared/simple-table";
import { historyTableData } from "@/mocks/history";
import { columnsHistoryTable } from "./useHistoryTable";
import { LayoutPrimary } from "../layouts";

export default function History() {
  const { user, isBrickyard } = useAuthStore((state) => ({
    user: state.user,
    isBrickyard: state.isBrickyard,
  }));
  const { push } = useRouter();

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
        <SimpleTable data={historyTableData} columns={columnsHistoryTable} />
      </div>
      <Filter />
    </LayoutPrimary>
  );
}