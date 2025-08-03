"use client";
// import FormInput from '@/components/FormInput';
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import Input from "./ui/Input";
import { toast } from "sonner";
import Logo from "./ui/MainLogo";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { TLoggedUser } from "@/types/reduxType";
import { verifyToken } from "@/lib/verifyToken";
import { GoogleLogin } from "@react-oauth/google";
import LoadingButton from "./loading/LoadingButton";
import ForgotPasswordModal from "./ForgetPasswordModal";
import { setUser } from "@/redux/features/auth/authSlice";
import { loginUser } from "@/services/auth";

interface FormData {
  email: string;
  password: string;
}

export default function SignInForm() {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const res = await loginUser(data);

      if (res?.success) {
        console.log("✅ Server-side login successful - cookies set by server");

        const user = verifyToken(res.data.accessToken) as TLoggedUser;
        dispatch(setUser({ user: user, token: res.data.accessToken }));
        toast.success(res?.message);
        router.push("/");
        reset();
      } else {
        toast.error(res?.message || "Login failed");
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("yes");
  };

  const handleSuccess = async (credentialResponse: any) => {
    console.log("yesToken= ", credentialResponse.credential);

    try {
      // Send the credential to your server
      const response = await axios.post(
        `http://172.252.13.71:5005/api/v1/auth/google-login`,
        {
          googleToken: credentialResponse.credential,
        }
      );

      if (response?.data?.success) {
        console.log(
          "✅ Google login successful - backend sets HTTP-only cookies"
        );

        const user = verifyToken(
          response?.data.data?.accessToken
        ) as TLoggedUser;

        dispatch(
          setUser({ user: user, token: response?.data.data?.accessToken })
        );

        console.log(response);
        // localStorage.setItem("accessToken", response?.data?.data?.accessToken);
        localStorage.removeItem("myEmail");
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
