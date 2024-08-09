import { post } from "@/lib/api/api";
import { MARK_MY_ALERTS_AS_READ_URL } from "./consts";

export const markAllAlertsAsRead = async () => {
  return await post({
    url: `${MARK_MY_ALERTS_AS_READ_URL}?mark_all=true`,
  });
};
