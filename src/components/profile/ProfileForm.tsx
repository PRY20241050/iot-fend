"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Form, FormInput } from "../ui/form";
import useProfileForm from "./useProfileForm";
import { TypographyH4 } from "../ui/typography";

export default function ProfileForm() {
  const { user, isBrickyard } = useAuthStore((state) => ({
    user: state.user,
    isBrickyard: state.isBrickyard,
  }));
  const { form } = useProfileForm({
    user,
    isBrickyard,
  });

  return (
    <Form {...form}>
      <form className="space-y-3 pt-4 phone-xl:max-w-[75%]">
        <div className="flex gap-6">
          <FormInput
            form={form}
            name="first_name"
            label="Nombres"
            disabled
            className="w-full"
          />
          <FormInput
            form={form}
            name="last_name"
            label="Apellidos"
            disabled
            className="w-full"
          />
        </div>
        <FormInput
          form={form}
          name="username"
          label="Nombre de usuario"
          disabled
        />
        <FormInput
          form={form}
          name="email"
          label="Correo electrónico"
          disabled
        />
        <FormInput form={form} name="role" label="Cargo" disabled />
        <TypographyH4 className="pt-3 tablet-xl:pt-5">Organización</TypographyH4>
        {isBrickyard && (
          <>
            <FormInput
              form={form}
              name="brickyard_name"
              label="Empresa"
              disabled
            />
            <FormInput
              form={form}
              name="brickyard_address"
              label="Dirección"
              disabled
            />
            <FormInput
              form={form}
              name="brickyard_contact"
              label="Contacto"
              disabled
            />
          </>
        )}
      </form>
    </Form>
  );
}
