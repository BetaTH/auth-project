import { createContext, useState } from "react";
import { api } from "../lib/axios/api";
import { decodeJwt } from "../utils/decodeJWT";
import { setCookie } from "nookies";
import Router from "next/router";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface User {
  email: string;
  exp: number;
  iat: number;
  name: string;
  sub: string;
}

interface AuthContextData {
  isAuthenticated: boolean;
  signIn: (data: LoginFormData) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = false;

  async function signIn({ email, password }: LoginFormData) {
    try {
      const {
        data: { access_token },
      } = await api.post<LoginResponse>("/login", {
        email,
        password,
      });

      setUser(decodeJwt<User>(access_token));

      setCookie(undefined, "nextwebauth.token", access_token, {
        maxAge: 60 * 60 * 1,
      });

      Router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
