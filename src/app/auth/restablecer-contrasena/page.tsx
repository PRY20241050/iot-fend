"use client";

import { RestorePassword } from "@/components/auth/restore-password";
import { LOGIN_PATH } from "@/lib/utils";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function RestablecerContrasenaPage() {
  const searchParams = useSearchParams();

  if (searchParams.has("token") && searchParams.has("uid")) {
    return <RestorePassword />;
  } else {
    redirect(LOGIN_PATH);
  }
}

export default function RestablecerContrasenaPageWrapper() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <RestablecerContrasenaPage />
    </Suspense>
  );
}
