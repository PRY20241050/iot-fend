import { fetcher, post } from "@/lib/api/api";
import { MARK_MY_ALERTS_AS_READ_URL, MY_ALERTS_URL } from "./consts";
import { AlertPagination } from "@/types/alert";

export const markAllAlertsAsRead = async () => {
  return await post({
    url: `${MARK_MY_ALERTS_AS_READ_URL}?mark_all=true`,
  });
};

type getMyAlertsParams = {
  page?: number;
};

export const getMyAlerts = async ({
  page,
}: getMyAlertsParams): Promise<AlertPagination> => {
  return await fetcher<AlertPagination>({
    url: MY_ALERTS_URL,
    params: {
      ...(page && { page }),
    },
  });
};
