import { OPTIONAL_STRING } from "@/lib/utils/validators";
import { AuthStateValues } from "@/store/useAuthStore";
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

  institution_name: string;
  institution_phone: string;
  institution_address: string;
  institution_contact: string;
}

const formSchema = z.object({
  first_name: OPTIONAL_STRING,
  last_name: OPTIONAL_STRING,
  username: OPTIONAL_STRING,
  email: OPTIONAL_STRING,
  role: OPTIONAL_STRING,

  brickyard_name: OPTIONAL_STRING,
  brickyard_address: OPTIONAL_STRING,
  brickyard_contact: OPTIONAL_STRING,

  institution_name: OPTIONAL_STRING,
  institution_phone: OPTIONAL_STRING,
  institution_address: OPTIONAL_STRING,
  institution_contact: OPTIONAL_STRING,
});

type UseProfileFormProps = Pick<
  AuthStateValues,
  "isBrickyard" | "isInstitution"
> & {
  user?: User | null;
};

export default function useProfileForm({
  user,
  isBrickyard,
  isInstitution,
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

      institution_name: "",
      institution_phone: "",
      institution_address: "",
      institution_contact: "",
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
      ...(isInstitution && {
        institution_name: user.institution?.name,
        institution_phone: String(user.institution?.phone),
        institution_address: user.institution?.address,
        institution_contact: user.institution?.contact,
      }),
    });
  }, [user, isBrickyard, isInstitution, form]);

  return {
    form,
  };
}
