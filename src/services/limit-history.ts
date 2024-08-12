import { post } from "@/lib/api/api";
import { CreateLimitHistory, LimitHistory } from "@/types/limit-history";
import { LIMIT_HISTORY_URL } from "./consts";

export const createLimitHistory = async (data: CreateLimitHistory) => {
    return await post<LimitHistory>({
        url: LIMIT_HISTORY_URL,
        params: data,
    });
}

