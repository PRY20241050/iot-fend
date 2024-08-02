"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormInput } from "@/components/ui/form";
import { TypographyMuted } from "@/components/ui/typography";

import Link from "next/link";

import useLoginForm from "./useLoginForm";
import { FormButton } from "@/components/ui/form";

export default function LoginForm() {
  const { form, isLoading, onSubmit } = useLoginForm();
  const {
    formState: { isValid },
  } = form;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <FormInput
            form={form}
            name="username"
            label="Usuario"
            placeholder="Usuario"
            description="Ingrese su nombre de usuario proporcionado"
          />
          <div className="pt-2">
            <FormInput
              form={form}
              name="password"
              label="Contraseña"
              placeholder="Contraseña"
              type="password"
            />
          </div>
          <TypographyMuted className="text-right pt-5">
            ¿Olvidaste tu contraseña?{" "}
            <Link
              href="/auth/recuperar-contrasena"
              className="font-medium decoration-1 text-black"
            >
              Recuperar contraseña
            </Link>
          </TypographyMuted>
        </CardContent>
        <CardFooter>
          <FormButton
            text="Iniciar sesión"
            isLoading={isLoading}
            disabled={!isValid || isLoading}
            className="w-full"
          />
        </CardFooter>
      </form>
    </Form>
  );
}
