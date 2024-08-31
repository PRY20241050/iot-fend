"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { BellIcon } from "@radix-ui/react-icons";
import NotificationCard from "./NotificationCard";
import useNotifications from "./useNotifications";

export default function Notifications() {
  const {
    isLoading,
    markAllAsRead,
    alertsData,
    paginationInfo,
    fetchMoreAlerts,
  } = useNotifications();

  const unreadCount = paginationInfo?.unread_count ?? 0;

  const badgetCountLabel = () => {
    if (unreadCount > 9) return "9+";
    return unreadCount;
  };

  const notificationButton = (
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
  );

  const popoverHeader = (
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
  );

  return (
    <Popover>
      <PopoverTrigger asChild>{notificationButton}</PopoverTrigger>
      <PopoverContent
        id="popover-content"
        align="end"
        className="p-0 max-h-[60vh] w-80 overflow-y-scroll"
      >
        {popoverHeader}
        <InfiniteScroll
          dataLength={alertsData?.length ?? 0}
          loader={<Loader className="border-primary" />}
          next={() => {
            fetchMoreAlerts();
          }}
          hasMore={paginationInfo?.next !== null}
          endMessage={
            <div className="text-center text-xs py-2 font-bold">
              No hay más notificaciones{" "}
            </div>
          }
          scrollThreshold={0.7}
          scrollableTarget="popover-content"
          className="space-y-2 p-[10px]"
        >
          {alertsData?.map((alert) => (
            <NotificationCard key={alert.id} data={alert} />
          ))}
        </InfiniteScroll>
      </PopoverContent>
    </Popover>
  );
}
