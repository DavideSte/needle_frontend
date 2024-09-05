import { setEmail } from "@/core/store/slice/userSlice";
import { needleApi } from "@/store/api/needleApi";
import { LoginFormData, RegisterFormData } from "../../types/authTypes";

const needleApiAuth = needleApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ email: string }, LoginFormData>({
      query: (data) => ({
        url: `auth/login`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (_arg, api) => {
        const { dispatch, queryFulfilled } = api;
        const { data } = await queryFulfilled;
        dispatch(setEmail(data.email));
      },
    }),
    register: builder.mutation<{ message: string }, RegisterFormData>({
      query: (data) => ({
        url: `auth/register`,
        method: "POST",
        body: data,
      }),
    }),
    verifyToken: builder.mutation<{ email: string }, void>({
      query: () => ({
        url: `auth/verify-token`,
        method: "POST",
      }),
      onQueryStarted: async (_arg, api) => {
        const { dispatch, queryFulfilled } = api;
        const { data } = await queryFulfilled;
        dispatch(setEmail(data.email));
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `auth/logout`,
        method: "POST",
      }),
      onQueryStarted: async (_arg, api) => {
        const { dispatch, queryFulfilled } = api;
        await queryFulfilled;
        dispatch(setEmail(null));
      },
    }),
    googleLogin: builder.mutation<{ email: string }, { token: string }>({
      query: (data) => ({
        url: `auth/google`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (_arg, api) => {
        const { dispatch, queryFulfilled } = api;
        const { data } = await queryFulfilled;
        dispatch(setEmail(data.email));
      },
    }),
    verifyRegistrationToken: builder.mutation<{ email: string }, { token: string }>({
      query: (data) => ({
        url: `auth/verification`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (_arg, api) => {
        const { dispatch, queryFulfilled } = api;
        const { data } = await queryFulfilled;
        dispatch(setEmail(data.email));
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useVerifyTokenMutation,
  useLogoutMutation,
  useGoogleLoginMutation,
  useRegisterMutation,
  useVerifyRegistrationTokenMutation,
} = needleApiAuth;
export const { login, verifyToken, logout, googleLogin, verifyRegistrationToken } =
  needleApiAuth.endpoints;
