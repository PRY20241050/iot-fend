import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Props {
  page?: number;
  paginationInfo?: any;
  fetchNextPage?: () => void;
  fetchPrevPage?: () => void;
  hidePages?: boolean;
}

export default function SimpleTablePagination({
  page,
  paginationInfo,
  fetchNextPage,
  fetchPrevPage,
  hidePages = false,
}: Props) {
  const [totalPages, setTotalPages] = useState<number>(10);

  useEffect(() => {
    setTotalPages(Math.ceil(paginationInfo?.count / 10));
  }, [paginationInfo?.count]);

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      {!hidePages && (
        <div className="flex-1 text-sm text-muted-foreground">
          {page} de {totalPages} páginas
        </div>
      )}
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => fetchPrevPage?.()}
          disabled={paginationInfo?.previous == null}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fetchNextPage?.()}
          disabled={paginationInfo?.next == null}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
