"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

interface PasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

const ResetPasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordFormData>();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = (data: PasswordFormData) => {
    console.log("Submitted Password Data:", data);
    // TODO: Call API to update password
  };

  return (
    <>
      <div className="mt-[100px] p-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-2xl mx-auto p-8 space-y-4 border border-gray-300  rounded-xl shadow"
        >
          <h2 className="text-3xl  mb-6 font-semibold text-center text-primary">
            Reset Password
          </h2>
          <div className="w-full">
            <label
              htmlFor="newPassword"
              className="block mb-1 font-medium text-lg text-subtitle"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
              className="w-full px-3 py-4 border border-gray-300 rounded-lg"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-1 font-medium text-lg text-subtitle"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
              className="w-full px-3 py-4 border border-gray-300 rounded-lg"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="togglePassword"
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
              className="mr-2"
            />
            <label htmlFor="togglePassword" className="text-sm">
              Show Passwords
            </label>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer text-base font-medium bg-primary text-white py-3 px-6 rounded-lg hover:bg-green-700 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPasswordForm;
