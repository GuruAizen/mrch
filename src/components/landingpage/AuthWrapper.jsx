"use client";
import React, { useEffect, useState } from "react";
import SignIn from "./SignIn";
import { useRouter } from "next/navigation";

const AuthWrapper = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/dashboard");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return <SignIn />;
};

export default AuthWrapper;
