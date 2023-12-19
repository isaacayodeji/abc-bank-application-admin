import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { Encryption } from "../fuction/encryption";
import { Notify } from "../features/notification";

export const baseUrl = process.env.REACT_APP_BASE_URL;

type BaseQueryType = ReturnType<typeof fetchBaseQuery>;

export const baseQueryWithReauth: (baseQuery: BaseQueryType) => BaseQueryType =
  (baseQuery) => async (args: any, api: any, extraOptions: any) => {
    let result = (await baseQuery(args, api, extraOptions)) as any;
    if (result.error && result.error.status === 401) {
      window.location.href = "/";
      sessionStorage.clear();
    } else if (result.data?.responseMessage === "AuthorizationError") {
      // window.location.href = ;
      sessionStorage.clear();
    }
    return result;
  };

export const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    try {
      const token = window.location.href.includes("/admin")
        ? JSON.parse(Encryption.decrypt(localStorage.getItem("****") as any))
        : JSON.parse(Encryption.decrypt(localStorage.getItem("***") as any));

      if (token) headers.set("Authorization", `bearer ${token}`);
      return headers;
    } catch (error) {
      Notify("You are Unauthorized to perform this task", false);
    }
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
