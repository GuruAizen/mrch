"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SignIn from "@/components/landingpage/SignIn";
import ForgotPassword from "@/components/landingpage/ForgotPassword";

export default function LoginPage() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  // const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  // if (loading) return <p>Loading...</p>;

  return (
    <>
      {showForgotPassword ? (
        <ForgotPassword onBack={() => setShowForgotPassword(false)} />
      ) : (
        <SignIn onForgotPasswordClick={() => setShowForgotPassword(true)} />
      )}
    </>
  );
}
