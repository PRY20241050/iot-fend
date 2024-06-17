import { DateTime } from "luxon";
import { LimitHistory } from "./limit-history";

export interface EmissionsLimitDataTable {
  id: number;
  limitName: string;
  gases: string[];
  emailAlert: boolean;
  appAlert: boolean;
}

export interface EmissionsLimit {
  id: number;
  name: string;
  description: string;
  email_alert: boolean;
  app_alert: boolean;
  is_default: boolean;
  last_updated: DateTime;
  created_at: DateTime;
  institution: number;
  management: number;
  limit_history: LimitHistory[];
}
