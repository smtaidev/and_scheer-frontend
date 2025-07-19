"use client";
import React, { useState } from "react";
import Container from "./ui/Container";
import ComponentHeader from "./shared/ComponentHeader";
import PackageCard from "./shared/PlanCard";
import { useGetSubscirptionPlansQuery } from "@/redux/features/Subscription/subscriptionSlice";
import Loading from "./Others/Loading";

const SeekerPlan = [
  {
    price: "$9.99",
    planType: "Job Seeker Plan",
    packageName: "Basic Plan",
    permissions: [
      "Limited job applications",
      "Basic profile visibility",
      "No resume feedback",
      "All free tier benifits included",
      "Receive up to 5 job suggestions",
    ],
  },

  {
    price: "$19.99",
    planType: "Job Seeker Plan",
    packageName: "Standard Plan",
    permissions: [
      "Limited job applications",
      "Standard profile visibility",
      "Basic resume feedback",
      "All free tier benifits included",
      "Receive up to 10 job suggestions",
    ],
  },
  {
    price: "$29.99",
    planType: "Job Seeker Plan",
    packageName: "Premium Plan",
    permissions: [
      "Unlimited job applications",
      "Priority profile visibility",
      "AI resume feedback",
      "All free tier benifits included",
      "Receive up to 25 job suggestions",
    ],
  },
];

export default function JobSeekerPlan() {
  const { data: JobSeekerPlans, isLoading } =
    useGetSubscirptionPlansQuery("un");
  console.log(
    JobSeekerPlans?.data.filter(
      (seeker: any) => seeker.description === "Job_Seeker_Plan"
    )
  );

  if (isLoading) {
    return <Loading />;
  }
  const SeekerPlan = JobSeekerPlans?.data.filter(
    (seeker: any) => seeker.description === "Job_Seeker_Plan"
  );

  return (
    <div id="pricing" className="bg-[#F8F8F8]">
      <Container>
        <ComponentHeader
          title="Job Seeker Plans"
          description="Choose the Right Plan for Your Career."
        ></ComponentHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 px-4 md:px-0">
          {SeekerPlan?.map((plan: any) => (
            <div key={plan?.id} className="md:flex justify-center">
              <PackageCard
                price={plan?.amount}
                planType={plan?.planType}
                packageName={plan?.planName}
                permissions={plan?.features}
                buttonText="Choose Plan"
                onButtonClick={() => console.log(`Selected ${plan?.id}`)}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
