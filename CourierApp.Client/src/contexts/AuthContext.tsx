import { createContext, useContext, useState } from "react";
import type { UserResponseDto } from "../types";

type AuthContextType = {
  user: UserResponseDto | null;
  login: (user: UserResponseDto) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserResponseDto | null>(() => {
    const saved = localStorage.getItem("user"); // get user from localStorage
    return saved ? JSON.parse(saved) : null; // if have saved user then set that user if not set null
  });

  const login = (user: UserResponseDto) => {
    localStorage.setItem("user", JSON.stringify(user)); // save user to localStorage with UserResponseDto type
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user"); // remove user from localStorage
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      { children }
    </AuthContext.Provider>
  );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
