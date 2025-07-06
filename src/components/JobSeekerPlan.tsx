import React from "react";
import Container from "./ui/Container";
import ComponentHeader from "./shared/ComponentHeader";
import PackageCard from "./shared/PlanCard";

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
  return (
    <div className="bg-[#F8F8F8]">
      <Container>
        <ComponentHeader
          title="Job Seeker Plans"
          description="Choose the Right Plan for Your Career."
        ></ComponentHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 px-4 md:px-0">
          {SeekerPlan.map((plan, index) => (
            <div key={index} className="md:flex justify-center">
              <PackageCard
                price={plan.price}
                planType={plan.planType}
                packageName={plan.packageName}
                permissions={plan.permissions}
                buttonText="Choose Plan"
                onButtonClick={() =>
                  console.log(`Selected ${plan.packageName}`)
                }
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
