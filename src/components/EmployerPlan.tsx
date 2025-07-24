'use client'
import React from "react";
import Container from "./ui/Container";
import ComponentHeader from "./shared/ComponentHeader";
import PackageCard from "./shared/PlanCard";
import { useRouter } from "next/navigation";
import { useGetSubscirptionPlansQuery } from "@/redux/features/Subscription/subscriptionSlice";
import Loading from "./Others/Loading";

export default function EmployerPlan() {
  // const SeekerPlan = [
  //   {
  //     price: "19.99",
  //     planType: "Job Seeker Plan",
  //     packageName: "Standard Plan",
  //     permissions: [
  //       "Limited job applications",
  //       "Standard profile visibility",
  //       "Basic resume feedback",
  //       "All free tier benifits included",
  //       "Receive up to 10 job suggestions",
  //     ],
  //   },
  //   {
  //     price: "29.99",
  //     planType: "Job Seeker Plan",
  //     packageName: "Premium Plan",
  //     permissions: [
  //       "Unlimited job applications",
  //       "Priority profile visibility",
  //       "AI resume feedback",
  //       "All free tier benifits included",
  //       "Receive up to 25 job suggestions",
  //     ],
  //   },
  // ];


  const { data: JobSeekerPlans, isLoading } =
    useGetSubscirptionPlansQuery("un");
  console.log(
    JobSeekerPlans?.data.filter(
      (seeker: any) => seeker.description === "Employeer_Plan"
    )
  );

  if (isLoading) {
    return <Loading />;
  }
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

        <div className="flex justify-center flex-wrap mt-12  gap-6 px-4 md:px-0">
          {SeekerPlan?.map((plan: any, index: any) => (
            <div key={index} className="flex justify-center">
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
