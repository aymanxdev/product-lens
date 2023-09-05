import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import * as authService from "api/authService";
import useLocalStorage from "../../hooks/useLocalStorage";

const TOKEN_REFRESH_THRESHOLD = 10 * 60 * 1000;

interface AuthContextProps {
  isAuthenticated: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (
    name: string,
    email: string,
    password: string,
    role?: string,
  ) => Promise<void>;
  logoutUser: () => Promise<void>;
  user: null | any;
  tokenExpiry: number;
}
interface ChildrenProps {
  children: ReactNode;
}
interface User {
  _id: string;
  name: string;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useLocalStorage<User | null>("user", null);
  const [tokenExpiry, setTokenExpiry] = useLocalStorage<number>(
    "tokenExpiry",
    0,
  );
  const intervalRef = useRef<any>(null);

  const refreshTokenIfNeeded = useCallback(async () => {
    const currentTime = Date.now(); // Keep this in milliseconds
    const timeUntilExpiry = tokenExpiry - currentTime;

    if (user && timeUntilExpiry < TOKEN_REFRESH_THRESHOLD) {
      await authService.refreshToken(user._id);
    }
  }, [tokenExpiry, user]);

  const timeUntilNextCheck = Math.max(
    tokenExpiry - Date.now() - TOKEN_REFRESH_THRESHOLD,
    0,
  );

  useEffect(() => {
    user
      ? (intervalRef.current = setInterval(refreshTokenIfNeeded, 10000)) // Checking every 10 seconds
      : clearInterval(intervalRef.current);

    return () => clearInterval(intervalRef.current);
  }, [refreshTokenIfNeeded, user, tokenExpiry]);

  const loginUser = async (email: string, password: string) => {
    const data = await authService.loginUser(email, password);
    setUser(data.user);
    setTokenExpiry(Date.now() + data.expiresIn); // Convert expiresIn to an absolute timestamp
  };

  const registerUserAndLogin = async (
    name: string,
    email: string,
    password: string,
    role?: string,
  ) => {
    try {
      await authService.registerUser(name, email, password, role);
      await loginUser(email, password);
    } catch (error) {
      console.error("Error registering or logging in:", error);
      throw error;
    }
  };

  const logoutUser = async () => {
    if (user) {
      await authService.logoutUser(user._id);
      setUser(null);
      setTokenExpiry(0);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        loginUser,
        registerUser: registerUserAndLogin,
        logoutUser,
        user,
        tokenExpiry,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
