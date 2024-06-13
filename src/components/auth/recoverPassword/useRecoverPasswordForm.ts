import { post } from "@/lib/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface RecoverPasswordFormValues {
  email: string;
}

const formSchema = z.object({
  email: z.string().email({ message: "El correo electrónico no es válido" }),
});

interface Props {
  submitted: (value: boolean) => void;
}

export default function useRecoverPasswordForm({ submitted }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RecoverPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
    reValidateMode: "onChange",
  });

  function onSubmit(values: RecoverPasswordFormValues) {
    setIsLoading(true);

    post({
      url: "/password-reset/",
      params: values,
    })
      .then((res) => {
        form.reset();
        submitted(true);
      })
      .catch((err) => {
        form.setError("email", {
            type: "manual",
            message: "No se encontró una cuenta con este correo electrónico",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return {
    form,
    isLoading,
    onSubmit,
  };
}
