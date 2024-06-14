"use client";

import { useAuthStore } from "@/store/useAuthStore";
import ChartCard from "./chartCard";
import Filter from "./filter";
import Header from "@/components/shared/header";
import { ListBulletIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

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
            btnAction={() => { push("/historial") }}
            btnIcon={<ListBulletIcon className="h-4 w-4 mr-2" />}
            btnLabel="Ver historial"
          />
          <div className="py-8 flex gap-4">
            <ChartCard />
            <ChartCard />
          </div>
        </div>
        <Filter />
      </div>
    </section>
  );
}
