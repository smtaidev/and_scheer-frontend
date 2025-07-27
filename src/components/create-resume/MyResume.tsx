"use client";

import Link from "next/link";
import SectionHeader from "../shared/SectionHeader";
import ResumeComponent from "./ui/ResumeComponent";
import Button from "../shared/button/Button";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Adjust path if different

export default function MyResume() {
  const printRef = useRef<HTMLDivElement>(null);

  const downloadResume = async () => {
    const element = printRef.current;
    if (!element) {
      return;
    }

    console.log(element);

    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("my_resume.pdf");
  };

  return (
    <div className="flex justify-center mt-12 h-full">
      <div className="p-6 w-full max-w-[1180px]">
        <SectionHeader
          title="Review Your AI-Generated Resume"
          description="Take a moment to review your resume. You can make changes and regenerate if needed. When you’re ready, download it and start applying!"
        ></SectionHeader>
        <ResumeComponent downloadResume={downloadResume} printRef={printRef} />
        <div className="flex gap-12 py-16 ">
          <button
            onClick={downloadResume}
            className="w-full bg-[#DBDBDB] text-black  py-3 px-6 rounded-lg hover:bg-gray-200 transition  font-medium"
            name="Download Resume"
          >
            Download Resume
          </button>

          <Link href={"/jobSeeker/home"} className="w-full">
            <Button name="Find Your Favorite Job">
              Find Your Favorite Job
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
