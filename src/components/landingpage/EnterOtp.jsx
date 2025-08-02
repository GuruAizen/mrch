"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/landingpage/msh_logo.png";
import leftarrow from "@/assets/landingpage/leftarrow.png";

export default function EnterOtp({ mobile, onBack }) {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [agreed, setAgreed] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [errorAgreed, setErrorAgreed] = useState("");
  const [errorOtp, setErrorOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(45); // 45s countdown
  const inputRefs = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // OTP change with auto-tab/backspace
  const handleChange = (idx, val) => {
    if (/^\d?$/.test(val)) {
      const newOtp = [...otp];
      newOtp[idx] = val;
      setOtp(newOtp);
      if (val && idx < 3) inputRefs.current[idx + 1]?.focus();
      // Clear OTP error on change
      if (errorOtp) setErrorOtp("");
    }
  };
  const handleKey = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Check terms checkbox
    if (!agreed) {
      setErrorAgreed("You need to agree to the Terms & Conditions");
    } else {
      setErrorAgreed("");
    }

    // Check if all OTP digits entered
    if (!otp.every((d) => d !== "")) {
      setErrorOtp("Please enter the 4-digit OTP.");
      return;
    } else {
      setErrorOtp("");
    }

    if (agreed && otp.every((d) => d !== "")) {
      // Validate OTP - compare with last 4 digits of mobile
      const last4Mobile = mobile.slice(-4);
      const enteredOtp = otp.join("");

      if (enteredOtp !== last4Mobile) {
        setErrorOtp("Invalid OTP. Please try again.");
        return;
      }

      // OTP valid
      setErrorOtp("");
      localStorage.setItem("token", mobile);
      localStorage.setItem("password", enteredOtp);
      router.push("/dashboard");
    }
  };

  return (
    <div className="relative w-full flex flex-col gap-0">
      {/* branding & back */}
      <div className="flex items-center gap-3 pb-12">
        <Image width={74} height={74} src={logo} alt="logo" />
        <div className="font-inter font-semibold text-2xl text-[#004C72]">
          My Smart Health
        </div>
      </div>

      <div className="flex flex-row items-center h-8 mb-4">
        <Image
          src={leftarrow}
          width={36}
          height={36}
          onClick={onBack}
          className="cursor-pointer"
          alt="Back"
        />
        <h2 className="font-inter font-medium text-black text-2xl ml-4">
          Enter OTP
        </h2>
      </div>

      <form className="pl-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        <p className="text-sm text-gray-600 font-inter">
          We sent an OTP to +91 {mobile} via SMS, enter 4‑digit code
        </p>

        <div className="flex gap-3">
          {otp.map((d, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              id={`otp-${i}`}
              type="text"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKey(e, i)}
              className={`w-12 h-12 text-center border rounded text-lg focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                errorOtp
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
            />
          ))}
        </div>

        {/* OTP error */}
        <div
          className={`text-red-500 text-sm mt-1 transition-opacity duration-500 ease-in-out overflow-hidden min-h-5 ${
            errorOtp ? "opacity-100 max-h-20" : "opacity-0 max-h-0"
          }`}
          role="alert"
        >
          {errorOtp || " "}
        </div>

        {/* Resend message */}
        <p className="text-sm text-gray-600">
          Resend is available in{" "}
          {timeLeft > 0 ? (
            <span>{timeLeft.toString().padStart(2, "0")}s</span>
          ) : (
            <button
              type="button"
              className="text-[#1BB5D7] underline"
              onClick={() => setTimeLeft(45)}
            >
              Resend SMS
            </button>
          )}
        </p>

        {/* Checkbox */}
        <label className="flex items-center gap-2 text-sm text-gray-700 font-inter">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => {
              setAgreed(e.target.checked);
              if (submitted && !e.target.checked)
                setErrorAgreed("You need to agree to the Terms & Conditions");
              else setErrorAgreed("");
            }}
            className="w-5 h-5 appearance-none border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center transition checked:border-blue-500 checked:before:content-['✔'] checked:before:text-blue-500 checked:before:text-xs checked:before:font-semibold checked:before:flex checked:before:items-center checked:before:justify-center checked:before:h-full checked:before:w-full"
          />
          I have read and Agreed to{" "}
          <span className="text-[#1BB5D7] cursor-pointer font-inter">
            Terms & Conditions
          </span>
        </label>
        <div
          className={`text-red-500 text-sm mt-1 transition-opacity duration-500 ease-in-out overflow-hidden min-h-5 ${
            errorAgreed ? "opacity-100 max-h-20" : "opacity-0 max-h-0"
          }`}
          role="alert"
        >
          {errorAgreed || " "}
        </div>

        {/* Continue button */}
        <button className="bg-[#1BB5D7] text-white font-bold font-inter py-2 px-6 rounded hover:bg-blue-600">
          Continue
        </button>
      </form>
    </div>
  );
}
