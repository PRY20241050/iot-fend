import { FilterFormValues } from "@/components/shared/filter/useFilterForm";
import { create } from "zustand";

interface FilterStore extends FilterFormValues {
  setFilter: (filter: FilterFormValues) => void;
  resetFilter: () => void;
}

export const useFilterStore = create<FilterStore>((set, get) => ({
  dateFrom: undefined,
  dateTo: undefined,
  scale: undefined,
  device: undefined,
  gases: [],
  setFilter: (filter: FilterFormValues) => set({ ...filter }),
  resetFilter: () =>
    set({
      dateFrom: undefined,
      dateTo: undefined,
      scale: undefined,
      device: undefined,
      gases: [],
    }),
}));
