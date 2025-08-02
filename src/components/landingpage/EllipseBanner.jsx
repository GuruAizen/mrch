// components/EllipseBanner.jsx
import Image from "next/image";
import doclogo from "@/assets/landingpage/doctorspic.png";
import React from "react";

// EllipseBanner component for the left-side layout, reusable across components
const EllipseBanner = () => {
  return (
    <div className="relative w-[45%] h-screen flex items-center justify-center overflow-hidden ">
      {/* Oval Background - Showing only right half with clipped effect */}
      <div
        className="absolute w-[760px] h-[150vh] rounded-[50%] flex flex-col items-center justify-start pt-[36%] pl-[25%]"
        style={{
          background:
            "linear-gradient(90.46deg, #EDDAF7 -5.55%, #1BB5D7 102.06%)",
          left: "-210px", // Shift left to hide left half completely behind the container
          top: "-15%",
          zIndex: 1,
        }}
      >
        <Image
          src={doclogo}
          width={480}
          height={350}
          alt="Doctor Illustration"
          className="object-contain"
        />
        <p className="w-[400px] text-white font-lato font-medium text-center text-lg mt-4 leading-snug">
          Manage appointments, patients, doctors, insurance, and more – all in
          one place
        </p>
      </div>
    </div>
  );
};

export default EllipseBanner;
