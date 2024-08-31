import { useToast } from "@/components/ui/use-toast";
import { DEFAULT_ERROR } from "@/lib/utils";
import { recoverPassword } from "@/services/auth";
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

const formDefaultValues: RecoverPasswordFormValues = {
  email: "",
};

interface Props {
  submitted: (value: boolean) => void;
}

export default function useRecoverPasswordForm({ submitted }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<RecoverPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
    reValidateMode: "onChange",
  });

  function onSubmit(values: RecoverPasswordFormValues) {
    setIsLoading(true);

    recoverPassword(values)
      .then(() => {
        form.reset();
        submitted(true);
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: DEFAULT_ERROR.header,
          description: DEFAULT_ERROR.emailNotFound,
        });

        form.setError("email", {
          type: "manual",
          message: DEFAULT_ERROR.emailNotFound,
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
