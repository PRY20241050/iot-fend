"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getShortUsername } from "@/lib/helpers/string";
import {
  DASHBOARD_PATH,
  HISTORIAL_PATH,
  LIMITE_EMISIONES_PATH,
  LOGIN_PATH,
  PERFIL_PATH,
} from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function UserNav() {
  const { push } = useRouter();
  const { user, logOut, isBrickyard, isInstitution } = useAuthStore(
    (state) => ({
      user: state.user,
      isBrickyard: state.isBrickyard,
      isInstitution: state.isInstitution,
      logOut: state.logOut,
    })
  );

  const abrev = getShortUsername(user?.username ?? "");

  const setRol = () => {
    if (isBrickyard) return "Ladrillera";
    if (isInstitution) return user?.institution?.name;
    return "Usuario";
  };

  const signOut = () => {
    logOut();
    push(LOGIN_PATH);
  };

  console.log(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{abrev.toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal py-3 -mx-1 mb-1 px-3 -mt-1 bg-black">
          <p className="text-sm font-medium leading-none text-white">
            {setRol()}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isBrickyard && (
          <DropdownMenuGroup>
            <Link href={DASHBOARD_PATH}>
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
            </Link>
            <Link href={HISTORIAL_PATH}>
              <DropdownMenuItem>Historial de emisiones</DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        )}
        <DropdownMenuSeparator />
        <Link href={LIMITE_EMISIONES_PATH}>
          <DropdownMenuItem>Límite de emisiones</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={PERFIL_PATH}>
            <DropdownMenuItem>Mi perfil</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>Cerrar sesión</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
