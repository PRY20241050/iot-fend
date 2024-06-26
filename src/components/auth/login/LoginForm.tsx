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
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuario</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Usuario"
                    autoComplete="username"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Ingrese su nombre de usuario proporcionado
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Contraseña"
                      type="password"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
