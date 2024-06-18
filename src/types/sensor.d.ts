import { Measurement } from "./measurement";

export interface Sensor {
  id: number;
  last_update: Date;
  created_at: Date;
  device: number;
  gas_type: number;
}

export interface SensorWithLastMeasurement extends Sensor {
  last_measurement: Measurement;
}
