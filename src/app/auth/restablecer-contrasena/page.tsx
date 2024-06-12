"use client";

import { RestorePassword } from "@/components/auth/restorePassword";
import { redirect, useSearchParams } from "next/navigation";

export default function RestablecerContrasenaPage() {
  const searchParams = useSearchParams();

  if (searchParams.has("token") && searchParams.has("uid")) {
    return <RestorePassword />;
  }
  else {
    redirect("/auth/iniciar-sesion");
  }
}
