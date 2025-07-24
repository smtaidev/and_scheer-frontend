import React from "react";

type ButtonProps = {
  name?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  [key: string]: unknown;
};

export default function Button({
  name = "Submit",
  type = "button",
  className = "w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-green-600 cursor-pointer transition",
  onClick,
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${className} bg-primary text-white`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {name}
    </button>
  );
}
