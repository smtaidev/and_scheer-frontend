"use client";

import { useForgetPasswordMutation } from "@/redux/features/auth/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import LoadingButton from "./loading/LoadingButton";

interface ForgotPasswordModalProps {
  isModalOpen: boolean;
  setModalOpen: any;
}

type FormData = {
  email: string;
};

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isModalOpen,
  setModalOpen,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [forgetPassPost, { isLoading }] = useForgetPasswordMutation();

  const onSubmit = async (data: FormData) => {
    console.log("Email submitted:", data);
    try {
      const response = await forgetPassPost(data).unwrap();
      console.log(response);
      if (response?.success) {
        toast.success(response?.message);
        reset();
        setModalOpen(false);
      }
    } catch (error: any) {
      // console.log(error, "yes");
      toast.error(error.data.message);
    }
  };
  return (
    isModalOpen && (
      <>
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[500px] p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Forgot Password
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer bg-primary hover:bg-green-600 text-white py-2 rounded font-medium"
              >
                {isLoading ? (
                  <>
                    <LoadingButton />
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 w-full text-sm text-gray-500 hover:underline text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      </>
    )
  );
};

export default ForgotPasswordModal;
