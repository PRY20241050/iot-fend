export interface Measurement {
  id: number;
  value: number;
  date: Date;
  created_at: Date;
  sensor: number;
  status: any;
}

export interface MeasurementWithDevice {
  id: number;
  device_name: string;
  gas_abbreviation: string;
  date: string;
  value: number;
}
