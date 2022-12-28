import { createContext, useState } from "react";
import { api } from "../lib/axios/api";
import { decodeJwt } from "../utils/decodeJWT";
import { setCookie, destroyCookie } from "nookies";
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
  signIn: (data: LoginFormData) => Promise<void>;
  signOff: () => void;
  user: User | null;
  setUser: (user: User) => void;
}

interface AuthProviderProps {
  userData: User | null;
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children, userData }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(userData);

  console.log(user);

  async function signIn({ email, password }: LoginFormData) {
    try {
      const {
        data: { access_token },
      } = await api.post<LoginResponse>("/auth/login", {
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

      api.defaults.headers["Authorization"] = `Bearer ${access_token}`;

      Router.push("/");
    } catch (error: any) {
      throw error;
    }
  }

  async function signOff() {
    destroyCookie(undefined, "nextwebauth.token");
    setUser(null);
    Router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ signIn, user, setUser, signOff }}>
      {children}
    </AuthContext.Provider>
  );
}
