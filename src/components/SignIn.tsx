"use client";
// import FormInput from '@/components/FormInput';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import Logo from "./ui/MainLogo";
import Input from "./ui/Input";

interface FormData {
  email: string;
  password: string;
}

export default function SignInForm() {
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    console.log(data, "Check the data here: ");
    router.push("/");
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
              <Logo height={120} width={268}></Logo>
            </div>

            {/* Welcome Message */}

            <h2 className="text-2xl md:text-4xl text-primary-dark font-bold mb-2">
              Hi, Welcome Back!
            </h2>
            <p className="text-sm text-gray-600 mb-8">
              Please exter your email and password below!
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Input Fields */}
            <div className="space-y-4 mb-8  ">
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

            {/* Login Button */}
            <button className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-green-700 transition">
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-400">or with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Continue with Google */}
          <button className="w-full border border-gray-300 py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition">
            <FcGoogle className="size-6" />
            Login with Google
          </button>
          <div className="flex justify-center gap-2 text-gray-700  mt-3">
            <p className="text-center">If you dont have any account please</p>
            <Link
              href={"/register"}
              className="text-primary underline font-semibold"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
