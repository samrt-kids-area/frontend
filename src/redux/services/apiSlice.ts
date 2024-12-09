import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL_BACKEND,
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem("token");
    headers.set("Authorization", `Bearer ${accessToken}`);
    return headers;
  },
});

export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/api/admin/login",
        method: "POST",
        body,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (body) => ({
        url: "/vendor/forgot",
        method: "POST",
        body,
      }),
    }),
    getUser: builder.mutation({
      query: () => ({
        url: "/api/admin/info",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgetPasswordMutation,
  useGetUserMutation,
} = apiSlice;
