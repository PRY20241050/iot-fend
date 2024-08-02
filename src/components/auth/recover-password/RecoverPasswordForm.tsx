"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormButton,
  FormInput,
} from "@/components/ui/form";
import { TypographyMuted } from "@/components/ui/typography";
import Link from "next/link";
import useRecoverPasswordForm from "./useRecoverPasswordForm";

interface Props {
  submitted: (value: boolean) => void;
}

export default function RecoverPasswordForm({ submitted }: Props) {
  const { form, isLoading, onSubmit } = useRecoverPasswordForm({ submitted });

  const {
    formState: { isValid },
  } = form;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <FormInput
            form={form}
            name="email"
            label="Correo electrónico"
            placeholder="Email"
            description="Ingrese el email asociado a su cuenta"
          />
          <TypographyMuted className="text-right pt-5">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/auth/iniciar-sesion"
              className="font-medium decoration-1 text-black"
            >
              Iniciar sesión
            </Link>
          </TypographyMuted>
        </CardContent>
        <CardFooter>
          <FormButton
            text="Enviar correo"
            isLoading={isLoading}
            disabled={!isValid || isLoading}
            className="w-full"
          />
        </CardFooter>
      </form>
    </Form>
  );
}
