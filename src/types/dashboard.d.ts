import { LimitHistory } from "./limit-history";

export interface Chart {
  id: number;
  title: string;
  data: ChartData[];
  details: ChartDetail[];
}

export interface ChartDetail {
  id: number;
  title: string;
  description: string;
  value: number;
}

export interface ChartData {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

export interface Gauge {
  id: number;
  title: string;
  limit: Pick<LimitHistory, "max_limit" | "gas_type">;
  value: number;
}
