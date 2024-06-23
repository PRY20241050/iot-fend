import { ChartCard } from "./ChartCard"
import { charts } from "@/mocks/dashboard";

const skeletonItems = [...Array.from({ length: 4 }, (_, i) => i)];

export function ChartCards() {
  return (
    <>
      {charts.map((chart, index) => (
        <ChartCard key={chart.id} index={index} {...chart} />
      ))}
    </>
  );
}
