import { type ParsedUrlQuery } from "querystring";

import { type GetServerSidePropsContext, type PreviewData } from "next";

import Cookies from "js-cookie";
import { DateTime } from "luxon";

import { type AuthToken, type Token } from "@/types/auth";

export const ACCESS_TOKEN_KEY = "iot_access_token";
export const REFRESH_TOKEN_KEY = "iot_refresh_token";
export const USER_TYPE_KEY = "iot_user_type"

export const setAuthTokenToCookie = ({ access, refresh }: Token): void => {
  const accessExpirationTime = Number(
    process.env.NEXT_PUBLIC_JWT_ACCESS_EXPIRATION ?? 0
  );
  const refreshExpirationTime = Number(
    process.env.NEXT_PUBLIC_JWT_REFRESH_EXPIRATION ?? 0
  );

  const accessExpirationDate = DateTime.now()
    .plus({ seconds: accessExpirationTime })
    .toJSDate();
  const refreshExpirationDate = DateTime.now()
    .plus({ seconds: refreshExpirationTime })
    .toJSDate();

  const options: Cookies.CookieAttributes = {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  Cookies.set(ACCESS_TOKEN_KEY, access, {
    ...options,
    expires: accessExpirationDate,
  });
  Cookies.set(REFRESH_TOKEN_KEY, refresh, {
    ...options,
    expires: refreshExpirationDate,
  });
};

export const setUserTypeToCookie = ({
  userType,
}: {
  userType: string;
}): void => {
  const options: Cookies.CookieAttributes = {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  Cookies.set(USER_TYPE_KEY, userType, {
    ...options,
  });
};

export const getAuthTokenFromCookie = (): AuthToken | null => {
  const accessToken = Cookies.get(ACCESS_TOKEN_KEY);
  const refreshToken = Cookies.get(REFRESH_TOKEN_KEY);

  if (refreshToken) {
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: "Bearer",
    };
  }

  return null;
};

export const ssrGetAuthTokenFromCookie = ({
  req,
}: GetServerSidePropsContext<
  ParsedUrlQuery,
  PreviewData
>): AuthToken | null => {
  const accessToken = req.cookies[ACCESS_TOKEN_KEY];
  const refreshToken = req.cookies[REFRESH_TOKEN_KEY];

  if (refreshToken) {
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: "Bearer",
    };
  }

  return null;
};

export const clearAuthTokenFromCookie = (): void => {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
  Cookies.remove(USER_TYPE_KEY);
};
