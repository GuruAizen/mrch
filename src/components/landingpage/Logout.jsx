"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Logout = () => {
  const router = useRouter();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      router.push("/");
    } else {
      localStorage.removeItem("token");
      router.push("/");
    }
  }, []);
  return <div></div>;
};

export default Logout;
