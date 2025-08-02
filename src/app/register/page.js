"use client";
import React, { useState } from "react";
import SignUp from "@/components/landingpage/SignUp";
import ForgotPassword from "@/components/landingpage/ForgotPassword";

export default function Page() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <>
      {showForgotPassword ? (
        <ForgotPassword onBack={() => setShowForgotPassword(false)} />
      ) : (
        <SignUp onForgotPasswordClick={() => setShowForgotPassword(true)} />
      )}
    </>
  );
}
