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
  amount: number;
}

export interface ChartData {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}
