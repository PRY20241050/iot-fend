import { useEffect, useState } from "react";

import { type PaginationResponse } from "@/types/models";

/**
 * Hook to handle fetching paginated data.
 *
 * @param fetchDataFunction - A function that returns a promise with paged data.
 *                            Must accept search parameters and a page number.
 * @param initialParams     - Initial parameters for the data fetch function.
 *
 * @param groupResults      - If true, the results of each page will be concatenated.
 *
 * @param showDefaultError  - If true, a default error message will be shown when the fetch fails.
 *
 * @returns An object containing:
 *          - items: List of items obtained.
 *          - paginationInfo: Information about the pagination of the data obtained.
 *          - isLoading: Loading status.
 *          - page: Current page number.
 *          - fetchData: Function to load data.
 *          - updateParams: Function to update search parameters.
 *          - resetItems: Function to reset the list of items.
 *
 * @template T - Type of the search parameters.
 * @template U - Type of the elements in the data list.
 * @template V - Type of the pagination information.
 */

interface UsePaginationFetchDataReturn<
  T,
  U,
  V extends PaginationResponse<U> = PaginationResponse<U>
> {
  items?: U[];
  setItems: React.Dispatch<React.SetStateAction<U[] | undefined>>;
  paginationInfo?: V;
  isLoading: boolean;
  page: number;
  hasNext: boolean;
  fetchData: (newPage?: number) => void;
  refetch: () => void;
  updateParams: (newParams: T) => void;
  resetItems: () => void;
  resetAll: () => void;
}

export function usePaginationFetchData<
  T,
  U,
  V extends PaginationResponse<U> = PaginationResponse<U>
>(
  fetchDataFunction: (params: T) => Promise<V>,
  initialParams: T,
  groupResults = false,
  showDefaultError = true
): UsePaginationFetchDataReturn<T, U, V> {
  const [items, setItems] = useState<U[]>();
  const [paginationInfo, setPaginationInfo] = useState<V>();
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [params, setParams] = useState<T>(initialParams);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const fetchData = (newPage = 1) => {
    setPage(newPage);
    setIsLoading(true);

    fetchDataFunction({ ...params, page: newPage })
      .then((data) => {
        setPaginationInfo(data);
        setHasNext(data.next !== null);
        if (groupResults) {
          setItems((prev) =>
            newPage === 1 ? data.results : prev?.concat(data.results)
          );
        } else setItems(data.results);
      })
      .catch(() => {
        if (showDefaultError)
          console.error("Hubo un error al cargar los resultados");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const updateParams = (newParams: T) => {
    setParams(newParams);
  };

  const resetItems = () => {
    setItems([]);
  };

  const resetAll = () => {
    setHasNext(false);
    resetItems();
    setPage(1);
  };

  const refetch = () => {
    resetAll();
    fetchData();
  };

  return {
    items,
    setItems,
    paginationInfo,
    isLoading,
    page,
    hasNext,
    resetAll,
    refetch,
    fetchData,
    updateParams,
    resetItems,
  };
}
