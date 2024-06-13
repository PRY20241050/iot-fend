import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { setAuthTokenToCookie } from "@/lib/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmailAndPassword } from "@/services/auth";

export interface LoginFormValues {
  username: string;
  password: string;
}

const formSchema = z.object({
  username: z.string().min(3, { message: "El nombre de usuario es muy corto" }),
  password: z.string().min(1, { message: "La contraseña es obligatoria" }),
});

export default function useLoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    reValidateMode: "onChange",
  });

  const onSubmit = (values: LoginFormValues) => {
    setIsLoading(true);

    signInWithEmailAndPassword(values)
      .then((res) => {
        form.reset();
        setAuthTokenToCookie(res);

        if (searchParams.has("next")) {
          router.push(searchParams.get("next") as unknown as string);
        } else {
          router.push("/dashboard");
        }
      })
      .catch((err) => {
        if (err.response?.data && err.response.status === 401) {
          form.setError("password", {
            type: "manual",
            message: "Usuario o contraseña incorrectos",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    form,
    isLoading,
    onSubmit,
  };
}
