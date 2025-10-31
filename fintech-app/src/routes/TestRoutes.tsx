import { Routes, Route } from "react-router-dom";
import TestLayout from "@/layouts/TestLayout";




export const TestRoutes = () => {

  return (
    <Routes>
      <Route element={<TestLayout />}>
      </Route>
    </Routes>
  );
}
