import { ChartData, ChartMaxLimit } from "@/types/dashboard";
import {
  LineChart as Chart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data?: ChartData[];
  maxLimit?: ChartMaxLimit;
}

const FONT_SIZE = 12;

export function LineChart({ data, maxLimit }: Props) {
  const keys = Object.keys(data?.[0] || {}).filter((key) => key !== "name");

  return (
    <ResponsiveContainer width="100%" height={250}>
      <Chart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis
          dataKey="name"
          label={{
            value: "Tiempo",
            position: "insideBottomRight",
            offset: 0,
            dy: 10,
            style: { fontSize: FONT_SIZE },
          }}
          domain={["dataMin", "dataMax + 100"]}
          minTickGap={0}
          tickLine={false}
          tickMargin={5}
          tick={{ fontSize: FONT_SIZE }}
        />
        <YAxis
          label={{
            value: "mg/m3",
            angle: -90,
            position: "insideLeft",
            style: { fontSize: FONT_SIZE },
          }}
          domain={[0, "dataMax + 1000"]}
          minTickGap={0}
          tickLine={false}
          tick={{ fontSize: FONT_SIZE }}
        />
        <Tooltip />
        <Legend
          iconType="square"
          iconSize={5}
          wrapperStyle={{ fontSize: FONT_SIZE }}
        />
        {maxLimit && (
          <ReferenceLine
            y={maxLimit.value}
            label={{
              value: maxLimit.name,
              dy: -10,
              style: { fontSize: FONT_SIZE },
            }}
            stroke="red"
          />
        )}
        {keys.map((key, index) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={`hsl(${180 + ((index * 20) % 60)}, 70%, 50%)`}
          />
        ))}
      </Chart>
    </ResponsiveContainer>
  );
}
