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
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function UserNav() {
  const { replace } = useRouter();
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
    if (isInstitution) return "Institución";
    return "Usuario";
  };

  const signOut = () => {
    logOut();
    replace("/auth/iniciar-sesion");
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
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Emisiones</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <Link href="/dashboard">
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                </Link>
                <Link href="/historial">
                  <DropdownMenuItem>Historial</DropdownMenuItem>
                </Link>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <Link href="/limite-emisiones">
            <DropdownMenuItem>Límite de emisiones</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/perfil">
            <DropdownMenuItem>Mi perfil</DropdownMenuItem>
          </Link>
          <Link href="/configuracion">
            <DropdownMenuItem>Configuración</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>Cerrar sesión</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
