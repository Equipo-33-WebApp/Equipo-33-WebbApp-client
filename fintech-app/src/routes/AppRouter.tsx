import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import DashboardPage from "../pages/DashboardPage";

import LandingLayout from "../layouts/LandingLayout";
import DashboardLayout from "../layouts/DashboardLayout";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingLayout><LandingPage /></LandingLayout>} />
      <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
    </Routes>
  );
};

export default AppRouter;
