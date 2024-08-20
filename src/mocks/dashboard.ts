import { Chart, ChartData, Gauge } from "@/types/dashboard";

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

export const charts: Chart[] = [
  {
    id: 1,
    gas_type: 1,
    title: "Sensor CO",
    data: [...chartData],
    details: {
      min: 20.1,
      max: 120.1,
      avg: 100.1,
    },
    max_limit: undefined,
  },
  {
    id: 2,
    gas_type: 2,
    title: "Sensor NO2",
    data: [...chartData],
    details: {
      min: 20.1,
      max: 120.1,
      avg: 100.1,
    },
    max_limit: undefined,
  },
  {
    id: 3,
    gas_type: 3,
    title: "Sensor SO2",
    data: [...chartData],
    details: {
      min: 20.1,
      max: 120.1,
      avg: 100.1,
    },
    max_limit: undefined,
  },
  {
    id: 4,
    gas_type: 4,
    title: "Sensor PM2.5",
    data: [...chartData],
    details: {
      min: 20.1,
      max: 120.1,
      avg: 100.1,
    },
    max_limit: undefined,
  },
  {
    id: 5,
    gas_type: 5,
    title: "Sensor PM10",
    data: [...chartData],
    details: {
      min: 20.1,
      max: 120.1,
      avg: 100.1,
    },
    max_limit: undefined,
  },
];

export const initChart: Chart[] = [
  {
    id: 1,
    gas_type: 1,
    title: "Sensor CO",
    data: [...chartData],
    details: {
      min: null,
      max: null,
      avg: null,
    },
    max_limit: undefined,
  },
  {
    id: 2,
    gas_type: 2,
    title: "Sensor NO2",
    data: [...chartData],
    details: {
      min: null,
      max: null,
      avg: null,
    },
    max_limit: undefined,
  },
  {
    id: 3,
    gas_type: 3,
    title: "Sensor SO2",
    data: [...chartData],
    details: {
      min: null,
      max: null,
      avg: null,
    },
    max_limit: undefined,
  },
  {
    id: 4,
    gas_type: 4,
    title: "Sensor PM2.5",
    data: [...chartData],
    details: {
      min: null,
      max: null,
      avg: null,
    },
    max_limit: undefined,
  },
  {
    id: 5,
    gas_type: 5,
    title: "Sensor PM10",
    data: [...chartData],
    details: {
      min: null,
      max: null,
      avg: null,
    },
    max_limit: undefined,
  },
];

export const gauges: Gauge[] = [
  {
    id: 1,
    title: "Sensor CO",
    value: 0,
    limit: {
      is_default: true,
      max_limit: 100,
      gas_type: 1,
    },
  },
  {
    id: 2,
    title: "Sensor NO2",
    value: 0,
    limit: {
      is_default: true,
      max_limit: 320,
      gas_type: 2,
    },
  },
  {
    id: 3,
    title: "Sensor SO2",
    value: 0,
    limit: {
      is_default: true,
      max_limit: 0.25,
      gas_type: 3,
    },
  },
  {
    id: 4,
    title: "Sensor PM2.5",
    value: 0,
    limit: {
      is_default: true,
      max_limit: 150,
      gas_type: 4,
    },
  },
  {
    id: 5,
    title: "Sensor PM10",
    value: 0,
    limit: {
      is_default: true,
      max_limit: 150,
      gas_type: 4,
    },
  },
];
