import { useContext } from "react";
import { AuthContext, type AuthContextType } from "../contexts/AuthContext";

export const useAuth = () => {
  const context = useContext<AuthContextType | undefined>(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}; 