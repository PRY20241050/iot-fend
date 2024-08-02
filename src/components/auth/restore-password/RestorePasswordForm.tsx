"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormButton,
  FormInput,
} from "@/components/ui/form";
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
          <FormInput
            form={form}
            name="password"
            label="Nueva contraseña"
            placeholder="Nueva contraseña"
            type="password"
          />
          <div className="pt-2">
            <FormInput
              form={form}
              name="confirm_password"
              label="Confirmar contraseña"
              placeholder="Confirmar contraseña"
              type="password"
              description="Repita su nueva contraseña"
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
