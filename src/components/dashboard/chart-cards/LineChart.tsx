import { ChartData } from "@/types/dashboard";
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
  data: ChartData[];
}

const FONT_SIZE = 12;

export function LineChart({ data }: Props) {
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
          <Legend iconType="square" iconSize={5} wrapperStyle={{ fontSize: FONT_SIZE }} />
          <ReferenceLine
            y={7200}
            label={{ value: "LMP", dy: -10, style: { fontSize: FONT_SIZE } }}
            stroke="red"
          />
          <Line type="monotone" dataKey="pv" stroke="hsl(var(--primary))" />
          <Line type="monotone" dataKey="uv" stroke="var(--color-black)" />
        </Chart>
      </ResponsiveContainer>
  );
}
