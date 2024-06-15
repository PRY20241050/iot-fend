import { History } from "@/types/history";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<History>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }: any) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "oven",
    header: "Horno",
    cell: ({ row }: any) => <div>{row.getValue("oven")}</div>,
  },
  {
    accessorKey: "gas",
    header: "Gas",
    cell: ({ row }: any) => <div>{row.getValue("gas")}</div>,
  },
  {
    accessorKey: "createdDate",
    header: "Fecha de registro",
    cell: ({ row }: any) => <div>{row.getValue("createdDate")}</div>,
  },
  {
    accessorKey: "concentration",
    header: "Concentración (mg/m3)",
    cell: ({ row }: any) => <div>{row.getValue("concentration")}</div>,
  },
];
