"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { PROFILE_MENU } from "@/mocks/profile";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ProfileMenu() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col gap-2 w-full phone-xl:w-[30%]">
      {PROFILE_MENU.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className={cn("relative", {
            "before:absolute before:h-full before:w-1 before:bg-primary before:rounded-md":
              pathname === item.href,
          })}
        >
          <Button
            variant="ghost"
            size="default"
            className={cn("w-full justify-start", {
              "bg-accent text-accent-foreground": pathname === item.href,
            })}
          >
            {item.title}
          </Button>
        </Link>
      ))}
    </aside>
  );
}
