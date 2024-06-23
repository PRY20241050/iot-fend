import { GaugeCard } from "./GaugeCard";
import useGaugeCard from "./useGaugeCard"

const skeletonItems = [...Array.from({ length: 4 }, (_, i) => i)];

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
