import { RADIAN } from "@/lib/utils";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const cx = 180;
const cy = 100;
const iR = 50;
const oR = 100;

type Props = {
  lowValue: number;
  mediumValue: number;
  highValue: number;
  value: number;
  maxValue: number;
};

export default function GaugeChart({
  value,
  lowValue,
  mediumValue,
  highValue,
  maxValue,
}: Props) {
  const data = [
    { name: "Low", value: lowValue, color: "hsl(var(--gauge-normal))" },
    { name: "Medium", value: mediumValue, color: "hsl(var(--gauge-warning))" },
    { name: "High", value: highValue, color: "hsl(var(--gauge-danger))" },
  ];

  const graphValue = value > maxValue ? maxValue : value;

  return (
    <ResponsiveContainer width="100%" height={120}>
      <PieChart width={360} height={120}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {needle({
          data,
          value: graphValue,
          cx,
          cy,
          iR,
          oR,
          color: "hsl(var(--color-black))",
        })}
      </PieChart>
    </ResponsiveContainer>
  );
}

interface NeedleProps {
  data: { value: number; color: string }[];
  value: number;
  cx: number;
  cy: number;
  iR: number;
  oR: number;
  color: string;
}

const needle = ({ data, value, cx, cy, iR, oR, color }: NeedleProps) => {
  let total = 0;
  data.forEach((v) => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" key={x0} />,
    <path
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      stroke="none"
      fill={color}
      key={xba}
    />,
  ];
};
