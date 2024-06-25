"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import SimpleTablePagination from "./SimpleTablePagination";

interface Props<TData> {
  columns: ColumnDef<TData>[];
  data?: TData[];
  isLoading?: boolean;
  paginationInfo?: any;
  fetchData?: (newPage?: number) => void;
}

export default function HistoryTable<TData>({
  data = [],
  columns,
  isLoading = false,
  paginationInfo = {},
  fetchData,
}: Props<TData>) {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [localData, setLocalData] = React.useState<TData[]>(data);

  const dataQuery = useQuery({
    queryKey: ["data", pagination],
    queryFn: async () => {
      if (fetchData) {
        await fetchData(pagination.pageIndex + 1);
      }
      return data;
    },
    placeholderData: keepPreviousData,
  });

  React.useEffect(() => {
    if (dataQuery.data) {
      setLocalData(dataQuery.data);
    }
  }, [dataQuery.data]);

  const defaultData = React.useMemo(() => [], []);

  const table = useReactTable({
    data: localData ?? defaultData,
    columns: columns,
    rowCount: paginationInfo.count,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: false,
  });

  console.log(table);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <div className="py-4">
        <Card className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup: any) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header: any) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Cargando...
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row: any) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell: any) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        Sin resultados
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </Card>
        <SimpleTablePagination table={table} />
      </div>
    </QueryClientProvider>
  );
}
