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
  timeZone = "America/Lima",
  precision: "day" | "hour" | "minute" | "second" = "second"
): string {
  const zonedDate = toZonedTime(date, timeZone);

  let formatString = "d 'de' MMMM 'de' yyyy 'a las' HH:mm:ss";

  if (precision === "minute" || precision === "hour") {
    formatString = "d 'de' MMMM 'de' yyyy 'a las' HH:mm";
  }

  if (precision === "day") {
    formatString = "d 'de' MMMM 'de' yyyy";
  }

  return format(zonedDate, formatString, {
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

export function formatDateToTimeforChart(
  date: Date,
  timeZone = "America/Lima",
  precision: "day" | "hour" | "minute" | "second" = "second"
): string {
  const zonedDate = toZonedTime(date, timeZone);
  const now = new Date();

  let baseFormat: string;

  if (now.getDate() === zonedDate.getDate()) {
    if (precision === "day") baseFormat = "d'/'MM";
    else baseFormat = "";
  } else if (now.getFullYear() === zonedDate.getFullYear()) {
    baseFormat = "d'/'MM";
  } else {
    console.log("else");
    baseFormat = "d'/'MM'/'yyyy";
  }

  const precisionFormatMap = {
    hour: " HH:mm",
    minute: " HH:mm",
    second: " HH:mm:ss",
    day: "",
  };

  const formatString = baseFormat + precisionFormatMap[precision];

  return format(zonedDate, formatString, { locale: es });
}
