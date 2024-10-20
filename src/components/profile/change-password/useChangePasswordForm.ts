import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePassword } from "@/services/auth";
import { useToast } from "@/components/ui/use-toast";

export interface ChangePasswordFormValues {
  old_password: string;
  new_password: string;
}

const formSchema = z.object({
  old_password: z
    .string()
    .min(1, { message: "La contraseña actual es obligatoria" }),
  new_password: z
    .string()
    .min(1, { message: "La nueva contraseña es obligatoria" }),
});

export default function useChangePasswordForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast()

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
    },
  });

  const onSubmit = async (values: ChangePasswordFormValues) => {
    setIsLoading(true);

    changePassword({
      old_password: values.old_password,
      new_password: values.new_password,
    })
      .then((res: any) => {
        form.reset();
        toast({
          variant: "default",
          description: "Cambio de contraseña exitoso"
        })
      })
      .catch((err) => {

        if (err.response?.data) {
          form.setError("old_password", {
            type: "manual",
            message: err.response.data.error,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { form, onSubmit, isLoading };
}
