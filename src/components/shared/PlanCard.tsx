import { FaCheckCircle } from "react-icons/fa";
import Button from "./button/Button";

interface PackageCardProps {
  price: string;
  planType: string;
  packageName: string;
  permissions: string[];
  buttonText: string;
  onButtonClick?: () => void;
}

export default function PackageCard({
  price,
  planType,
  packageName,
  permissions,
  onButtonClick,
  buttonText,
}: // buttonText,

PackageCardProps) {
  return (
    <div className="relative md:max-w-[457px] 2xl:min-w-[457px] w-full border border-gray-100  bg-white  rounded-lg  px-8 py-5 flex flex-col justify-between">
      <div>
        {/* Price & Plan Type */}
        <div className="text-center mb-12">
          <div className=" ">
            <span className="text-green-600 text-2xl md:text-5xl  font-semibold md:font-bold">
              €{price}
            </span>
            /month
          </div>
        </div>
        <p className="absolute top-0 right-0 m-4 bg-green-300 px-3  rounded-2xl">
          {buttonText}
        </p>

        {/* Package Name */}
        <p className="text-sm text-gray-500">{planType}</p>
        <h1 className="text-2xl md:text-5xl  font-semibold md:font-bold  mb-8">
          {packageName}
        </h1>

        {/* Permissions */}
        <ul className="space-y-4 text-gray-700 mb-6">
          <p className="text-sm text-gray-500">Permisssons :</p>
          {permissions?.map((permission, index) => (
            <li key={index} className="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M9.62388 22.029C14.1234 22.029 17.771 18.3814 17.771 13.8819C17.771 9.38243 14.1234 5.73486 9.62388 5.73486C5.12438 5.73486 1.47681 9.38243 1.47681 13.8819C1.47681 18.3814 5.12438 22.029 9.62388 22.029Z"
                  fill="#B0EF8F"
                />
                <path
                  d="M9.71605 20.1789L9.61271 20.0028C8.03425 17.3134 3.83969 11.6061 3.79732 11.5488L3.73682 11.4666L5.16588 10.0543L9.68951 13.213C12.5377 9.51708 15.1949 6.97853 16.9281 5.49611C18.8242 3.8745 20.0584 3.12796 20.0708 3.1208L20.0989 3.104H22.523L22.2914 3.31022C16.3363 8.6145 9.88146 19.8882 9.81717 20.0015L9.71605 20.1789Z"
                  fill="#009045"
                />
              </svg>
              <span>{permission}</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={onButtonClick}
        className="px-3 py-1.5 xl:px-6 xl:py-3 bg-primary text-white text-xs xl:text-sm font-medium rounded hover:bg-white hover:text-black hover:border-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-300 whitespace-nowrap"
      >
        Get Started
      </button>
    </div>
  );
}
