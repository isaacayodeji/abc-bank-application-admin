import { baseQuery, baseQueryWithReauth } from "./apiConfig";
import { createApi,  } from "@reduxjs/toolkit/dist/query/react";

const globalApi = createApi({
  reducerPath: "global",
  baseQuery: baseQueryWithReauth(baseQuery),
  tagTypes: ["GetData"],
  endpoints(builder) {
    return {
      getData: builder.query({
        query: (url) => {
          return {
            url,
          };
        },
        providesTags: ["GetData"],
      }),
      postData: builder.mutation({
        query: (data) => {
          return {
            url: data.url,
            method: "POST",
            body: data?.request,
          };
        },
        invalidatesTags: (result, error, arg) => [
          { type: "GetData", id: arg.id },
        ],
      }),
      getSelectedValue: builder.query({
        query: (url) => {
          return {
            url,
          };
        },
      }),
    };
  },
});

export const {
  useGetDataQuery,
  usePostDataMutation,
  useGetSelectedValueQuery,
} = globalApi;

export {globalApi}