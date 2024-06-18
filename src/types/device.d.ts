import { DateTime } from "luxon";
import { Sensor } from "./sensor";

export interface Device {
  id: number;
  name: string;
  description: string;
  status: boolean;
  battery_level: number;
  last_update: DateTime;
  created_at: DateTime;
  brickyard: number;
  sensors: Sensor[];
}
