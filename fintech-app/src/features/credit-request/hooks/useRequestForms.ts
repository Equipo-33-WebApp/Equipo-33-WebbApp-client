import { useContext } from "react";
import { RequestContext } from "../context/requestContext";

export const useRequestForms = () => {
  const ctx = useContext(RequestContext);
  if (!ctx) throw new Error("useRequestsForms must be used within an RequestProvider");
  return ctx;
};