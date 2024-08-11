import { DateTime } from "luxon";
import { Sensor } from "./sensor";

export interface Device {
  id: number;
  name: string;
  description: string;
  status: boolean;
  battery_level: number;
  updated_at: DateTime;
  created_at: DateTime;
  brickyard: number;
  sensors: Sensor[];
}
