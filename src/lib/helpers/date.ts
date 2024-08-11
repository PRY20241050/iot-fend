import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInYears,
  format,
} from "date-fns";
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

export function formatDateBackward(
  date: Date,
  timeZone = "America/Lima"
): string {
  const zonedDate = toZonedTime(date, timeZone);
  const now = new Date();

  const minutesDiff = differenceInMinutes(now, zonedDate);
  if (minutesDiff < 1) {
    return "Ahora";
  }

  const hoursDiff = differenceInHours(now, zonedDate);
  if (hoursDiff < 1) {
    return `Hace ${minutesDiff} minutos`;
  }

  const daysDiff = differenceInDays(now, zonedDate);
  if (hoursDiff == 1) {
    return `Hace ${hoursDiff} hora`;
  }

  if (hoursDiff < 24) {
    return `Hace ${hoursDiff} horas`;
  }

  if (daysDiff == 1) {
    return `Hace ${daysDiff} día`;
  }

  if (daysDiff < 7) {
    return `Hace ${daysDiff} días`;
  }

  const yearsDiff = differenceInYears(now, zonedDate);
  if (yearsDiff < 1) {
    return format(zonedDate, "d MMMM 'a las' HH:mm", {
      locale: es,
    });
  }

  return format(zonedDate, "d MMMM 'de' yyyy 'a las' HH:mm", {
    locale: es,
  });
}
