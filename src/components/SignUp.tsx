"use client";
import { useSignUpMutation } from "@/redux/features/auth/auth";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import LoadingButton from "./loading/LoadingButton";
import Input from "./ui/Input";
import Logo from "./ui/MainLogo";

interface FormData {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export default function SignUpForm() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [isError, setIsError] = useState("");

  const router = useRouter();

  const [createAcount, { isLoading }] = useSignUpMutation();

  const onSubmit = async (data: FormData) => {
    // router.push("/");

    if (data.password !== data.confirmPassword) {
      return toast.error(
        " your password and Confirm Password Not match . please try again ! "
      );
    }

    const userData = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      password: data?.confirmPassword,
    };

    try {
      const response = await createAcount(userData).unwrap();
      console.log(response);
      if (response?.success) {
        toast.success(response?.message);
        reset();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  // google login

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
        // localStorage.setItem("accessToken", response?.data?.data?.accessToken);
        // Cookies.set("accessToken", response?.data?.accessToken);
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
      <div className="flex flex-col lg:flex-row rounded-lg overflow-hidden ">
        {/* Left: Image Section */}
        <div className="lg:w-1/2 hidden md:flex items-center justify-center">
          <Image
            src="/register.jpg"
            alt="Login visual"
            className=" rounded-lg -scale-x-100"
            height={1000}
            width={588}
            layout="intrinsic"
          />
        </div>

        {/* Right: Form Section */}
        <div className="w-full lg:w-1/2 px-8 flex flex-col justify-center ">
          <div className="flex justify-center items-center flex-col">
            {/* Logo */}
            <div className="mb-6">
              {/* <img src="/logo.svg" alt="Logo" className="h-10" /> */}
              <Link href={"/"}>
                <Logo height={120} width={268}></Logo>
              </Link>
            </div>

            {/* Welcome Message */}

            <h2 className="text-2xl md:text-4xl font-bold mb-8">
              Create your account!
            </h2>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Welcome, Please enter the information requested to create <br />{" "}
              your account!
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Input Fields */}
            <div className="space-y-4 mb-8">
              <div className="flex flex-col md:flex-row gap-5">
                <Input
                  label="First Name"
                  type="text"
                  placeholder="John"
                  {...register("firstName", { required: true })}
                />
                <Input
                  label="Last Name"
                  type="text"
                  placeholder="Doe"
                  {...register("lastName", { required: true })}
                />
              </div>

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
              <Input
                label="Confirm Password"
                type="password"
                placeholder=""
                {...register("confirmPassword", { required: true })}
              />
            </div>

            {/* Error Message */}
            {isError && <p className="text-red-500 text-sm mb-1">{isError}</p>}

            {/* Login Button */}
            <button className="w-full py-3 px-6 cursor-pointer bg-green-600 text-white flex justify-center items-center  rounded-lg hover:bg-green-700 transition">
              {isLoading ? (
                <>
                  <LoadingButton />{" "}
                </>
              ) : (
                "Register"
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
          <div className="">
            <GoogleLogin
              size="large"
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>
          <div className="flex justify-center items-center gap-2 text-gray-700   mt-3">
            <p className="text-center">
              If you don&apos;t have any account please
            </p>
            <Link
              href={"/signIn"}
              className="text-primary underline font-semibold"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
