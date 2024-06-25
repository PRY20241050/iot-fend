import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";

export function formatDateToSpanishString(
  date: Date,
  timeZone = "America/Lima"
): string {
  const zonedDate = toZonedTime(date, timeZone);

  return format(zonedDate, "d 'de' MMMM 'de' yyyy 'a las' HH:mm", {
    locale: es,
  });
}
