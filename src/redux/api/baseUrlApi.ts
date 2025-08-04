import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseUrlApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://172.252.13.71:5005/api/v1",
    prepareHeaders: (headers, { getState }) => {
      // Get token from Redux state (not cookies since they're HTTP-only now)
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
    credentials: "include", // Always include HTTP-only cookies for automatic refresh
  }),
  endpoints: () => ({}),
});
