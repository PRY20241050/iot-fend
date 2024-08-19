import {
  DASHBOARD_PATH,
  dashboardBrickyardPath,
  HISTORIAL_PATH,
  historialBrickyardPath,
  LIMITE_EMISIONES_PATH,
  limiteEmisionesBrickyardPath,
} from "@/lib/utils";

export const getSubNavbarItems = (id: string | undefined) => {
  const SUBNAVBAR_ITEMS = [
    {
      id: 1,
      label: "Dashboard",
      href: id ? dashboardBrickyardPath(id) : DASHBOARD_PATH,
    },
    {
      id: 2,
      label: "Historial de emisiones",
      href: id ? historialBrickyardPath(id) : HISTORIAL_PATH,
    },
    {
      id: 3,
      label: "Límites de emisiones",
      href: id ? limiteEmisionesBrickyardPath(id) : LIMITE_EMISIONES_PATH,
    },
  ];

  return SUBNAVBAR_ITEMS;
};
