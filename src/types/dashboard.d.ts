import { LimitHistory } from "./limit-history";

export interface ChartAPI {
  gas_type: number;
  gas_abbreviation?: string;
  measurements?: {
    date: Date;
    [key: string]: number | string;
  }[];
  min?: string | null;
  max?: string | null;
  avg?: string | null;
}

export type Chart = Omit<ChartAPI, "title", "measurements", "min", "max", "avg"> & {
  title: string;
  measurements?: ChartData[];
  max_limit?: ChartMaxLimit;
  min?: number | null;
  max?: number | null;
  avg?: number | null;
};

export interface ChartData {
  date: string;
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
  value: number | null;
}
