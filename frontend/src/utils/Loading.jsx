import React from "react";
// import BeatLoader from "react-spinners/BeatLoader";
// import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import CircleLoader from "react-spinners/CircleLoader";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      {/* <BeatLoader color="#000"  /> */}

      <CircleLoader size={100} color="#000" />
      {/* <ClimbingBoxLoader color="#000"  /> */}
    </div>
  );
};

export default Loading;
