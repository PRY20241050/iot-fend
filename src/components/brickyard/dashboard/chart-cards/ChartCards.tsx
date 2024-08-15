import { ChartCard } from "./ChartCard"
import { charts } from "@/mocks/dashboard";


export function ChartCards() {
  return (
    <>
      {charts.map((chart, index) => (
        <ChartCard key={chart.id} index={index} {...chart} />
      ))}
    </>
  );
}
