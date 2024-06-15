import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";

interface Props<TData> {
  table: Table<TData>;
}

export default function SimpleTablePagination<TData>({ table }: Props<TData>) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getPaginationRowModel().rows.length} de{" "}
        {table.getCoreRowModel().rows.length} registros
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
