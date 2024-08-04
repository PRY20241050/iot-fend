"use client";

import { Form, FormButton, FormInput } from "@/components/ui/form";
import useChangePasswordForm from "./useChangePasswordForm";

export default function ChangePasswordForm() {
  const { form, onSubmit, isLoading } = useChangePasswordForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 pt-4 phone-xl:max-w-[75%]"
      >
        <FormInput
          form={form}
          name="old_password"
          label="Contraseña actual"
          type="password"
        />
        <FormInput
          form={form}
          name="new_password"
          label="Nueva contraseña"
          type="password"
        />
        <div className="pt-6 flex flex-col-reverse gap-3 phone-lg:flex-row phone-lg:justify-end">
          <FormButton
            isLoading={isLoading}
            disabled={isLoading || !form.formState.isValid}
            text="Actualizar contraseña"
          />
        </div>
      </form>
    </Form>
  );
}
