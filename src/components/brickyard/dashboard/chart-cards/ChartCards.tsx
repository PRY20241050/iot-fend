import { ChartCard } from "./ChartCard";
import useChartCards from "./useChartCards";

export function ChartCards() {
  const { chartData, gases } = useChartCards();

  console.log(chartData);

  return (
    <>
      {chartData.map((chart, index) => {
        if (gases.length === 0 || gases.includes(chart.gas_type))
          return <ChartCard key={chart.id} index={index} {...chart} />;
      })}
    </>
  );
}
