import { ReactNode, createContext, useState } from "react";
import * as authService from "api/authService";

interface AuthContextProps {
  isAuthenticated: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => Promise<void>;
  user: null | any;
}
interface ChildrenProps {
  children: ReactNode;
}
export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState(null);

  const loginUser = async (email: string, password: string) => {
    try {
      const data = await authService.loginUser(email, password);
      setUser(data.user); // Assuming your login response returns user data
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      if (user) {
        const { _id } = user; // Destructure the _id property from the user object
        await authService.logoutUser(_id); // Pass the _id property to the logoutUser method
        setUser(null);
      }
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, loginUser, logoutUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
