import { Chart, Gauge } from "@/types/dashboard";

export const initChart: Chart[] = [
  {
    gas_type: 1,
    title: "CO",
    measurements: undefined,
    min: null,
    max: null,
    avg: null,
    max_limit: undefined,
  },
  {
    gas_type: 2,
    title: "NO2",
    measurements: undefined,
    min: null,
    max: null,
    avg: null,
    max_limit: undefined,
  },
  {
    gas_type: 3,
    title: "SO2",
    measurements: undefined,
    min: null,
    max: null,
    avg: null,
    max_limit: undefined,
  },
  {
    gas_type: 4,
    title: "PM2.5",
    measurements: undefined,
    min: null,
    max: null,
    avg: null,
    max_limit: undefined,
  },
  {
    gas_type: 5,
    title: "PM10",
    measurements: undefined,
    min: null,
    max: null,
    avg: null,
    max_limit: undefined,
  },
];

export const gauges: Gauge[] = [
  {
    id: 1,
    title: "Sensor CO",
    value: null,
    limit: {
      is_default: true,
      max_limit: 100,
      gas_type: 1,
    },
  },
  {
    id: 2,
    title: "Sensor NO2",
    value: null,
    limit: {
      is_default: true,
      max_limit: 320,
      gas_type: 2,
    },
  },
  {
    id: 3,
    title: "Sensor SO2",
    value: null,
    limit: {
      is_default: true,
      max_limit: 0.25,
      gas_type: 3,
    },
  },
  {
    id: 4,
    title: "Sensor PM2.5",
    value: null,
    limit: {
      is_default: true,
      max_limit: 150,
      gas_type: 4,
    },
  },
  {
    id: 5,
    title: "Sensor PM10",
    value: null,
    limit: {
      is_default: true,
      max_limit: 150,
      gas_type: 4,
    },
  },
];
