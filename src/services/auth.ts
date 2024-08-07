import { LoginFormValues } from "@/components/auth/login/useLoginForm";
import { RecoverPasswordFormValues } from "@/components/auth/recover-password/useRecoverPasswordForm";
import { ChangePasswordFormValues } from "@/components/profile/change-password/useChangePasswordForm";
import { post } from "@/lib/api/api";
import { Token } from "@/types/auth";

export const signInWithEmailAndPassword = async (
  params: LoginFormValues
): Promise<Token> => {
  return post<Token>({
    url: "/login/",
    params,
  });
};

export const recoverPassword = async (params: RecoverPasswordFormValues) => {
  return post({
    url: "/password-reset/",
    params,
  });
};

export const restorePassword = async (
  uid: string | null,
  token: string | null,
  params: any
) => {
  return post({
    url: `password-reset-confirm/${uid}/${token}/`,
    params,
  });
};

export const changePassword = async (params: ChangePasswordFormValues) => {
  return post({
    url: "/change-password/",
    params,
  });
};
