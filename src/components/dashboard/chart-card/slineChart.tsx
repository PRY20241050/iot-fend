import { Card } from "@/components/ui/card";
import { TypographyP } from "@/components/ui/typography";
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

const data = [
  {
    name: "10:20",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "10:21",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "10:22",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "10:23",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "10:24",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "10:25",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "10:26",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "10:27",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "10:28",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "10:29",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "10:30",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "10:31",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "10:32",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export function LineChart() {
  return (
    <Card className="p-6 w-full">
      <TypographyP className="font-bold pb-2">a) Sensor PM10</TypographyP>
      <ResponsiveContainer width="100%" height={300}>
        <Chart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 50,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" label="Tiempo" />
          <YAxis label="mg/m3" />
          <Tooltip />
          <Legend />
          <ReferenceLine y={7200} label="LMP" stroke="red" />
          <Line type="monotone" dataKey="pv" stroke="hsl(var(--primary))" />
          <Line type="monotone" dataKey="uv" stroke="var(--color-black)" />
        </Chart>
      </ResponsiveContainer>
    </Card>
  );
}
