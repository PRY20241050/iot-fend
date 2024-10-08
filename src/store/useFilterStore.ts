import { create } from "zustand";

export interface FilterStoreValues {
  dateFrom?: Date;
  dateTo?: Date;
  scale?: string;
  device?: string;
  emissionLimit?: string;
  gases: number[];
}

interface FilterStoreActions {
  setFilter: (filter: FilterStoreValues) => void;
  getFilter: () => FilterStoreValues;
  resetFilter: () => void;
}

interface FilterStore extends FilterStoreValues, FilterStoreActions {}

export const useFilterStore = create<FilterStore>((set, get) => ({
  dateFrom: undefined,
  dateTo: undefined,
  scale: undefined,
  device: undefined,
  emissionLimit: undefined,
  gases: [],
  setFilter: (filter: FilterStoreValues) => set({ ...filter }),
  getFilter: () => get(),
  resetFilter: () =>
    set({
      dateFrom: undefined,
      dateTo: undefined,
      scale: '',
      device: '',
      emissionLimit: '',
      gases: [],
    }),
}));
