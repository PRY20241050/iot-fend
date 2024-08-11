import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { EmissionLimits } from "@/types/emission-limits";
import { booleanToYesNo } from "@/lib/helpers/string";
import { useRouter } from "next/navigation";
import { LimitHistory } from "@/types/limit-history";
import { GASES } from "@/mocks/filter";

export const columnsEmissionsLimitTable: ColumnDef<EmissionLimits>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }: any) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: "Nombre del límite",
    cell: ({ row }: any) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "limit_history",
    header: "Gases aplicables",
    cell: ({ row }: any) => (
      <div>
        {row
          .getValue("limit_history")
          .map((limit: LimitHistory) => {
            return GASES[limit.gas_type].label;
          })
          .join(", ")}
      </div>
    ),
  },
  {
    accessorKey: "email_alert",
    header: "Alertas por correo",
    cell: ({ row }: any) => (
      <div>{booleanToYesNo(row.getValue("email_alert"))}</div>
    ),
  },
  {
    accessorKey: "app_alert",
    header: "Alertas por aplicación",
    cell: ({ row }: any) => (
      <div>{booleanToYesNo(row.getValue("app_alert"))}</div>
    ),
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();

      const handleEdit = () => {
        router.push(`/limite-emisiones/${row.original.id}`);
      };

      const handleDelete = () => {
        console.log("Delete", row.original);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>Editar</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
