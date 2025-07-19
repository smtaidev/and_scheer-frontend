import { baseUrlApi } from "@/redux/api/baseUrlApi";

const subscriptionPlanApi = baseUrlApi.injectEndpoints({
  endpoints: (build) => ({
    getSubscirptionPlans: build.query({
      query: () => ({
        url: "/plans",
        method: "get",
      }),
    }),
  }),
});

export const { useGetSubscirptionPlansQuery } = subscriptionPlanApi;
