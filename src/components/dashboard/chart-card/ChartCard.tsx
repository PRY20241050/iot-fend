import { Chart, Gauge } from "@/types/dashboard";
import DetailChart from "./ChartDetail";
import { Card } from "@/components/ui/card";
import { TypographyP } from "@/components/ui/typography";
import { indexToLetter } from "@/lib/helpers/string";
import GaugeChart from "./GaugeChart";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart } from "./LineChart";

type Props = Chart & { index: number };

export function ChartCard({ index, ...props }: Props) {
  const { title, data, details } = props;

  return (
    <div>
      <Card className="p-6 w-full">
        <TypographyP className="font-bold pb-2">
          {indexToLetter(index).toLowerCase()}) {title}
        </TypographyP>
        <LineChart data={data} />
      </Card>
      <div className="grid phone-sm:grid-cols-3 gap-3 mt-3">
        {details.map((detail) => (
          <DetailChart key={detail.id} {...detail} />
        ))}
      </div>
    </div>
  );
}

type GaugeCardProps = Gauge & { index: number };

export function GaugeCard({ index, ...props }: GaugeCardProps) {
  const { title, limit, value } = props;

  function valueStateColor(value: number) {
    if (value < limit.max_limit * 0.75) {
      return "bg-gauge-normal/10";
    } else if (value < limit.max_limit) {
      return "bg-gauge-warning/10";
    } else {
      return "bg-gauge-danger/10";
    }
  }

  const low = limit.max_limit * 0.75;
  const medium = limit.max_limit * 0.25;
  const high = limit.max_limit * 0.25;
  
  const maxValue = limit.max_limit * 1.25;

  console.log(value)

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
      <div className="grid phone-sm:grid-cols-3 gap-3 mt-3">
        <DetailChart
          description="Concentración (mg/m3)"
          title="Mínimo"
          value={0}
        />
        <DetailChart
          description="Concentración (mg/m3)"
          title="Actual"
          value={value}
          className={valueStateColor(value)}
        />
        <DetailChart
          description="Concentración (mg/m3)"
          title="Máximo"
          value={Number(limit.max_limit)}
        />
      </div>
    </div>
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

ChartCard.Sk = Sk;
GaugeCard.Sk = Sk;
