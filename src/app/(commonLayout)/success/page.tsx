import React from "react";
import SuccessDetails from "../../../components/SuccessDetails";

export default function page() {
  return (
    <div className="md:max-w-[941px] mx-3 md:mx-auto mt-14 ">
      <div className="mb-[42px]">
        <h1 className="text-3xl md:text-5xl font-semibold text-center">
          Success!
        </h1>
        <h1 className="text-3xl md:text-5xl font-semibold  text-center">
          Your Subscription is Active.
        </h1>
      </div>

      <SuccessDetails />
    </div>
  );
}
