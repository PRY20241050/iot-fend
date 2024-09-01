/* eslint-disable react-hooks/rules-of-hooks */
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
import { deleteEmissionLimit } from "@/services/emission-limits";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useToast } from "../ui/use-toast";
import { DEFAULT_ERROR } from "@/lib/utils";

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
            return GASES[limit.gas_type - 1]?.label;
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
    accessorKey: "is_active",
    header: "Activo",
    cell: ({ row }: any) => (
      <div>{booleanToYesNo(row.getValue("is_active"))}</div>
    ),
  },
  {
    accessorKey: "is_public",
    header: "Público",
    cell: ({ row }: any) => (
      <div>{booleanToYesNo(row.getValue("is_public"))}</div>
    ),
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const { toast } = useToast();
      const router = useRouter();

      const handleEdit = () => {
        router.push(`/limite-emisiones/${row.original.id}/editar`);
      };

      const handleDelete = () => {
        const body = document.getElementById("root-body");

        deleteEmissionLimit(row.original.id)
          .then(() => {
            toast({
              description: "Límite de emisiones eliminado correctamente",
            });
          })
          .catch(() => {
            toast({
              variant: "destructive",
              title: DEFAULT_ERROR.header,
              description: "Error eliminando el límite de emisiones",
            });
          })
          .finally(() => {
            setTimeout(() => {
              body?.style.removeProperty("pointer-events");
              router.refresh();
            }, 800);
          });
      };

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menú</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>Editar</DropdownMenuItem>
              <DialogTrigger asChild>
                <DropdownMenuItem>Eliminar</DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Eliminar límite</DialogTitle>
              <DialogDescription>
                ¿Estás seguro de que deseas eliminar este límite de emisiones?
                Todos los datos relacionados con este límite se perderán.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancelar</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleDelete}>Eliminar</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
