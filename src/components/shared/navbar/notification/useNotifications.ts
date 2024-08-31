import { useToast } from "@/components/ui/use-toast";
import { usePaginationFetchData } from "@/hooks/usePaginationFetchData";
import { DEFAULT_ERROR } from "@/lib/utils";
import { getMyAlerts, markAllAlertsAsRead } from "@/services/alerts";
import { Alert, AlertPagination } from "@/types/alert";
import { useState } from "react";

export default function useNotifications() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const {
    items: alertsData,
    paginationInfo,
    page,
    refetch: refetchAlerts,
    fetchData,
  } = usePaginationFetchData<any, Alert, AlertPagination>(
    getMyAlerts,
    {},
    true
  );

  const fetchMoreAlerts = () => {
    fetchData(page + 1);
  };

  const markAllAsRead = () => {
    setIsLoading(true);

    markAllAlertsAsRead()
      .then(() => {
        refetchAlerts();
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: DEFAULT_ERROR.header,
          description:
            "Hubo un error al marcar todas las notificaciones como leídas",
        });
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
