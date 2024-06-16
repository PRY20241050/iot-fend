"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useEmissionsLimitAddForm from "./useEmissionsLimitAddForm";
import { Input } from "@/components/ui/input";

export default function EmissionsLimitAddForm() {
  const { form, isLoading, onSubmit } = useEmissionsLimitAddForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nombre"
                  autoComplete="username"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Proporciona un nombre descriptivo para el nuevo límite. Ejemplo:
                &quot;Trabajadores de la ladrillera&quot; o &quot;Horno de ladrillos&quot;
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> 
      </form>
    </Form>
  );
}
