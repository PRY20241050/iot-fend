"use client";

import { Button } from "@/components/ui/button";
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
import Loader from "@/components/ui/Loader";
import { TypographyMuted } from "@/components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(3, { message: "El nombre de usuario es muy corto" }),
  password: z.string().min(1, { message: "La contraseña es obligatoria" }),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    reValidateMode: "onChange",
  });

  const {
    formState: { isValid },
  } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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
                  <Input placeholder="Usuario" {...field} />
                </FormControl>
                <FormDescription>Ingrese su nombre de usuario proporcionado</FormDescription>
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
            <Link href="/auth/recuperar-contrasena" className="font-medium decoration-1 text-black">Recuperar contraseña</Link>
          </TypographyMuted>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={!isValid} className="w-full">
            Iniciar sesión
            {/* <Loader /> */}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}