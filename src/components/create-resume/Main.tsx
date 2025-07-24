"use client";
import React, { useState } from "react";
import Container from "../ui/Container";
import ProgressBar from "../ui/progressBar";
import PersonalInformation from "./personalInfo";
import CareerOverview from "./CareerOverview";
import SkillsExperience from "./SkillnExp";
import EducationalBackground from "./EducationalBackground";
import ContactInfo from "./ContactInfo";
import GenerateResume from "./GenerateResume";
import MyResume from "./MyResume";
import Education from "./EducationCertificate";

const MainComponents = () => {
  const [step, setStep] = useState(1);
  // to-do
  // there will be a staet to manage all data
  const handleStep = (step: number) => {
    setStep(step);
  };

  return (
    <Container>
      <div className=" px-2">
        <ProgressBar currentStep={step} totalSteps={7} />
        {step === 1 && <PersonalInformation setStep={setStep} />}
        {step === 2 && <CareerOverview setStep={setStep} />}
        {step === 3 && <SkillsExperience setStep={setStep} />}
        {step === 4 && <Education setStep={setStep} />}
        {step === 5 && <ContactInfo setStep={setStep} />}
        {step === 6 && <GenerateResume setStep={setStep} />}
        {step === 7 && <MyResume />}
      </div>
    </Container>
  );
};

export default MainComponents;
