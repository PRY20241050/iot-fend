import { usePaginationFetchData } from "@/hooks/usePaginationFetchData";
import { getMyAlerts, markAllAlertsAsRead } from "@/services/alerts";
import { Alert, AlertPagination } from "@/types/alert";
import { useState } from "react";

export default function useNotifications() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    items: alertsData,
    paginationInfo,
    page,
    fetchData,
  } = usePaginationFetchData<any, Alert, AlertPagination>(getMyAlerts, {}, true);

  const fetchMoreAlerts = () => {
    fetchData(page + 1);
  };

  const markAllAsRead = () => {
    setIsLoading(true);

    markAllAlertsAsRead()
      .then(() => {
        // mutate();
      })
      .catch(() => {
        console.error("Error marking all as read");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    isLoading,
    alertsData,
    paginationInfo,
    page,
    fetchMoreAlerts,
    markAllAsRead,
  };
}
