"use client";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH4 } from "@/components/ui/typography";
import RecoverPasswordForm from "./RecoverPasswordForm";
import { Suspense, useState } from "react";

export default function RecoverPassword() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <CardHeader>
        <TypographyH4 className="text-center mb-3">IoT Monitoring</TypographyH4>
        {submitted ? (
          <>
            <CardTitle>¡Listo!</CardTitle>
            <CardDescription>
              Hemos enviado un correo electrónico con un enlace para
              restablecer su contraseña.
            </CardDescription>
          </>
        ) : (
          <>
            <CardTitle>Recuperar contraseña</CardTitle>
            <CardDescription>
              Le enviaremos un correo electrónico con un enlace para restablecer
              su contraseña
            </CardDescription>
          </>
        )}
      </CardHeader>
      {!submitted && (
        <Suspense>
          <RecoverPasswordForm submitted={setSubmitted} />
        </Suspense>
      )}
    </>
  );
}
