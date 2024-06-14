import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BellIcon } from "@radix-ui/react-icons";

export function Notifications() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative rounded-full after:content-['3'] after:absolute after:-top-1 after:-right-2 after:bg-red-600 after:text-xs after:text-white after:rounded-full after:w-5 after:h-5 after:flex after:items-center after:justify-center"
        >
          <BellIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">Aquí va las notificaciones</PopoverContent>
    </Popover>
  );
}
