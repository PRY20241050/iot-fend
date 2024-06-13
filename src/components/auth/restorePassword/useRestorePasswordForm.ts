import { post } from "@/lib/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface RestorePasswordFormValues {
  password: string;
  confirm_password: string;
}

const formSchema = z
  .object({
    password: z.string().min(1, { message: "La contraseña es obligatoria" }),
    confirm_password: z
      .string()
      .min(1, { message: "La confirmación de la contraseña es obligatoria" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Las contraseñas no coinciden",
    path: ["confirm_password"],
  });

interface Props {
  submitted: (value: boolean) => void;
}

export default function useRestorePasswordForm({ submitted }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const uid = searchParams.get("uid");
  const token = searchParams.get("token");

  const form = useForm<RestorePasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
    reValidateMode: "onBlur",
  });

  function onSubmit(values: RestorePasswordFormValues) {
    setIsLoading(true);

    post({
      url: `password-reset-confirm/${uid}/${token}/`,
      params: {
        new_password: values.password,
      },
    })
      .then((res) => {
        form.reset();
        submitted(true);
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  }

  return {
    isLoading,
    onSubmit,
    form,
  };
}
