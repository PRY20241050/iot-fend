import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH4 } from "@/components/ui/typography";
import LoginForm from "./LoginForm";
import { Suspense } from "react";

export default function Login() {
  return (
    <>
      <CardHeader>
        <TypographyH4 className="text-center mb-3">IoT Monitoring</TypographyH4>
        <CardTitle>Iniciar sesión</CardTitle>
        <CardDescription>
          Iniciar sesión para acceder al dashboard
        </CardDescription>
      </CardHeader>
      <Suspense>
        <LoginForm />
      </Suspense>
    </>
  );
}
