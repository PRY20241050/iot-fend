import apiClient from "@/lib/api/apiClient";
import { getResponseError } from "@/lib/utils/errors";
import { User } from "@/types/auth";
import { PROFILE_URL } from "./consts";

/**
 * Get user profile provided an access token, use this from the server side
 * @param {string} accessToken
 */
export const getUser = async (
  accessToken: string
): Promise<GlobalDTO<User>> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const user = await apiClient.get<User>(PROFILE_URL).then((res) => res.data);

    return { data: user };
  } catch (error: any) {
    const { message, status } = getResponseError(error);

    return { error: new Error(message), status };
  }
};
