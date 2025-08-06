"use client";
import React, { useState } from "react";
import ForgotPassword from "@/components/landingpage/ForgotPassword";
import EnterOtp from "@/components/landingpage/EnterOtp";

export default function ForgotPasswordOrOtpPage() {
  const [showOtp, setShowOtp] = useState(false);
  const [mobile, setMobile] = useState("");

  const handleFormSuccess = (username) => {
    setMobile(username);
    setShowOtp(true);
  };

  return showOtp ? (
    <EnterOtp mobile={mobile} onBack={() => setShowOtp(false)} />
  ) : (
    <ForgotPassword onOtpRequest={handleFormSuccess} />
  );
}
