"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Form, FormInput } from "../ui/form";
import useProfileForm from "./useProfileForm";
import { TypographyH4 } from "../ui/typography";

export default function ProfileForm() {
  const { user, isBrickyard, isInstitution } = useAuthStore((state) => ({
    user: state.user,
    isBrickyard: state.isBrickyard,
    isInstitution: state.isInstitution,
  }));

  const { form } = useProfileForm({
    user,
    isBrickyard,
    isInstitution,
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
        {user && (
          <TypographyH4 className="pt-3 tablet-xl:pt-5">
            Organización
          </TypographyH4>
        )}
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
        {isInstitution && (
          <>
            <FormInput
              form={form}
              name="institution_name"
              label="Empresa"
              disabled
            />
            <FormInput
              form={form}
              name="institution_address"
              label="Dirección"
              disabled
            />
            <FormInput
              form={form}
              name="institution_phone"
              label="Teléfono de contacto"
              disabled
            />
            <FormInput
              form={form}
              name="institution_contact"
              label="Correo de contacto"
              disabled
            />
          </>
        )}
      </form>
    </Form>
  );
}
