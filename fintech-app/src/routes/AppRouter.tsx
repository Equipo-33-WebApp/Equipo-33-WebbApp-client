import React from "react";
import { Route, Routes } from "react-router-dom";

import DashboardPage from "../pages/DashboardPage";

import { LandingPage } from "@/pages/LandingPage";
import DashboardLayout from "../layouts/DashboardLayout";
import LandingLayout from "../layouts/LandingLayout";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingLayout>
            <LandingPage />
          </LandingLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <DashboardPage />
          </DashboardLayout>
        }
      />
    </Routes>
  );
};

export default AppRouter;
