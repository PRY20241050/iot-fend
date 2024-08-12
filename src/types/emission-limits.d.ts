import { DateTime } from "luxon";
import { LimitHistory } from "./limit-history";

export interface EmissionLimits {
  id: number;
  name: string;
  description: string;
  email_alert: boolean;
  app_alert: boolean;
  is_public: boolean;
  is_default: boolean;
  updated_at: DateTime;
  created_at: DateTime;
  brickyard: number | null;
  institution: number | null;
  management: number | null;
  limit_history: LimitHistory[];
}

export type CreateEmissionLimit = Omit<
  EmissionLimits,
  "id" | "updated_at" | "created_at",
  "limit_history" | "brickyard" | "institution" | "management"
> & {
  brickyard?: number;
  institution?: number;
  management?: number;
};
