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
import FormButton from "@/components/ui/formButton";
import { Input } from "@/components/ui/input";
import useRestorePasswordForm from "./useRestorePasswordForm";

interface Props {
  submitted: (value: boolean) => void;
}

export default function RestorePasswordForm({ submitted }: Props) {
  const { form, onSubmit, isLoading } = useRestorePasswordForm({ submitted });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nueva contraseña</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nueva contraseña"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-2">
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar contraseña</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirmar contraseña"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Repita su nueva contraseña</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
        <CardFooter>
          <FormButton
            text="Restablecer contraseña"
            isLoading={isLoading}
            disabled={isLoading}
            className="w-full"
          />
        </CardFooter>
      </form>
    </Form>
  );
}
