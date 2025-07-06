"use client";
import { PaymentInfoType } from "@/app/(commonLayout)/payment/page";
import { useForm } from "react-hook-form";
import Button from "../shared/button/Button";

interface PaymentFormProps {
  handlePayment: (data: PaymentInfoType) => void;
}

export default function PaymentForm({ handlePayment }: PaymentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentInfoType>();

  const onSubmit = (data: PaymentInfoType) => {
    console.log("clicked ");
    handlePayment(data);
  };

  return (
    <div className="max-w-md mx-auto p-8 h-full bg-white border-2 border-primary rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Information
          </label>

          {/* Wrapper for full card input group */}
          <div className="border border-[#c2c2c2] rounded-md overflow-hidden">
            {/* Card Number - top */}
            <input
              type="text"
              placeholder="4242 5859 5684 2585"
              {...register("cardNumber", { required: true })}
              className="bg-gray-50 w-full px-4 py-4 border-b border-[#c2c2c2] focus:outline-none"
            />

            {/* Expiry + CVC - bottom row */}
            <div className="flex divide-x divide-[#c2c2c2]">
              <input
                type="text"
                placeholder="MM/YY"
                {...register("expiryDate", { required: true })}
                className="bg-gray-50 w-full px-4 py-4 focus:outline-none"
              />
              <input
                type="text"
                placeholder="CVC"
                {...register("cvc", { required: true })}
                className="bg-gray-50 w-full px-4 py-4 focus:outline-none"
              />
            </div>
          </div>

          {/* Error Message */}
          {errors.cardNumber && (
            <p className="text-sm text-red-500 mt-1">Card number is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name on Card
          </label>
          <input
            type="text"
            placeholder="John Doe"
            {...register("nameOnCard", { required: true })}
            className="bg-gray-50 border border-[#c2c2c2]  rounded-md w-full px-4 py-4"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country or Region
          </label>

          <div className="rounded-md overflow-hidden border border-[#c2c2c2]">
            <select
              {...register("country", { required: true })}
              className="bg-gray-50 w-full px-4 py-4 border-b border-[#c2c2c2] focus:outline-none"
            >
              <option value="">Select a country</option>
              <option value="United States">United States</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Canada">Canada</option>
            </select>

            <input
              type="text"
              placeholder="Postal Code"
              {...register("postalCode", { required: true })}
              className="bg-gray-50 w-full px-4 py-4 focus:outline-none"
            />
          </div>
        </div>

        <Button type="submit" name={`Pay now ${9.99}`}></Button>
      </form>
    </div>
  );
}
