import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://json-placeholder.mock.beeceptor.com",
  }),
  tagTypes: ["Tasks", "Users", "Posts"],
  endpoints: () => ({}),
});
