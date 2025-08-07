import Image from "next/image";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import SearchField from "./shared/searchField/SearchField";

export default function Banner() {
  return (
    <div className="relative overflow-hidden w-full min-h-screen ">
      <div className="absolute right-0">
        <Image src="/Pattern.png" alt="Pattern" height={1146} width={1156} />
      </div>

      <div className="flex py-15 md:py-28 md:justify-around px-5 ">
        {/* Left side */}
        <div className="flex flex-col gap-8  justify-center text-left z-30">
          <div className="flex flex-col gap-5">
            <h1 className="text-5xl md:text-7xl text-left font-semibold md:font-bold">
              Your{" "}
              <span className="text-primary">
                AI-Powered <br /> Career
              </span>{" "}
              Platform
            </h1>
            <p className="text-scheer-body-gray text-sm md:text-base">
              Discover your next opportunity with personalized AI job matching.
              Apply with <br />a single click and explore new career paths
              today.
            </p>
          </div>

          <SearchField />

          <div className="flex gap-3 mt-4">
            <Link href={"/create-account"}>
              <button className="border px-3 text-xs md:text-base rounded py-2 hover:bg-gray-200 hover:shadow-md border-gray-200  transition-all duration-300 cursor-pointer">
                For Employers
              </button>
            </Link>

            <Link
              href={"/jobSeeker/start-now"}
              className="text-white group text-xs md:text-base font-semibold px-3 rounded py-2 flex gap-1 bg-primary hover:bg-green-600 transition-all duration-300"
            >
              Create AI Resume <BsArrowRight className="my-auto transition-transform text-xl mt-1 duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right side */}
        <div className="hidden md:block">
          {/* Empty or add future content */}
        </div>

        {/* Positioned image */}
        <div className="absolute left-1/2 top-80 md:top-96 md:left-3/5 lg:left-3/5  lg:top-48 xl:top-28 hidden sm:block">
          <div className="relative ">
            {/* White shadow/glow */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-transparent via-transparent to-white  z-10  "></div>

            {/* Actual image on top */}
            <Image
              src="/bannerimage.png"
              alt="AI Career"
              height={884}
              width={626}
              className="relative  w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
