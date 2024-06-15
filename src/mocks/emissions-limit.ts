import { EmissionsLimit } from "@/types/emissions-limit";

export const emissionsLimitTableData: EmissionsLimit[] = [
  {
    id: 1,
    limitName: "Límite 1",
    gases: ["SO2", "NO2"],
    emailAlert: true,
    appAlert: true,
  },
  {
    id: 2,
    limitName: "Límite 2",
    gases: ["CO", "PM10"],
    emailAlert: false,
    appAlert: true,
  },
  {
    id: 3,
    limitName: "Límite 3",
    gases: ["PM2.5"],
    emailAlert: false,
    appAlert: false,
  },
  {
    id: 4,
    limitName: "Límite 4",
    gases: ["SO2", "NO2", "CO", "PM10", "PM2.5"],
    emailAlert: true,
    appAlert: true,
  },
  {
    id: 5,
    limitName: "Límite 5",
    gases: ["SO2", "NO2", "CO", "PM10", "PM2.5"],
    emailAlert: true,
    appAlert: true,
  },
  {
    id: 6,
    limitName: "Límite 6",
    gases: ["SO2", "NO2", "CO", "PM10", "PM2.5"],
    emailAlert: true,
    appAlert: true,
  },
  {
    id: 7,
    limitName: "Límite 7",
    gases: ["SO2", "NO2", "CO", "PM10", "PM2.5"],
    emailAlert: true,
    appAlert: true,
  },
  {
    id: 8,
    limitName: "Límite 8",
    gases: ["SO2", "NO2", "CO", "PM10", "PM2.5"],
    emailAlert: true,
    appAlert: true,
  },
];
