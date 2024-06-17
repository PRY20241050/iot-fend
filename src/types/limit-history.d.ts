import { DateTime } from "luxon";

export interface LimitHistory {
  id?: number;
  max_limit: number;
  start_date?: DateTime;
  end_date?: DateTime;
  is_modified: boolean;
  last_update?: DateTime;
  created_at?: DateTime;
  emission_limit: number;
  gas_type: number;
}
