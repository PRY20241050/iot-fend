import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH4 } from "@/components/ui/typography";
import RestorePasswordForm from "./RestorePasswordForm";

export default function RestorePassword() {
  return (
    <>
      <CardHeader>
        <TypographyH4 className="text-center mb-3">IoT Monitoring</TypographyH4>
        <CardTitle>Restablecer contraseña</CardTitle>
        <CardDescription>
          Ingrese su nueva contraseña
        </CardDescription>
      </CardHeader>
      <RestorePasswordForm />
    </>
  );
}
