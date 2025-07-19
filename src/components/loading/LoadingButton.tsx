import React from "react";
import { BeatLoader } from "react-spinners";

const LoadingButton = () => {
  return (
    <div className="flex justify-center items-center">
      <BeatLoader
        color="#fff"
        size={18}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingButton;
