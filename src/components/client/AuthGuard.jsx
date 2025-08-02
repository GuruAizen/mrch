// components/AuthGuard.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthGuard = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthorized(true);
    } else {
      router.push("/login");
    }
    setLoading(false);
  }, []);

  if (loading) return <p>Checking access...</p>;

  return authorized ? children : null;
};

export default AuthGuard;
