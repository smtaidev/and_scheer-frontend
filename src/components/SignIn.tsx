"use client";
// import FormInput from '@/components/FormInput';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import Logo from "./ui/MainLogo";
import Input from "./ui/Input";
import {
  useSignInMutation,
  useSignUpMutation,
} from "@/redux/features/auth/auth";
import { toast } from "sonner";
import LoadingButton from "./loading/LoadingButton";
import ForgotPasswordModal from "./ForgetPasswordModal";
import Cookies from "js-cookie";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

interface FormData {
  email: string;
  password: string;
}

export default function SignInForm() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const [sigInUser, { isLoading }] = useSignInMutation();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await sigInUser(data).unwrap();
      console.log(response);
      if (response?.success) {
        // localStorage.setItem("accessToken", response?.data?.accessToken);
        Cookies.set("accessToken", response?.data?.accessToken);
        toast.success(response?.message);
        router.push("/");
        reset();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  const handleGoogleLogin = () => {
    console.log("yes");
  };

  const handleSuccess = async (credentialResponse: any) => {
    console.log("yesTonek= ", credentialResponse.credential);

    try {
      // Send the credential to your server
      const response = await axios.post(
        `http://172.252.13.71:5005/api/v1/auth/google-login`,
        {
          googleToken: credentialResponse.credential,
        }
      );

      if (response?.data?.success) {
        console.log(response)
        // localStorage.setItem("accessToken", response?.data?.data?.accessToken);
        Cookies.set("accessToken", response?.data.data?.accessToken);
        router.push("/");
        toast.success("Login successful");
      }

      console.log("Login successful", response.data);
      // Handle successful login (store tokens, redirect, etc.)
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <section className="max-w-[1420px] mx-auto min-h-screen flex items-center justify-center md:px-4 ">
      <div className="flex w-full  rounded-lg overflow-hidden ">
        {/* Left: Image Section */}
        <div className="w-1/2 hidden md:block my-9">
          <Image
            src="/logingirl.jpg"
            alt="Login visual"
            className=" rounded-lg "
            height={758}
            width={588}
            layout="intrinsic"
          />
        </div> 

        {/* Right: Form Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex justify-center items-center flex-col">
            {/* Logo */}
            <div className="mb-6">
              <Link href={"/"}>
                <Logo height={120} width={268}></Logo>
              </Link>
            </div>

            {/* Welcome Message */}

            <h2 className="text-2xl md:text-4xl text-primary-dark font-bold mb-2">
              Hi, Welcome Back!
            </h2>
            <p className="text-sm text-gray-600 mb-8">
              Please enter your email and password below!
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Input Fields */}
            <div className="space-y-4 mb-2  ">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                {...register("email", { required: true })}
              />
              <Input
                label="Password"
                type="password"
                placeholder="password"
                {...register("password", { required: true })}
              />
            </div>
            <button
              type="button"
              className="text-primary text-lg underline cursor-pointer mb-5"
              onClick={() => setModalOpen(true)}
            >
              Forget Password
            </button>

            {/* Login Button */}
            <button className="w-full cursor-pointer bg-primary text-white py-3 px-6 rounded-lg hover:bg-green-700 transition">
              {isLoading ? (
                <>
                  <LoadingButton />
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-400">or with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Continue with Google */}
          {/* <button
            id="google"
            onClick={handleGoogleLogin}
            className="w-full border border-gray-300 py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            <FcGoogle className="size-6" />
            Login with Google
          </button> */}
          <div className="">
            <GoogleLogin
              size="large"
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>
          <div className="flex justify-center gap-2 text-gray-700  mt-3">
            <p className="text-center">If you dont have any account please</p>
            <Link
              href={"/signUp"}
              className="text-primary underline font-semibold"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
      <ForgotPasswordModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      />
    </section>
  );
}
