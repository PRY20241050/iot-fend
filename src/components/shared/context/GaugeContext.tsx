import { createContext, useContext } from "react";

interface GaugeContextValue {
  isGauge: boolean;
}

export const GaugeContext = createContext<GaugeContextValue>({
  isGauge: true,
});

export const useGaugeContext = () => {
  const context = useContext(GaugeContext);
  if (!context) {
    throw new Error(
      "useGaugeContext must be used within a GaugeProvider"
    );
  }
  return context;
};
