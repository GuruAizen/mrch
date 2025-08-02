"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import logo from "@/assets/landingpage/msh_logo.png";
import eyesoff from "@/assets/landingpage/eyesoff.png";
import eyeson from "@/assets/landingpage/eyeson.png";
import leftarrow from "@/assets/landingpage/leftarrow.png";
import Image from "next/image";

const ForgotPassword = ({ onBack }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: "",
  });

  const [visibleErrorUsername, setVisibleErrorUsername] = useState("");
  const [visibleErrorEmail, setVisibleErrorEmail] = useState("");
  const [visibleErrorPassword, setVisibleErrorPassword] = useState("");
  const [visibleErrorConfirmPassword, setVisibleErrorConfirmPassword] =
    useState("");
  const [visibleErrorAgreed, setVisibleErrorAgreed] = useState("");

  const togglePasswordVisibility = () =>
    setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  // Animated error transitions
  useEffect(() => {
    const timers = [];

    for (const [key, setter] of Object.entries({
      username: setVisibleErrorUsername,
      email: setVisibleErrorEmail,
      password: setVisibleErrorPassword,
      confirmPassword: setVisibleErrorConfirmPassword,
      agreed: setVisibleErrorAgreed,
    })) {
      if (errors[key]) {
        setter(errors[key]);
      } else {
        const timer = setTimeout(() => setter(""), 500);
        timers.push(timer);
      }
    }

    return () => timers.forEach(clearTimeout);
  }, [errors]);

  const validate = (fieldValues = formData, agreedValue = agreed) => {
    const tempErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreed: "",
    };

    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if ("username" in fieldValues) {
      if (!fieldValues.username)
        tempErrors.username = "Username is required.";
      else if (!usernameRegex.test(fieldValues.username))
        tempErrors.username =
          "Username must be 3–20 characters, letters and numbers only.";
    }

    if ("email" in fieldValues) {
      if (!fieldValues.email) tempErrors.email = "Email is required.";
      else if (!emailRegex.test(fieldValues.email))
        tempErrors.email = "Email is not valid.";
    }

    if ("password" in fieldValues) {
      if (!fieldValues.password)
        tempErrors.password = "Password is required.";
      else if (
        fieldValues.password.length < 6 ||
        fieldValues.password.length > 30
      )
        tempErrors.password = "Password must be 6–30 characters long.";
    }

    if (
      "confirmPassword" in fieldValues ||
      fieldValues.confirmPassword !== undefined
    ) {
      if (!fieldValues.confirmPassword)
        tempErrors.confirmPassword = "Confirm Password is required.";
      else if (fieldValues.confirmPassword !== formData.password)
        tempErrors.confirmPassword = "Passwords do not match.";
    }

    if (submitted && !agreedValue) {
      tempErrors.agreed = "You need to agree to the Terms & Conditions";
    }

    setErrors(tempErrors);
    return tempErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    if (submitted)
      validate({ [name]: value, ...updatedForm }, agreed);
  };

  const handleCheckboxChange = (checked) => {
    setAgreed(checked);
    if (submitted) validate(formData, checked);
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
    const noErrors = Object.values(validationErrors).every(
      (x) => x === ""
    );

    if (noErrors) {
      localStorage.setItem("token", formData.username);
      router.push("/dashboard");
    }
  };

  return (
    <div className="relative w-full flex flex-col gap-0">
      <div className="w-max flex flex-row items-center gap-3 pb-12">
        <Image width={74} height={74} alt="My Smart Health" src={logo} />
        <div className="w-[227px] h-8 font-inter font-semibold text-2xl text-[#004C72]">
          My Smart Health
        </div>
      </div>

      <div className="flex flex-row items-center h-8">
        <Image
          src={leftarrow}
          width={36}
          height={36}
          onClick={onBack}
          className="absolute top-[82px] left-[-35px] cursor-pointer"
        />
        <div className="pb-4 absolute top-[82px] left-6">
          <h2 className="w-auto font-inter h-10 font-medium text-black text-2xl">
            Forgot Password
          </h2>
        </div>
      </div>

      <div className="w-full flex flex-col pl-6">
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          {/* Username */}
          <InputWithError
            name="username"
            type="text"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            error={visibleErrorUsername}
            showError={errors.username}
          />

          {/* Email */}
          {/* <InputWithError
            name="email"
            type="text"
            placeholder="Enter Email ID"
            value={formData.email}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            error={visibleErrorEmail}
            showError={errors.email}
          /> */}

          {/* Password */}
          <InputWithError
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            error={visibleErrorPassword}
            showError={errors.password}
            toggleVisibility={togglePasswordVisibility}
            isPasswordVisible={showPassword}
          />

          {/* Confirm Password */}
          <InputWithError
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            error={visibleErrorConfirmPassword}
            showError={errors.confirmPassword}
            toggleVisibility={toggleConfirmPasswordVisibility}
            isPasswordVisible={showConfirmPassword}
          />

          {/* Checkbox */}
          <div className="w-full h-12">
            <label className="flex items-center gap-2 text-sm text-gray-700 font-inter font-normal">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => handleCheckboxChange(e.target.checked)}
                className="w-5 h-5 appearance-none border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center transition checked:border-blue-500 checked:before:content-['✔'] checked:before:text-blue-500 checked:before:text-xs checked:before:font-semibold checked:before:flex checked:before:items-center checked:before:justify-center checked:before:h-full checked:before:w-full"
              />
              I have agreed to the{" "}
              <span className="text-[#1BB5D7] cursor-pointer font-inter">
                Terms & Conditions
              </span>
            </label>
            <div
              className={`px-0 text-red-500 text-sm mt-1 transition-opacity duration-500 ease-in-out overflow-hidden min-h-5 ${
                errors.agreed ? "opacity-100 max-h-20" : "opacity-0 max-h-0"
              }`}
            >
              {visibleErrorAgreed || " "}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#1BB5D7] text-white font-bold font-inter py-2 px-6 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

// ✅ InputWithError component with optional eye toggle
const InputWithError = ({
  name,
  type,
  placeholder,
  value,
  onChange,
  onKeyDown,
  error,
  showError,
  toggleVisibility,
  isPasswordVisible,
}) => {
  return (
    <div className="relative w-full h-16">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="w-full border border-gray-300 px-4 py-2 placeholder-[#807D7D] font-inter text-lg rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
      {toggleVisibility && (
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-3 top-4 text-gray-500 hover:text-gray-700 hover:scale-110 transition-transform duration-300 ease-in-out"
          aria-label={isPasswordVisible ? "Hide password" : "Show password"}
        >
          <Image
            src={isPasswordVisible ? eyeson : eyesoff}
            width={15}
            height={15}
            alt="toggle visibility"
            className="object-contain"
          />
        </button>
      )}
      <div
        className={`px-2 text-red-500 text-sm mt-1 transition-opacity duration-500 ease-in-out overflow-hidden min-h-5 ${
          showError ? "opacity-100 max-h-20" : "opacity-0 max-h-0"
        }`}
      >
        {error || " "}
      </div>
    </div>
  );
};
