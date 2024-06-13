"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TypographyMuted } from "@/components/ui/typography";
import Link from "next/link";
import useRecoverPasswordForm from "./useRecoverPasswordForm";
import FormButton from "@/components/ui/formButton";

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
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormDescription>
                  Ingrese el email asociado a su cuenta
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
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
