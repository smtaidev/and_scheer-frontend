
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Container from "../ui/Container";

export default function CreateAccount() {
    return (
        <Container>
            <div className="  flex justify-center items-center min-h-screen flex-col md:flex-row md:space-x-4 md:mx-3">
                <div className="flex items-center   ">
                    <Image
                        src="/account.jpg"
                        alt="Sample Resume"
                        width={578}
                        height={499}
                        className="rounded-2xl "

                    />
                </div>

                <div className="text-left flex flex-col  justify-between mt-6 md:mt-0 text-scheer-primary-dark">
                    <h1 className="text-4xl md:text-5xl xl:text-7xl font-bold  mb-4 leading-[1.24]">
                        <span className="">Create Your</span> <br />
                        Employee Account
                    </h1>
                    <p className="text-gray-400 text-sm mb-4 md:mb-12 leading-[1.6]">
                        Follow these simple steps to set up your company profile and find the perfect  <br /> candidate for your team.
                    </p>
                    <Link href={"/company-details"} >
                        <button className="px-18 py-4 bg-[#28C76F] text-[#FCFCFC] font-semibold rounded-lg hover:bg-green-700">
                            Start Now
                        </button>
                    </Link>

                </div>
            </div>
        </Container>
    );
}