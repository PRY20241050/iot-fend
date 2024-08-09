"use client";

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRequest } from "@/lib/api/swr";
import { cn } from "@/lib/utils";
import { MY_ALERTS_URL } from "@/services/consts";
import { AlertPagination } from "@/types/alert";
import { BellIcon } from "@radix-ui/react-icons";
import NotificationCard from "./NotificationCard";
import { markAllAlertsAsRead } from "@/services/alerts";
import { useState } from "react";

export default function Notifications() {
  const [isLoading, setIsLoading] = useState(false);

  const { data: alertsData, isLoading: alertsIsLoading, mutate } =
    useRequest<AlertPagination>({
      url: MY_ALERTS_URL,
    });

  const unreadCount = alertsData?.unread_count ?? 0;

  const badgetCountLabel = () => {
    if (unreadCount > 9) return "9+";
    return unreadCount;
  };

  const markAllAsRead = () => {
    setIsLoading(true);

    markAllAlertsAsRead()
      .then(() => {
        mutate();
      })
      .catch(() => {
        console.error("Error marking all as read");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          data-content={badgetCountLabel()}
          className={cn("relative rounded-full", {
            "after:content-[attr(data-content)] after:absolute after:-top-1 after:-right-2 after:bg-red-600 after:text-xs after:text-white after:rounded-md after:w-5 after:h-5 after:flex after:items-center after:justify-center":
              unreadCount > 0,
          })}
        >
          <BellIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="p-0 max-h-[60vh] overflow-y-hidden w-80"
      >
        {alertsIsLoading ? (
          <Loader className="border-primary" />
        ) : (
          <>
            <div className="flex justify-between items-center pt-1 px-[10px]">
              <div className="text-xs font-bold">Notificaciones</div>
              <Button
                size="sm"
                variant="link"
                onClick={markAllAsRead}
                disabled={isLoading}
              >
                Marcar todo como leído
              </Button>
            </div>
            <div className="space-y-2 p-[10px] max-h-[calc(60vh-36px)] overflow-y-scroll">
              {alertsData?.results.map((alert) => (
                <NotificationCard key={alert.id} data={alert} />
              ))}
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
