import { Chart } from "@/types/dashboard";
import DetailChart from "./ChartDetail";
import { LineChart } from "./LineChart";

type Props = Chart & { index: number };

export default function ChartCard({ index, data, details, title }: Props) {
  return (
    <div>
      <LineChart index={index} title={title} data={data} />
      <div className="grid grid-cols-3 gap-2">
        {details.map((detail) => (
          <DetailChart key={detail.id} detail={detail} />
        ))}
      </div>
    </div>
  );
}
