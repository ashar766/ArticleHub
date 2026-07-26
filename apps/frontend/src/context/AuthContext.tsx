import {
  createContext,
  useContext,
  useState,
} from "react";

import type { ReactNode } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (
    user: User,
    token: string,
    refreshToken: string
  ) => void;
  logout: () => void;
};


const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);


export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser
      ? JSON.parse(storedUser)
      : null;
  });


  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });


  const login = (
    user: User,
    token: string,
    refreshToken: string
  ) => {

    setUser(user);
    setToken(token);


    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );


    localStorage.setItem(
      "token",
      token
    );


    localStorage.setItem(
      "refreshToken",
      refreshToken
    );
  };


  const logout = () => {

    setUser(null);
    setToken(null);


    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {

  const context = useContext(AuthContext);


  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }


  return context;
}