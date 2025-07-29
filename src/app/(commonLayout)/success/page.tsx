import React from "react";
import SuccessDetails from "../../../components/SuccessDetails";
import { BiRightArrowAlt } from "react-icons/bi";
import Link from "next/link";

export default function page() {
  return (
    <div className="md:max-w-[941px] mx-3 md:mx-auto mt-14  ">
      <div className="flex justify-center items-center h-[600px]">
        <div className=" mx-auto bg-white   rounded-md p-9 border border-gray-300 space-y-6 ">
          <h1 className="text-3xl md:text-5xl font-semibold text-center">
            Success!
          </h1>
          <h1 className="text-3xl md:text-5xl font-semibold  text-center">
            Your Subscription is Active.
          </h1>
          <Link
            href={"/create-account"}
            className="w-full mt-20 bg-primary border-none hover:bg-green-700 text-white py-2 px-4 rounded-md transition flex items-center justify-center"
          >
            Create Company Profile
            <BiRightArrowAlt className="size-6" />
          </Link>
        </div>
      </div>
    </div>
  );
}
