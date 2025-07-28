// // components/CheckoutForm.tsx
// import { useForm } from "react-hook-form";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { useState } from "react";
// import FormInput from "@/components/ui/FormInput";

// type FormData = {
//   name: string;
//   country: string;
//   postalCode: string;
// };

// export default function CheckoutForm() {
//   const { register, handleSubmit } = useForm<FormData>();
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   const onSubmit = async (data: FormData) => {
//     if (!stripe || !elements) return;
//     setLoading(true);

//     // 1. Get clientSecret from backend
//     const res = await fetch("/api/create-payment-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount: 999 }), // $9.99
//     });

//     const { clientSecret } = await res.json();

//     // 2. Confirm the card payment
//     const result = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement)!,
//         billing_details: {
//           name: data.name,
//           address: {
//             country: data.country,
//             postal_code: data.postalCode,
//           },
//         },
//       },
//     });

//     if (result.error) {
//       alert(`❌ Payment Failed: ${result.error.message}`);
//     } else {
//       if (result.paymentIntent.status === "succeeded") {
//         alert("✅ Payment Successful!");
//       }
//     }

//     setLoading(false);
//   };

//   return (
//     <>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="p-6 border rounded-md max-w-md mx-auto"
//       >
//         <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

//         <label className="block mb-2">Card Information</label>
//         <CardElement className="p-2 border rounded mb-4" />

//         <label className="block mb-2">Name on Card</label>
//         <input
//           {...register("name", { required: true })}
//           placeholder="John Doe"
//           className="w-full p-2 border rounded mb-4"
//         />

//         <label className="block mb-2">Country</label>
//         <select
//           {...register("country", { required: true })}
//           className="w-full p-2 border rounded mb-4"
//         >
//           <option value="">Select a country</option>
//           <option value="US">United States</option>
//           <option value="BD">Bangladesh</option>
//           <option value="IN">India</option>
//           <option value="DE">Germany</option>
//         </select>

//         <label className="block mb-2">Postal Code</label>
//         <input
//           {...register("postalCode", { required: true })}
//           placeholder="12345"
//           className="w-full p-2 border rounded mb-4"
//         />

//         <button
//           disabled={loading}
//           type="submit"
//           className="bg-green-500 text-white py-2 px-4 rounded w-full"
//         >
//           {loading ? "Processing..." : "Pay now 9.99"}
//         </button>
//       </form>
//        <div className="md:max-w-[818px]">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {/* Input Fields */}
//         <div className="space-y-4 mb-8">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <FormInput
//                 label="First Name"
//                 type="text"
//                 placeholder="John"
//                 {...register("firstName", { required: true })}
//                 onChange={(e) => handleInputChange("firstName", e.target.value)}
//               />
//             </div>
//             <div className="flex-1">
//               <FormInput
//                 label="Last Name"
//                 type="text"
//                 placeholder="Doe"
//                 {...register("lastName", { required: true })}
//                 onChange={(e) => handleInputChange("lastName", e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <FormInput
//                 label="Phone"
//                 type="text"
//                 placeholder="+1 (555) 123-4567"
//                 {...register("phone", { required: true })}
//                 onChange={(e) => handleInputChange("phone", e.target.value)}
//               />
//             </div>
//             <div className="flex-1">
//               <FormInput
//                 label="Email Address"
//                 type="email"
//                 placeholder="you@example.com"
//                 {...register("email", { required: true })}
//                 onChange={(e) => handleInputChange("email", e.target.value)}
//               />
//             </div>
//           </div>

//           {/*
//           <SelectField
//             label="Country/Region"
//             name="country"
//             options={roleOptions}
//             register={register("country", { required: true })} // ✅ FIXED
//             onChange={(value) => handleInputChange('country', value)}
//           /> */}

//           <FormInput
//             label="Address"
//             type="text"
//             placeholder="Provide your address"
//             {...register("address", { required: true })}
//             onChange={(e) => handleInputChange("address", e.target.value)}
//           />

//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <FormInput
//                 placeholder="City"
//                 {...register("city", { required: true })}
//                 onChange={(e) => handleInputChange("city", e.target.value)}
//               />
//             </div>
//             <div className="flex-1">
//               <FormInput
//                 placeholder="State"
//                 {...register("state", { required: true })}
//                 onChange={(e) => handleInputChange("state", e.target.value)}
//               />
//             </div>
//             <div className="flex-1">
//               <FormInput
//                 placeholder="ZIP Code"
//                 {...register("zipcode", { required: true })}
//                 onChange={(e) => handleInputChange("zipcode", e.target.value)}
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="additionalInfo"
//               className="text-[#333333] font-medium"
//             >
//               Additional Information
//             </label>
//             <textarea
//               id="additionalInfo"
//               rows={7}
//               className="p-2 border border-gray-300 rounded-md w-full"
//               placeholder="Enter additional information here..."
//               {...register("additionalInfo")}
//               onChange={(e) =>
//                 handleInputChange("additionalInfo", e.target.value)
//               }
//             />
//           </div>
//           <p>Your billing information is securely stored and encrypted.</p>
//         </div>
//       </form>
//     </div>
//     </>
//   );
// }
