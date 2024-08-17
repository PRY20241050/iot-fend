"use client";

import { Button } from "@/components/ui/button";
import { TypographyMuted } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

export default function SubNavbar({ className }: Props) {
  const { back } = useRouter();

  return (
    <div className={cn("w-full bg-white z-30", className)}>
      <div className="flex items-center px-4 inner-wrapper mx-auto mt-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => back()}
          className="flex justify-center items-center gap-2 px-3"
        >
          <ArrowLeftIcon className="h-5 w-5 text-muted-foreground" />
          <TypographyMuted>Volver</TypographyMuted>
        </Button>
      </div>
    </div>
  );
}
