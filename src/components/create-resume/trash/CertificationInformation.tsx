"use client";
import Button from "@/components/shared/button/Button";
import FormInput from "@/components/ui/FormInput";
// import Container from "@/components/Container";
// import ProgressBar from "@/components/progressBar";
// import SectionHeader from "@/components/Shared/SectionHeader";
// import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { IPersonal } from "../personalInfo";

// ✅ Corrected type
type WorkForm = {
  certificate: {
    certificateTitle: string;
    issuingOrganization: string;
    issueDate: string;
    expiryDate: string;
  }[];
};

export default function CertificationInformation({setStep,formData,setFormData}: IPersonal) {
  const { control, register, handleSubmit } = useForm<WorkForm>({
    defaultValues: {
      certificate: [
        {
          certificateTitle: "",
          issuingOrganization: "",
          issueDate: "",
          expiryDate: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certificate",
  });

  //   const router = useRouter();

  const handleBack = (): void => {
    setStep(3);
    console.log("Back")
  };

  const onSubmit = (data:WorkForm) => {
    console.log("Educational Data Submitted:", data);
    setStep(5)
     setFormData(data)
    // router.push("/jobseekeruser/contactInfo");
  };

  return (
    <div className="min-h-screen ">
      {/* <ProgressBar currentStep={4} totalSteps={7} />   */}
      <div className="flex justify-center ">
        <div className="w-full max-w-[1180px] h-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <SectionHeader
                title="Your Certifications"
                description="Provide any relevant certifications you've earned."
              /> */}

            {fields.map((field, index) => (
              <div key={field.id} className="mb-8">
                <div className="mb-4">
                  <FormInput
                    label="Certification Title"
                    type="text"
                    placeholder="e.g., AWS Certified Developer"
                    {...register(
                      `certificate.${index}.certificateTitle` as const,
                      { required: true }
                    )}
                  />
                </div>

                <div className="mb-4 w-1/2">
                  <FormInput
                    label="Issuing Organization"
                    type="text"
                    placeholder="e.g., Amazon Web Services"
                    {...register(
                      `certificate.${index}.issuingOrganization` as const,
                      { required: true }
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <FormInput
                    label="Issue Date"
                    type="date"
                    {...register(`certificate.${index}.issueDate` as const, {
                      required: true,
                    })}
                  />
                  <FormInput
                    label="Expiry Date"
                    type="date"
                    {...register(`certificate.${index}.expiryDate` as const)}
                  />
                </div>

                <div className="flex justify-end">
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 text-sm flex items-center"
                    >
                      <IoIosRemoveCircleOutline className="mr-1" /> Remove
                      Certification
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="mb-12">
              <button
                type="button"
                onClick={() =>
                  append({
                    certificateTitle: "",
                    issuingOrganization: "",
                    issueDate: "",
                    expiryDate: "",
                  })
                }
                className="text-[#28C76F] font-medium flex items-center"
              >
                <span className="mr-2">+</span> Add Another Certification
              </button>
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={() => handleBack()} className="px-4  py-2 rounded-md bg-secondary text-white cursor-pointer hover:bg-black">
                Back
              </button>
              <Button
                type="submit"
                text="Next"
                icon="arrow-right"
                action="submit"
                bgColor="#28C76F"
                name="Next"
                className="px-4  py-2  rounded-md"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
