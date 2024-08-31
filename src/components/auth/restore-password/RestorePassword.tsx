"use client";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH4, TypographyMuted } from "@/components/ui/typography";
import RestorePasswordForm from "./RestorePasswordForm";
import { Suspense, useState } from "react";
import Link from "next/link";

export default function RestorePassword() {
  const [submitted, setSubmitted] = useState(false);

  const successHeader = (
    <>
      <CardTitle>¡Listo!</CardTitle>
      <CardDescription>Su contraseña fue actualizada.</CardDescription>
      <TypographyMuted className="pt-3">
        <Link
          href="/auth/iniciar-sesion"
          className="font-medium decoration-1 text-black"
        >
          Volver al inicio de sesión
        </Link>
      </TypographyMuted>
    </>
  );

  const restorePasswordHeader = (
    <>
      <CardTitle>Restablecer contraseña</CardTitle>
      <CardDescription>Ingrese su nueva contraseña</CardDescription>
    </>
  );

  return (
    <>
      <CardHeader>
        <TypographyH4 className="text-center mb-3">IoT Monitoring</TypographyH4>
        {submitted ? successHeader : restorePasswordHeader}
      </CardHeader>
      {!submitted && (
        <Suspense>
          <RestorePasswordForm submitted={setSubmitted} />
        </Suspense>
      )}
    </>
  );
}
