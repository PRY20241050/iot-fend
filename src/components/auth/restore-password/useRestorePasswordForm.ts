import { useToast } from "@/components/ui/use-toast";
import { DEFAULT_ERROR } from "@/lib/utils";
import { restorePassword } from "@/services/auth";
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

const formDefaultValues: RestorePasswordFormValues = {
  password: "",
  confirm_password: "",
};

interface Props {
  submitted: (value: boolean) => void;
}

export default function useRestorePasswordForm({ submitted }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const uid = searchParams.get("uid");
  const token = searchParams.get("token");

  const form = useForm<RestorePasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
    reValidateMode: "onBlur",
  });

  function onSubmit(values: RestorePasswordFormValues) {
    setIsLoading(true);
    restorePassword(uid, token, {
      new_password: values.password,
    })
      .then(() => {
        form.reset();
        submitted(true);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: DEFAULT_ERROR.header,
          description: err.response.data.error || DEFAULT_ERROR.server,
        });
      })
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
