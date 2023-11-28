import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { Encryption } from "../fuction/encryption";

export const baseUrl = process.env.REACT_APP_BASE_URL;

type BaseQueryType = ReturnType<typeof fetchBaseQuery>;

export const baseQueryWithReauth: (baseQuery: BaseQueryType) => BaseQueryType =
  (baseQuery) => async (args: any, api: any, extraOptions: any) => {
    let result = (await baseQuery(args, api, extraOptions)) as any;
    if (result.error && result.error.status === 401) {
     window.location.href = "/";
      sessionStorage.clear();
    } else if (result.data?.responseMessage === "AuthorizationError") {
      window.location.href = "/";
      sessionStorage.clear();
    }
    return result;
  };

export const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    try {
      const token = JSON.parse(Encryption.decrypt(localStorage.getItem("***") as any));
      if (token) headers.set("Authorization", `bearer ${token}`);
      return headers;
    } catch (error) {}
  },
});

export const apiConfig = {
  auth: {
    AdminLogin: "/Auth",
    ForgotPassword: "",
    ChangePassword: "",
    UserLogin: "",
  },
};
