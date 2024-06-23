import { Chart } from "@/types/dashboard";
import { DetailChart } from "./ChartDetail";
import { Card } from "@/components/ui/card";
import { TypographyP } from "@/components/ui/typography";
import { indexToLetter } from "@/lib/helpers/string";
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
