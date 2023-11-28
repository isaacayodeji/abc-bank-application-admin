import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test.xpresspayments.com:2300/",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => {
        return {
          url: "Admin",
          method: "POST",
          body: data.request,
        };
      },
    }),
    SignUp: builder.mutation({
      query: (data) => {
        return {
          url: "SignUp",
          method: "POST",
          body: data.reqest,
        };
      }
    })
  }),
});
export const { useLoginUserMutation,useSignUpMutation } = authApi;
