"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthUser } from "@/types/auth";
import {
  loginUser,
  registerUser,
  LoginInput,
  RegisterInput,
} from "@/services/authService";

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthLoading: boolean;
  login: (credentials: LoginInput) => Promise<void>;
  register: (userData: RegisterInput) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setIsAuthLoading(false);
  }, []);

  const login = async (credentials: LoginInput) => {
    const data = await loginUser(credentials);

    setUser(data.user);
    setToken(data.token);

    localStorage.setItem("authUser", JSON.stringify(data.user));
    localStorage.setItem("authToken", data.token);
  };

  const register = async (userData: RegisterInput) => {
    const data = await registerUser(userData);

    setUser(data.user);
    setToken(data.token);

    localStorage.setItem("authUser", JSON.stringify(data.user));
    localStorage.setItem("authToken", data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};