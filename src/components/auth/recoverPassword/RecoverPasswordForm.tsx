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
  email: z.string().email({ message: "El correo electrónico no es válido" }),
});

interface Props {
  submitted: (value: boolean) => void;
}

export default function RecoverPasswordForm({ submitted }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
    reValidateMode: "onChange",
  });

  const {
    formState: { isValid },
  } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    submitted(true);
  }

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
          <Button type="submit" disabled={!isValid} className="w-full">
            Enviar correo
            {/* <Loader /> */}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
