import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ChartCard } from "./ChartCard";
import useChartCards from "./useChartCards";
import { GridIcon, RowsIcon } from "@radix-ui/react-icons";

export function ChartCards() {
  const { chartData, gases } = useChartCards();

  console.log(chartData);

  return (
    <div className="my-2">
      <div className="flex w-full justify-end items-center">
        <ToggleGroup type="single" className="border rounded-md gap-0">
          <ToggleGroupItem value="grid-cols-1" aria-label="Toggle bold" size="sm">
            <RowsIcon className="h-3 w-3" />
          </ToggleGroupItem>
          <ToggleGroupItem value="grid-cols-2" aria-label="Toggle italic" size="sm">
            <GridIcon className="h-3 w-3" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="grid phone-xl:grid-cols-2 gap-6 my-2">
        {chartData.map((chart, index) => {
          if (gases.length === 0 || gases.includes(chart.gas_type))
            return <ChartCard key={chart.id} index={index} {...chart} />;
        })}
      </div>
    </div>
  );
}
