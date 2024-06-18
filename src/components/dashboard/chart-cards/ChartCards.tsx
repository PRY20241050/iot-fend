import { ChartCard, GaugeCard } from "../chart-card";
import { charts } from "@/mocks/dashboard";
import useGaugeCard from "./useGaugeCard";

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

export function GaugeCards() {
  const { limitsIsLoading, gauges } = useGaugeCard();

  return (
    <>
      {limitsIsLoading
        ? skeletonItems.map((_, index) => <GaugeCard.Sk key={index} />)
        : gauges.map((gauge, index) => (
            <GaugeCard key={gauge.id} index={index} {...gauge} />
          ))}
    </>
  );
}
