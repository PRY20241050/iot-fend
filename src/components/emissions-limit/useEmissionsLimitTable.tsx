import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { EmissionsLimit } from "@/types/emissions-limit";
import { booleanToYesNo } from "@/lib/helpers/string";
import { useRouter } from "next/navigation";

export const columnsEmissionsLimitTable: ColumnDef<EmissionsLimit>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }: any) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "limitName",
    header: "Nombre del límite",
    cell: ({ row }: any) => <div>{row.getValue("limitName")}</div>,
  },
  {
    accessorKey: "gases",
    header: "Gases aplicables",
    cell: ({ row }: any) => <div>{row.getValue("gases").join(", ")}</div>,
  },
  {
    accessorKey: "emailAlert",
    header: "Alertas por correo",
    cell: ({ row }: any) => (
      <div>{booleanToYesNo(row.getValue("emailAlert"))}</div>
    ),
  },
  {
    accessorKey: "appAlert",
    header: "Alertas por aplicación",
    cell: ({ row }: any) => (
      <div>{booleanToYesNo(row.getValue("appAlert"))}</div>
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
      }

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
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleEdit}
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

