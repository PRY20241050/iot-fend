export interface LimitHistory {
  id?: number;
  max_limit: number;
  start_date?: Date;
  end_date?: Date;
  is_modified: boolean;
  updated_at?: Date;
  created_at?: Date;
  emission_limit: number;
  gas_type: number;
}

export type CreateLimitHistory = Omit<
  LimitHistory,
  "id" | "updated_at" | "created_at"
>
