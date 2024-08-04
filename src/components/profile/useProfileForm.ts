import { OPTIONAL_STRING } from "@/lib/utils/validators";
import { User } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface ProfileForm {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  role: string;
  brickyard_name: string;
  brickyard_address: string;
  brickyard_contact: string;
}

const formSchema = z.object({
  first_name: OPTIONAL_STRING,
  last_name: OPTIONAL_STRING,
  username: OPTIONAL_STRING,
  email: OPTIONAL_STRING,
  role: OPTIONAL_STRING,
  brickyard_name: OPTIONAL_STRING,
  brickyard_address: OPTIONAL_STRING,
});

interface UseProfileFormProps {
  user?: User | null;
  isBrickyard: boolean;
}

export default function useProfileForm({
  user,
  isBrickyard,
}: UseProfileFormProps) {
  const form = useForm<ProfileForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      role: "",
      brickyard_name: "",
      brickyard_address: "",
      brickyard_contact: "",
    },
  });

  useEffect(() => {
    if (!user) return;

    form.reset({
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      role: user.role,
      ...(isBrickyard && {
        brickyard_name: user.brickyard?.name,
        brickyard_address: user.brickyard?.address,
        brickyard_contact: user.brickyard?.contact,
      }),
    });
  }, [user, isBrickyard, form]);

  return {
    form,
  };
}
