import { env } from "@/config/env";
import { isErrorWithMessage } from "@/features/auth/utils/helpers";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${env.NEEDLE_API_URL}/api`,
  credentials: "include",
});

const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const error = result.error;

    // Ensure the error has a message and is an object with the necessary structure
    if (!isErrorWithMessage(error)) {
      return result;
    }

    const { message } = error.data;
    const status = error.status;

    // Handle 401 error due to missing or expired token
    if (status === 401 && message === "Access denied. No token provided.") {
      // Try refreshing the token
      const refreshResponse = await baseQuery(
        { url: "/auth/refresh-token", method: "POST", credentials: "include" },
        api,
        extraOptions
      );

      // If the token was successfully refreshed, retry the original request
      if (refreshResponse.meta?.response?.status === 200) {
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Handle refresh token failure
        console.error("Failed to refresh token:", refreshResponse.error);
      }
    }
  }

  return result;
};

export default baseQueryWithReauth;
