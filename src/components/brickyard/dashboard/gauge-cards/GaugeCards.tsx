import { memo } from "react";
import { GaugeCard, GaugeLegend } from "./GaugeCard";
import useGaugeCards from "./useGaugeCards";

const skeletonItems = [...Array.from({ length: 4 }, (_, i) => i)];

const GaugeCardsComponent = () => {
  const { limitIsLoading, gauges } = useGaugeCards();

  return (
    <>
      <GaugeLegend />
      <div className="grid phone-xl:grid-cols-2 gap-6 my-4">
        {limitIsLoading
          ? skeletonItems.map((_, index) => <GaugeCard.Sk key={index} />)
          : gauges.map((gauge, index) => (
              <GaugeCard key={gauge.id} index={index} {...gauge} />
            ))}
      </div>
    </>
  );
};

export const GaugeCards = memo(GaugeCardsComponent);
