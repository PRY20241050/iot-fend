import { Chart } from "@/types/dashboard";
import { DetailChart } from "./ChartDetail";
import { Card } from "@/components/ui/card";
import { TypographyP } from "@/components/ui/typography";
import { indexToLetter } from "@/lib/helpers/string";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart } from "./LineChart";

type Props = Chart & { index: number };

export function ChartCard({ index, ...props }: Props) {
  const { title, data, details, max_limit } = props;

  return (
    <div>
      <Card className="p-6 w-full">
        <TypographyP className="font-bold pb-2">
          {indexToLetter(index).toLowerCase()}) {title}
        </TypographyP>
        <LineChart data={data} maxLimit={max_limit} />
      </Card>
      <div className="grid phone-sm:grid-cols-3 gap-3 mt-3">
        <DetailChart
          title="Mínimo"
          description="Concentración (mg/m3)"
          value={details?.min}
        />
        <DetailChart
          title="Máximo"
          description="Concentración (mg/m3)"
          value={details?.max}
        />
        <DetailChart
          title="Promedio"
          description="Concentración (mg/m3)"
          value={details?.avg}
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
