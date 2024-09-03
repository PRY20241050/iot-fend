import { Gauge } from "@/types/dashboard";
import { DetailChart } from "@/components/brickyard/dashboard/chart-cards";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyP } from "@/components/ui/typography";
import { indexToLetter } from "@/lib/helpers/string";
import GaugeChart from "./GaugeChart";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Coda } from "next/font/google";

const console = Coda({ weight: ["400"], subsets: ["latin"] });

type GaugeCardProps = Gauge & { index: number };

export function GaugeCard({ index, ...props }: GaugeCardProps) {
  const { title, limit, value } = props;

  function valueStateColor(value: number | null) {
    if (value === null) return "bg-white";
    if (value < limit.max_limit * 0.75) {
      return "bg-status-normal/10";
    } else if (value < limit.max_limit) {
      return "bg-status-warning/10";
    } else {
      return "bg-status-danger/10";
    }
  }

  const low = limit.max_limit * 0.75;
  const medium = limit.max_limit * 0.25;
  const high = limit.max_limit * 0.25;

  const maxValue = limit.max_limit * 1.25;

  return (
    <div>
      <Card className="p-6 w-full">
        <TypographyP className="font-bold pb-2">
          {indexToLetter(index).toLowerCase()}) {title}
        </TypographyP>
        <GaugeChart
          lowValue={low}
          mediumValue={medium}
          highValue={high}
          value={value}
          maxValue={maxValue}
        />
        <StatusLabel active={value !== null} />
      </Card>
      <div className="grid phone-sm:grid-cols-2 gap-3 mt-3">
        <DetailChart
          description="Concentración (mg/m3)"
          title="Actual"
          value={value}
          className={valueStateColor(value)}
        />
        <DetailChart
          description="Concentración (mg/m3)"
          title="Máximo permitido"
          disabled={limit.is_default}
          value={Number(limit.max_limit)}
        />
      </div>
    </div>
  );
}

export function GaugeLegend() {
  const GAUGE_LEGENDS = [
    {
      color: "bg-status-normal",
      title: "Seguro",
      description: "Por debajo del 80% del límite máximo permitido",
    },
    {
      color: "bg-status-warning",
      title: "Advertencia",
      description: "20% antes del límite máximo permitido",
    },
    {
      color: "bg-status-danger",
      title: "Peligro",
      description: "Sobre el límite máximo permitido",
    },
  ];

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Leyenda</CardTitle>
        <ul className="pt-3 phone-md:flex phone-md:gap-4 phone-md:flex-wrap tablet-lg:gap-6 space-y-1">
          {GAUGE_LEGENDS.map((legend, index) => (
            <li key={index} className="flex items-center">
              <span
                className={cn(
                  "w-4 h-4 rounded-full inline-block mr-2",
                  legend.color
                )}
              ></span>
              <div>
                <span className="font-semibold">{legend.title}</span>
                <p className="text-sm text-gray-600">{legend.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardHeader>
    </Card>
  );
}

export function StatusLabel({ active = false }: { active?: boolean }) {
  return (
    <TypographyP
      className={cn(
        "flex items-center justify-end text-muted-foreground",
        { "text-status-normal": active },
        console.className
      )}
    >
      <span
        className={cn(
          "w-4 h-4 rounded-full inline-block mr-2 bg-muted-foreground",
          { "bg-status-normal": active }
        )}
      ></span>{" "}
      {active ? "Conectado" : "Sin conexión"}
    </TypographyP>
  );
}

const Sk = () => {
  return (
    <div>
      <Skeleton className="p-6 w-full aspect-[2]" />
      <div className="grid grid-cols-3 gap-2 pt-2 aspect-[9/2]">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  );
};

GaugeCard.Sk = Sk;
