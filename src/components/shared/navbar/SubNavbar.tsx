"use client";

import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { getSubNavbarItems } from "@/mocks/navbar";

interface Props {
  className?: string;
}

export default function SubNavbar({ className }: Props) {
  const pathname = usePathname();
  const { brickyardId } = useParams();

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center mx-auto">
        <NavigationMenu>
          <NavigationMenuList className="space-x-0">
            {getSubNavbarItems(String(brickyardId)).map((item) => (
              <NavigationMenuItem
                key={item.id}
                className={cn({
                  "border-b-primary border-b-2": pathname === item.href,
                })}
              >
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* <Button
          variant="ghost"
          size="sm"
          onClick={() => back()}
          className="flex justify-center items-center gap-2 px-3"
        >
          <ArrowLeftIcon className="h-5 w-5 text-muted-foreground" />
          <TypographyMuted>Volver</TypographyMuted>
        </Button> */}
      </div>
    </div>
  );
}
