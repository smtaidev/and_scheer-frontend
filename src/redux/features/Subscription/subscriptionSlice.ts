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

    //  create Subscirption Plans
    createSubscirptionPlans: build.mutation({
      query: ({ planIdData, accessToken }) => ({
        url: `/subscriptions/create-subscription`,
        method: "POST",
        body: planIdData,
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
      }),
    }),
    // payment Method
    paymentMethod: build.mutation({
      query: (cardData) => ({
        url: `https://api.stripe.com/v1/payment_methods`,
        method: "POST",
        body: cardData,
        headers: {
          Authorization: `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
    }),
  }),
});

export const {
  useGetSubscirptionPlansQuery,
  useGetSubscirptionSinglePlansQuery,
  // usePaymentMethodMutation,
  useCreateSubscirptionPlansMutation,
} = subscriptionPlanApi;
