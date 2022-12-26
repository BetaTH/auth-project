import { createContext, useEffect, useState } from "react";
import { api } from "../lib/axios/api";
import { decodeJwt } from "../utils/decodeJWT";
import { parseCookies, setCookie } from "nookies";
import Router from "next/router";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface JwtUser {
  email: string;
  exp: number;
  iat: number;
  name: string;
  sub: number;
}

interface AuthContextData {
  isAuthenticated: boolean;
  signIn: (data: LoginFormData) => void;
  user: User | null;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = false;

  useEffect(() => {
    const { nextwebauth } = parseCookies();
    if (nextwebauth) {
    }
  }, []);

  async function signIn({ email, password }: LoginFormData) {
    try {
      const {
        data: { access_token },
      } = await api.post<LoginResponse>("/login", {
        email,
        password,
      });

      const jwtUser = decodeJwt<JwtUser>(access_token);
      setUser({
        id: jwtUser.sub,
        name: jwtUser.name,
        email: jwtUser.email,
      });

      setCookie(undefined, "nextwebauth.token", access_token, {
        maxAge: 60 * 60 * 1,
      });

      Router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}
