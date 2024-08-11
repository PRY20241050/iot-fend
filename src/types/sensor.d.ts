import { Measurement } from "./measurement";

export interface Sensor {
  id: number;
  updated_at: Date;
  created_at: Date;
  device: number;
  gas_type: number;
}

export interface SensorWithLastMeasurement extends Sensor {
  last_measurement: Measurement;
}
