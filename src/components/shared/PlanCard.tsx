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
}: // buttonText,

  PackageCardProps) {
  const doSomething = () => {
    console.log("Payment started");
  };
  return (
    <div className=" md:max-w-[457px] 2xl:min-w-[457px] w-full border border-gray-100  bg-white  rounded-lg shadow-md px-8 py-5 flex flex-col justify-between">
          <div>
      {/* Price & Plan Type */}
      <div className="text-center mb-12">
        <div className=" ">
          <span className="text-green-600 text-2xl md:text-5xl  font-semibold md:font-bold"  >
            €{price}
          </span>
          /month
        </div>
      </div>


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
              <FaCheckCircle className="text-green-500 mt-1" />
              <span>{permission}</span>
            </li>
          ))}
        </ul>
      </div>



      {/* Button */}

      <Button onClick={onButtonClick} name="Get Started" />
    </div>
  );
}
