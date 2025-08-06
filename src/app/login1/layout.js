// app/login/layout.js
import EllipseBanner from "@/components/landingpage/EllipseBanner";
import Footer from "@/components/landingpage/Footer";
import React from "react";

export default function LoginLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Left side banner */}
      <EllipseBanner />

      {/* Right side content with footer at bottom */}
      <div className="w-1/2 flex flex-col justify-between px-8 py-6">
        <div className="flex-grow flex flex-col justify-center">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
