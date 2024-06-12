import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <body>
      <main className="flex items-center justify-center h-screen bg-back">
        <Card className="w-[450px] max-w-[90%]">{children}</Card>
      </main>
    </body>
  );
}
