import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ChartCard } from "./ChartCard";
import useChartCards from "./useChartCards";
import { GridIcon, RowsIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LayoutType } from "@/types/enums";

export function ChartCards() {
  const { chartData, gases } = useChartCards();
  const [layout, setLayout] = useState<LayoutType>(LayoutType.TWO_COLUMN);

  return (
    <div className="my-2">
      <div className="flex w-full justify-end items-center">
        <ToggleGroup
          value={layout}
          onValueChange={(value: LayoutType) => {
            if (value) setLayout(value);
          }}
          type="single"
          className="border rounded-md gap-0"
        >
          <ToggleGroupItem value={LayoutType.ONE_COLUMN} aria-label="Toggle one column" size="sm">
            <RowsIcon className="h-3 w-3" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value={LayoutType.TWO_COLUMN}
            aria-label="Toggle two columns"
            size="sm"
          >
            <GridIcon className="h-3 w-3" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div
        className={cn("grid gap-6 my-2", {
          "phone-xl:grid-cols-2": layout === LayoutType.TWO_COLUMN,
        })}
      >
        {chartData.map((chart, index) => {
          if (gases.length === 0 || gases.includes(chart.gas_type))
            return <ChartCard key={chart.gas_type} index={index} {...chart} />;
        })}
      </div>
    </div>
  );
}
