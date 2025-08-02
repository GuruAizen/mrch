"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import EnterOtp from "@/components/landingpage/EnterOtp";

export default function OtpPage() {
  const searchParams = useSearchParams();
  const mobile = searchParams.get("mobile");
  const router = useRouter();

  if (!mobile) {
    // redirect back if no mobile number found in query
    router.push("/forgot-password");
    return null;
  }

  return (
    <EnterOtp
      mobile={mobile}
      onBack={() => router.push("/forgot-password")}
    />
  );
}
