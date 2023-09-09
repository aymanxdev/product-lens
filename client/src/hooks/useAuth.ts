import { useContext } from "react";
import { AuthContext } from "contexts/Auth/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("cotext", context);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
