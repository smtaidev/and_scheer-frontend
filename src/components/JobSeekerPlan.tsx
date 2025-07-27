"use client";
import React, { useState } from "react";
import Container from "./ui/Container";
import ComponentHeader from "./shared/ComponentHeader";
import PackageCard from "./shared/PlanCard";
import { useGetSubscirptionPlansQuery } from "@/redux/features/Subscription/subscriptionSlice";
import Loading from "./Others/Loading";
import { useRouter } from "next/navigation";

export default function JobSeekerPlan() {
  const router = useRouter();
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

  console.log(JobSeekerPlans);

  const handleClick = (id: string) => {
    const jobName = "frontend";
    const company = "Google";
    const location = "New York";

    const query = new URLSearchParams({
      job: jobName,
      company,
      location,
    }).toString();

    router.push(`/checkout/${id}`);
  };

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
                onButtonClick={() => handleClick(plan?.id)}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
