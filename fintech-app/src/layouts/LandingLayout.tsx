import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import React from "react";

const LandingLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
