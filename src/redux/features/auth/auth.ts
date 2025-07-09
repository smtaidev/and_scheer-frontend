import { baseUrlApi } from "@/redux/api/baseUrlApi";

const authApi = baseUrlApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: userData,
      }),
    }),

    // signIn
    signIn: build.mutation({
      query: (signInUserData) => ({
        url: "/auth/login",
        method: "POST",
        body: signInUserData,
      }),
    }),

    // forgetPassword
    forgetPassword: build.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useForgetPasswordMutation,
} = authApi;
