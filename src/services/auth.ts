import { LoginFormValues } from "@/components/auth/login/useLoginForm";
import { RecoverPasswordFormValues } from "@/components/auth/recover-password/useRecoverPasswordForm";
import { ChangePasswordFormValues } from "@/components/profile/change-password/useChangePasswordForm";
import { post } from "@/lib/api/api";
import { Token } from "@/types/auth";
import {
  CHANGE_PASSWORD_URL,
  LOGIN_URL,
  PASSWORD_RESET_URL,
  passwordResetConfirmUrl,
} from "./consts";

export const signInWithEmailAndPassword = async (
  params: LoginFormValues
): Promise<Token> => {
  return post<Token>({
    url: LOGIN_URL,
    params
  });
};

export const recoverPassword = async (params: RecoverPasswordFormValues) => {
  return post({
    url: PASSWORD_RESET_URL,
    params,
  });
};

export const restorePassword = async (
  uid: string | null,
  token: string | null,
  params: any
) => {
  return post({
    url: passwordResetConfirmUrl(uid, token),
    params,
  });
};

export const changePassword = async (params: ChangePasswordFormValues) => {
  return post({
    url: CHANGE_PASSWORD_URL,
    params,
  });
};
