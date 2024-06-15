"use client";

import { useAuthStore } from "@/store/useAuthStore";
import Filter from "../shared/filter";
import Header from "../shared/Header";
import { useRouter } from "next/navigation";
import { BarChartIcon } from "@radix-ui/react-icons";
import { HistoryTable } from "./history-table";

export default function History() {
  const { user, isBrickyard } = useAuthStore((state) => ({
    user: state.user,
    isBrickyard: state.isBrickyard,
  }));
  const { push } = useRouter();

  return (
    <section className="wrapper">
      <div className="inner-wrapper flex gap-6 pt-8">
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
          <HistoryTable />
        </div>
        <Filter />
      </div>
    </section>
  );
}
