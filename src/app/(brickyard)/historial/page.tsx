"use client";

import { Suspense } from "react";
import { History } from "@/components/brickyard/history";


export default function HistorialPage() {
  return (
    <Suspense>
      <History />
    </Suspense>
  );
}
