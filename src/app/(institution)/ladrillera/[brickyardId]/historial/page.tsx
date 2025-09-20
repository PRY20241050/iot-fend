"use client";

import { History } from "@/components/brickyard/history";
import { Suspense } from "react";

export default function LadrilleraHistorialPage() {
  return (
    <Suspense>
      <History />
    </Suspense>
  );
}
