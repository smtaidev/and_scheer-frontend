import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./CheckoutForm";

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);

export default function PassPayment() {
  return (
    <Elements
      options={{
        mode: "payment",
        amount: 1099, // $10.99 in cents
        currency: "eur",
        paymentMethodCreation: "manual",
        paymentMethodTypes: ["card"],
      }}
      stripe={stripePromise}
    >
      <PaymentForm />
    </Elements>
  );
}
