import { message } from "antd";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  address: string;
  name: any;
  id: number;
  email: string;
  role?: string;
};

type UserContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(user);
  }, []);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    message.success("Logout");
    setUser(null);
  };
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
