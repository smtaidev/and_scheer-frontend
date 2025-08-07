import React from "react";
import { FaBriefcase, FaRobot, FaMousePointer } from "react-icons/fa";
import Container from "./ui/Container";
import ComponentHeader from "./shared/ComponentHeader";

const cardData = [
  {
    icon: <FaBriefcase className="text-3xl text-blue-500 size-12 md:size-20" />,
    title: "10,000+ jobs Listings",
    description: (
      <>
        The best jobs, all in one <br /> place.
      </>
    ),
  },
  {
    icon: <FaRobot className="text-3xl text-pink-500 size-12 md:size-20" />,
    title: "AI Matching Engine",
    description: (
      <>
        Get connected with opportunities based on <br /> your skills and goals.
      </>
    ),
  },
  {
    icon: (
      <FaMousePointer className="text-3xl text-primary size-12 md:size-20" />
    ),
    title: "1-Click Applications",
    description: (
      <>
        Apply for jobs in an instant and get <br /> noticed.
      </>
    ),
  },
];

export default function ChooseUs() {
  return (
    <div>
      <Container>
        <div className="space-y-4">
          <ComponentHeader
            title="Why Choose Us?"
            description={
              <>
                We are a team of professionals who are dedicated to providing
                the best service possible. Our team is made up of experts in
                their <br /> respective fields, and we work together to ensure
                that our clients receive the highest quality service.
              </>
            }
          ></ComponentHeader>

          <div className="flex flex-wrap gap-6 justify-center mt-8">
            {cardData.map((card, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 border border-gray-100 bg-white shadow-md rounded-lg w-full sm:w-[30%] min-w-[280px] max-w-[457px] hover:scale-105 transition-all duration-300 hover:bg-green-50"
              >
                <div className="mb-4 ">{card.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-600 text-center">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
