import { baseUrlApi } from "@/redux/api/baseUrlApi";

const subscriptionPlanApi = baseUrlApi.injectEndpoints({
  endpoints: (build) => ({
    getSubscirptionPlans: build.query({
      query: () => ({
        url: "/plans",
        method: "get",
      }),
    }),

    // single subscription plans
    getSubscirptionSinglePlans: build.query({
      query: (id) => ({
        url: `/plans/${id}`,
        method: "get",
      }),
    }),
    // payment Method
    paymentMethod: build.mutation({
      query: (cardData) => ({
        url: `https://api.stripe.com/v1/payment_methods`,
        method: "POST",
        body: cardData,
      }),
    }),
  }),
});

export const {
  useGetSubscirptionPlansQuery,
  useGetSubscirptionSinglePlansQuery,
  usePaymentMethodMutation,
} = subscriptionPlanApi;
