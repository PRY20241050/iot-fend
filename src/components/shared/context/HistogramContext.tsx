import { createContext, useContext } from "react";

interface HistogramContextValue {
  isHistogram: boolean;
}

export const HistogramContext = createContext<HistogramContextValue>({
  isHistogram: true,
});

export const useHistogramContext = () => {
  const context = useContext(HistogramContext);
  if (!context) {
    throw new Error(
      "useHistogramContext must be used within a HistogramProvider"
    );
  }
  return context;
};
