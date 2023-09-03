import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import * as authService from "api/authService";
import useLocalStorage from "../../hooks/useLocalStorage";

interface AuthContextProps {
  isAuthenticated: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
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
    const currentTime = Date.now();
    if (user && tokenExpiry - currentTime < 30000) {
      console.log("Refreshing token...");
      await authService.refreshToken(user._id);
    }
  }, [tokenExpiry, user]);

  useEffect(() => {
    user
      ? (intervalRef.current = setInterval(refreshTokenIfNeeded, 10000)) // Checking every 10 seconds
      : clearInterval(intervalRef.current);

    return () => clearInterval(intervalRef.current);
  }, [refreshTokenIfNeeded, user]);

  const loginUser = async (email: string, password: string) => {
    const data = await authService.loginUser(email, password);
    setUser(data.user);
    setTokenExpiry(data.expiresIn);
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
        logoutUser,
        user,
        tokenExpiry,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
