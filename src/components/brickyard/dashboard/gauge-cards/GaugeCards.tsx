import { memo } from "react";
import { GaugeCard } from "./GaugeCard";
import useGaugeCards from "./useGaugeCards";

const skeletonItems = [...Array.from({ length: 4 }, (_, i) => i)];

const GaugeCardsComponent = () => {
  const { limitIsLoading, gauges } = useGaugeCards();

  return (
    <>
      {limitIsLoading
        ? skeletonItems.map((_, index) => <GaugeCard.Sk key={index} />)
        : gauges.map((gauge, index) => (
            <GaugeCard key={gauge.id} index={index} {...gauge} />
          ))}
    </>
  );
};

export const GaugeCards = memo(GaugeCardsComponent);
