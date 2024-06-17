import { Chart, ChartData, ChartDetail, Gauge } from "@/types/dashboard";

export const chartData: ChartData[] = [
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

export const chartDetail: ChartDetail[] = [
  {
    id: 1,
    title: "Mínimo",
    description: "Concentración (mg/m3)",
    value: 20.1,
  },
  {
    id: 2,
    title: "Máximo",
    description: "Concentración (mg/m3)",
    value: 120.1,
  },
  {
    id: 3,
    title: "Promedio",
    description: "Concentración (mg/m3)",
    value: 100.1,
  },
];

export const charts: Chart[] = [
  {
    id: 1,
    title: "Sensor CO",
    data: [...chartData],
    details: chartDetail
  },
  {
    id: 2,
    title: "Sensor NO2",
    data: [...chartData],
    details: chartDetail
  },
  {
    id: 3,
    title: "Sensor SO2",
    data: [...chartData],
    details: chartDetail
  },
  {
    id: 4,
    title: "Sensor PM2.5",
    data: [...chartData],
    details: chartDetail
  },
  {
    id: 5,
    title: "Sensor PM10",
    data: [...chartData],
    details: chartDetail
  },
];

export const gauges: Gauge[] = [
  {
    id: 1,
    title: "Sensor CO",
    limit: {
      max_limit: 100,
      is_modified: false,
      emission_limit: 1,
      gas_type: 1,
    },
  },
  {
    id: 2,
    title: "Sensor NO2",
    limit: {
      max_limit: 320,
      is_modified: false,
      emission_limit: 1,
      gas_type: 2,
    },
  },
  {
    id: 3,
    title: "Sensor SO2",
    limit: {
      max_limit: 0.25,
      is_modified: false,
      emission_limit: 1,
      gas_type: 3,
    },
  },
  {
    id: 4,
    title: "Sensor PM2.5",
    limit: {
      max_limit: 150,
      is_modified: false,
      emission_limit: 1,
      gas_type: 4,
    },
  },
  {
    id: 5,
    title: "Sensor PM10",
    limit: {
      max_limit: 150,
      is_modified: false,
      emission_limit: 1,
      gas_type: 4,
    },
  },
];
