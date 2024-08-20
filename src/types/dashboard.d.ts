import { LimitHistory } from "./limit-history";

export interface Chart {
  id: number;
  gas_type: number;
  title: string;
  data?: ChartData[];
  details?: {
    min?: number | null;
    max?: number | null;
    avg?: number | null;
  };
  max_limit?: ChartMaxLimit;
}

export interface ChartData {
  name: string;
  [key: string]: number | string;
}

export interface ChartMaxLimit {
  value?: number;
  name?: string;
}

export interface Gauge {
  id: number;
  title: string;
  limit: Pick<LimitHistory, "max_limit" | "gas_type"> & {
    is_default?: boolean;
  };
  value: number;
}
