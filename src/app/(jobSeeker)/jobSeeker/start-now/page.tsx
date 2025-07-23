import Container from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ResumeCreate() {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Container>
        <div className="  flex justify-center items-center flex-col md:flex-row md:space-x-4 md:mx-3">
          <div className="flex items-center   ">
            <Image
              src="/airesume.jpg"
              alt="Sample Resume"
              width={578}
              height={499}
              className="rounded-2xl "
            />
          </div>

          <div className="text-left flex flex-col  justify-between mt-6 md:mt-0">
            <h1 className="text-4xl md:text-5xl xl:text-7xl font-bold text-[#28C76F] mb-4 leading-[1.24]">
              <span className="text-gray-900">Create Your</span> AI- <br />
              Powered Resume
            </h1>

            <h3 className="lg:text-xl text-gray-700 mb-[42px] leading-[1.6]">
              Let our AI technology help you build a professional resume tailored{" "}
              <br />
              to your skills, experience, and career goals.
            </h3>

            <p className="text-gray-400 text-sm mb-4 md:mb-12 leading-[1.6]">
              Follow these simple steps to create a standout resume that will get
              you <br /> noticed by top employers.
            </p>
            <Link href={"/jobSeeker/create-resume"}>
              <button className="px-18 py-4 bg-[#28C76F] text-[#FCFCFC] font-semibold rounded-lg hover:bg-green-700">
                Start Now
              </button>
            </Link>
          </div>
        </div>
      </Container>
    </div>

  );
}
