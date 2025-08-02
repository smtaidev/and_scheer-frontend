'use client';
import React from "react";
import Container from "./ui/Container";
import ComponentHeader from "./shared/ComponentHeader";
import PackageCard from "./shared/PlanCard";
import { useRouter } from "next/navigation";
import { useGetSubscirptionPlansQuery } from "@/redux/features/Subscription/subscriptionSlice";
import Loading from "./Others/Loading";
import { useGetMeQuery } from "@/redux/features/auth/auth";

export default function EmployerPlan() {
  const { data: JobSeekerPlans, isLoading } =
    useGetSubscirptionPlansQuery("un");

  const { data: user } = useGetMeQuery({});

  if (isLoading) {
    return <Loading />;
  }

  // Filter the employer plans
  const SeekerPlan = JobSeekerPlans?.data.filter(
    (seeker: any) => seeker.description === "Employer_Plan"
  );

  const router = useRouter();

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
    <div>
      <Container>
        <ComponentHeader
          title="Employer Plans"
          description="Choose the Right Plan for Your Business."
        ></ComponentHeader>

        <div className="flex justify-center flex-wrap mt-12 gap-6 px-4 md:px-0">
          {SeekerPlan?.map((plan: any, index: any) => (
            <div key={index} className="flex justify-center">
              <PackageCard
                price={plan?.amount}
                planType={plan?.planType}
                packageName={plan?.planName}
                permissions={plan?.features}
                // Button Text will be "Active" if the planId matches the user's planId
                buttonText={user?.data.planId === plan?.id ? "Active" : "Get Started"}
                onButtonClick={() => {
                  // Only allow navigation to checkout if the plan is not active
                  if (user?.data.planId !== plan?.id) {
                    handleClick(plan?.id);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
