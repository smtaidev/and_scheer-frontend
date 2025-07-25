import { baseUrlApi } from "@/redux/api/baseUrlApi";

const jobStatsApi = baseUrlApi.injectEndpoints({
  endpoints: (builder) => ({
    getWorkModes: builder.query({
      query: () => "/jobs/work-mode",
    }),
    getDepartments: builder.query({
      query: () => "/jobs/departments",
    }),
    getCompanyNames: builder.query({
      query: () => "/companies/names",
    }),
  }),
});

// ✅ Export hooks

export const {
  useGetWorkModesQuery,
  useGetDepartmentsQuery,
  useGetCompanyNamesQuery,
} = jobStatsApi;