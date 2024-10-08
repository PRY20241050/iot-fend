/* eslint-disable react-hooks/rules-of-hooks */
import { MeasurementWithDevice } from "@/types/measurement";
import { ColumnDef } from "@tanstack/react-table";
import { formatDateToSpanishString } from "@/lib/helpers/date";
import { useFilterStore } from "@/store/useFilterStore";

export const columnsHistoryTable: ColumnDef<MeasurementWithDevice>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }: any) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "device_name",
    header: "Horno",
    cell: ({ row }: any) => <div>{row.getValue("device_name")}</div>,
  },
  {
    accessorKey: "gas_abbreviation",
    header: "Gas",
    cell: ({ row }: any) => <div>{row.getValue("gas_abbreviation")}</div>,
  },
  {
    accessorKey: "date",
    header: "Fecha de registro",
    cell: ({ row }: any) => {
      const { scale } = useFilterStore((state) => ({
        scale: state.scale,
      }));

      return (
        <div>
          {formatDateToSpanishString(
            row.getValue("date"),
            "America/Lima",
            scale ? (scale as any) : "second"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "value",
    header: "Concentración (mg/m3)",
    cell: ({ row }: any) => <div>{row.getValue("value")}</div>,
  },
];
