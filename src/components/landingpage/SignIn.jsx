"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import logo from "@/assets/landingpage/msh_logo.png";
import eyesoff from "@/assets/landingpage/eyesoff.png";
import eyeson from "@/assets/landingpage/eyeson.png";
import Image from "next/image";

const SignIn = ({ onForgotPasswordClick }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true); // checked initially
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    agreed: "",
  });

  const [submitted, setSubmitted] = useState(false); // track if form submitted once

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const [visibleErrorAgreed, setVisibleErrorAgreed] = useState("");
  const [visibleErrorUsername, setVisibleErrorUsername] = useState("");
  const [visibleErrorPassword, setVisibleErrorPassword] = useState("");

  // Update error display with animation
  useEffect(() => {
    if (errors.agreed) {
      setVisibleErrorAgreed(errors.agreed); // Show immediately when error comes
    } else {
      // Delay clearing text to allow fade-out animation to complete
      const timer = setTimeout(() => setVisibleErrorAgreed(""), 500); // match transition-duration
      return () => clearTimeout(timer);
    }
  }, [errors.agreed]);
  useEffect(() => {
    if (errors.username) {
      setVisibleErrorUsername(errors.username);
    } else {
      const timer = setTimeout(() => setVisibleErrorUsername(""), 500);
      return () => clearTimeout(timer);
    }
  }, [errors.username]);

  useEffect(() => {
    if (errors.password) {
      setVisibleErrorPassword(errors.password);
    } else {
      const timer = setTimeout(() => setVisibleErrorPassword(""), 500);
      return () => clearTimeout(timer);
    }
  }, [errors.password]);

  // Validation function
  const validate = (fieldValues = formData, agreedValue = agreed) => {
    const tempErrors = { username: "", password: "", agreed: "" };
    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;

    if ("username" in fieldValues) {
      if (!fieldValues.username) tempErrors.username = "Username is required.";
      else if (!usernameRegex.test(fieldValues.username))
        tempErrors.username =
          "Username must be 3-20 characters, letters and numbers only.";
    }

    if ("password" in fieldValues) {
      if (!fieldValues.password) tempErrors.password = "Password is required.";
      else if (
        fieldValues.password.length < 6 ||
        fieldValues.password.length > 30
      )
        tempErrors.password = "Password must be 6-30 characters long.";
    }

    if (submitted) {
      // Only check checkbox error after first submit
      if (!agreedValue)
        tempErrors.agreed = "You need to agree to the Terms & Conditions";
    }

    setErrors(tempErrors);
    return tempErrors;
  };

  // Handle input change + live validation if form submitted at least once
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (submitted) {
      validate({ [name]: value });
    }
  };

  // Handle checkbox change + live validation if form submitted once
  const handleCheckboxChange = (checked) => {
    setAgreed(checked);
    if (submitted) {
      validate(formData, checked);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      alert("Don't press Enter");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const validationErrors = validate(formData, agreed);

    const noErrors = Object.values(validationErrors).every((x) => x === "");

    if (noErrors) {
      localStorage.setItem("token", formData.username);
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 ">
      <div className=" w-full flex flex-row items-center gap-3  pb-5 ">
        <div>
          <Image width={74} height={74} alt="My Smart Health" src={logo} />
        </div>
        <div className="w-[227px] h-8 font-inter font-semibold text-2xl text-[#004C72] ">
          My Smart Health
        </div>
      </div>

      <div className="w-full  flex flex-col pl-6 ">
        <div className="pb-4">
          <h2 className="w-auto h-10 font-inter font-medium text-black text-2xl">
            Login
          </h2>
        </div>
        <form className="flex flex-col gap-4 w-full " onSubmit={handleSubmit}>
          {/* Username */}
          <div className="w-full h-16">
            <input
              type="text"
              name="username"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter user name"
              value={formData.username}
              className="w-full border border-gray-300 px-4 py-2
             placeholder-[#807D7D] 
             font-inter
             text-lg
             rounded
             focus:outline-none
             focus:border-blue-500
             focus:ring-1
              focus:ring-blue-500"
            />
            {/* Username error */}
            <div
              className={`px-2 text-red-500 text-sm mt-1 transition-opacity duration-500 ease-in-out overflow-hidden min-h-5
              ${
                errors.username ? "opacity-100 max-h-20" : "opacity-0 max-h-0"
              }`}
            >
              {visibleErrorUsername || " "}
            </div>
          </div>

          {/* Password + toggle */}
          <div className="relative w-full  h-16">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter Password"
              value={formData.password}
              className=" w-full   border border-gray-300 px-4 py-2
             placeholder-[#807D7D] 
             font-inter
             text-lg
             rounded
             focus:outline-none
             focus:border-blue-500
             focus:ring-1
              focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-4
               text-gray-500
                hover:text-gray-700 
                hover:scale-110
                transition-transform
                duration-300
                ease-in-out"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <Image
                  src={eyeson}
                  width={15}
                  height={15}
                  className="object-contain"
                />
              ) : (
                <Image
                  src={eyesoff}
                  width={15}
                  height={15}
                  className="object-contain"
                />
              )}
            </button>
            {/* Password error */}
            <div
              className={`px-2 text-red-500 text-sm mt-1 transition-opacity duration-500 ease-in-out overflow-hidden min-h-5
              ${
                errors.password ? "opacity-100 max-h-20" : "opacity-0 max-h-0"
              }`}
            >
              {visibleErrorPassword || " "}
            </div>
          </div>

          {/* Forgot Password */}
          <div className=" w-full flex justify-end text-[#1BB5D7] ">
            <p className="cursor-pointer" onClick={onForgotPasswordClick}>
              Forgot Password?
            </p>
          </div>

          {/* Checkbox */}
          <div className="w-full h-12 ">
            <label
              className="flex items-center 
            gap-2 text-sm text-gray-700 
            font-inter
              font-normal
              
            "
            >
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => handleCheckboxChange(e.target.checked)}
                className={`
        w-5 h-5
        appearance-none
        border border-gray-400
        rounded-sm
        cursor-pointer
        flex items-center justify-center
        transition
        checked:bg-transparent
        checked:border-blue-500
        checked:before:content-['✔']
        checked:before:text-blue-500
        checked:before:text-xs
        checked:before:font-semibold
        checked:before:flex
        checked:before:items-center
        checked:before:justify-center
        checked:before:h-full
        checked:before:w-full
      `}
              />
              I have agreed to the
              <span className="text-[#1BB5D7] cursor-pointer font-inter">
                Terms & Conditions
              </span>
            </label>
            {/* Checkbox error */}
            <div
              className={`px-0 text-red-500 text-sm mt-1 transition-opacity duration-500 ease-in-out overflow-hidden min-h-5
                ${
                  errors.agreed ? "opacity-100 max-h-20" : "opacity-0 max-h-0"
                }`}
            >
              {visibleErrorAgreed || " "}
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-[#1BB5D7] text-white font-bold font-inter py-2 px-6 rounded hover:bg-blue-600"
            onClick={()=>router.push('/register')}
          >
            Sign In
          </button>
        </form>

        <div className="flex gap-3 font-inter text-[#525151] pt-3">
          Don’t have an account?
          <span
            className="font-inter text-[#1BB5D7] cursor-pointer "
            onClick={() => router.push("/register")}
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
