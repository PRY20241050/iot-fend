import { TypographyMuted, TypographySmall } from "@/components/ui/typography";
import { formatDateBackward } from "@/lib/helpers/date";
import { cn } from "@/lib/utils";
import { Alert } from "@/types/alert";

interface Props {
  data: Alert;
}

export default function NotificationCard({ data }: Props) {
  return (
    <div
      key={data.id}
      className={cn(
        "relative flex flex-col items-center justify-between rounded-md p-3 shadow-sm space-y-1",
        { "bg-primary/5 before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-primary": !data.is_read }
      )}
    >
      <TypographySmall className="text-xs font-semibold w-full">
        {data.name}
      </TypographySmall>
      <TypographyMuted className="text-xs w-full line-clamp-2">
        {data.description}
      </TypographyMuted>
      <TypographyMuted className="text-xs w-full text-right">
        {formatDateBackward(data.created_at)}
      </TypographyMuted>
    </div>
  );
}
