import { Gauge } from "@/types/dashboard";
import { DetailChart } from "@/components/dashboard/chart-cards";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyP } from "@/components/ui/typography";
import { indexToLetter } from "@/lib/helpers/string";
import GaugeChart from "./GaugeChart";
import { Skeleton } from "@/components/ui/skeleton";

type GaugeCardProps = Gauge & { index: number };

export function GaugeCard({ index, ...props }: GaugeCardProps) {
  const { title, limit, value } = props;

  function valueStateColor(value: number) {
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
          value={Number(limit.max_limit)}
        />
      </div>
    </div>
  );
}

export function GaugeLegend() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Leyenda</CardTitle>
        <ul className="pt-3 phone-md:flex phone-md:gap-4 phone-md:flex-wrap tablet-lg:gap-6">
          <li className="flex items-center mb-1">
            <span className="w-4 h-4 bg-gauge-normal rounded-full inline-block mr-2"></span>
            <div>
              <span className="font-semibold">Seguro</span>
              <p className="text-sm text-gray-600">
                Por debajo del límite máximo permitido
              </p>
            </div>
          </li>
          <li className="flex items-center mb-1">
            <span className="w-4 h-4 bg-gauge-warning rounded-full inline-block mr-2"></span>
            <div>
              <span className="font-semibold">Advertencia</span>
              <p className="text-sm text-gray-600">
                20% antes del límite máximo permitido
              </p>
            </div>
          </li>
          <li className="flex items-center">
            <span className="w-4 h-4 bg-gauge-danger rounded-full inline-block mr-2"></span>
            <div>
              <span className="font-semibold">Peligro</span>
              <p className="text-sm text-gray-600">
                Sobre el límite máximo permitido
              </p>
            </div>
          </li>
        </ul>
      </CardHeader>
    </Card>
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
