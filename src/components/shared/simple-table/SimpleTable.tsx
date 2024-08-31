"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
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
import Loader from "@/components/ui/loader";
import { cn } from "@/lib/utils";

interface Props<TData> {
  columns: ColumnDef<TData>[];
  data?: TData[];
  isLoading?: boolean;
  page?: number;
  paginationInfo?: any;
  fetchNextPage?: () => void;
  fetchPrevPage?: () => void;
  tableRowClass?: string;
  className?: string;
}

export default function SimpleTable<TData>({
  data = [],
  columns,
  isLoading = false,
  page,
  paginationInfo,
  fetchNextPage,
  fetchPrevPage,
  tableRowClass,
  className,
}: Props<TData>) {
  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const hasResults = table.getRowModel().rows?.length > 0;

  return (
    <div className={cn(className)}>
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
                  <Loader className="border-primary">Cargando...</Loader>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {hasResults ? (
                  table.getRowModel().rows.map((row: any) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className={tableRowClass}
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
      <SimpleTablePagination
        page={page}
        hidePages={!hasResults}
        paginationInfo={paginationInfo}
        fetchNextPage={fetchNextPage}
        fetchPrevPage={fetchPrevPage}
      />
    </div>
  );
}
