import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";

interface InfoSectionProps {
  imageUrl: string;
  title: string;
  title2: string | React.ReactNode;
  description: string;
  buttonText: string;
  onButtonClick?: () => void;
  className?: string;
  height: number;
  width: number;
}

export default function InfoSection({
  imageUrl,
  className = "",
  title,
  title2,
  description,
  buttonText,
  onButtonClick,
  height,
  width,
}: InfoSectionProps) {
  return (
    <div
      className={`flex flex-col  items-center gap-10 md:gap-14 md:px-6 py-12 max-w-6xl mx-auto ${className}`}
    >
      {/* Left - Image */}
      <div className="w-full md:w-1/2">
        <Image
          src={imageUrl}
          alt={title}
          className="w-full max-h-[689px] rounded-lg shadow-md object-cover"
          height={height}
          width={width}
        />
      </div>

      {/* Right - Content */}
      <div className="w-full md:w-1/2 space-y-8 md:space-y-12">
        <div className="space-y-4 ">
          <h2 className="text-2xl md:text-4xl font-semibold ">
            {title} <span className="text-primary">{title2}</span>
          </h2>

          <p className="para-main">{description}</p>
        </div>

        <button
          onClick={onButtonClick}
          className="px-6 py-3 bg-black-button text-white font-semibold rounded bg-primary transition flex"
        >
          {buttonText}
          <BsArrowRight className="my-auto ml-2"> </BsArrowRight>
        </button>
      </div>
    </div>
  );
}
