"use client";

import { useAuthStore } from "@/store/useAuthStore";
import ChartCard from "./chart-card";
import Filter from "./filter";
import Header from "../shared/Header";
import { ListBulletIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { charts } from "@/mocks/dashboard";

export default function Dashboard() {
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
              push("/historial");
            }}
            btnIcon={<ListBulletIcon className="h-4 w-4 mr-2" />}
            btnLabel="Ver historial"
          />
          <div className="grid grid-cols-2 gap-6 my-4">
            {charts.map((chart, index) => (
              <ChartCard key={chart.id} index={index} {...chart} />
            ))}
          </div>
        </div>
        <Filter />
      </div>
    </section>
  );
}
