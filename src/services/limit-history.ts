import { patch, post } from "@/lib/api/api";
import { CreateLimitHistory, EditLimitHistory, LimitHistory } from "@/types/limit-history";
import { LIMIT_HISTORY_URL, limitHistoryByIdUrl } from "./consts";

export const createLimitHistory = async (data: CreateLimitHistory) => {
  return await post<LimitHistory>({
    url: LIMIT_HISTORY_URL,
    params: data,
  });
};

export const editLimitHistory = async (data: EditLimitHistory, id: number) => {
  return await patch<LimitHistory>({
    url: limitHistoryByIdUrl(id.toString()),
    params: data,
  });
};
