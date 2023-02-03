import { createContext, useEffect, useState } from "react";
import { api } from "../lib/axios/api";
import { decodeJwt } from "../utils/functions/decodeJWT";
import { setCookie, destroyCookie } from "nookies";
import Router from "next/router";
import {
  JwtUser,
  LoginFormData,
  LoginResponse,
  RegisterFormData,
  RegisterResponse,
  User,
  AuthProviderProps,
  AuthContextData,
} from "../types/auth";

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children, userData }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(userData);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  async function signIn({ email, password }: LoginFormData) {
    try {
      const {
        data: { access_token, refresh_token },
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

      setCookie(undefined, "next_access_token", access_token, {
        maxAge:
          decodeJwt<JwtUser>(access_token).exp - Math.floor(Date.now() / 1000),
      });

      setCookie(undefined, "next_refresh_token", refresh_token, {
        maxAge:
          decodeJwt<JwtUser>(refresh_token).exp - Math.floor(Date.now() / 1000),
      });

      api.defaults.headers["Authorization"] = `Bearer ${access_token}`;

      Router.push("/");
    } catch (error: any) {
      throw error;
    }
  }

  async function signUp({ name, email, password }: RegisterFormData) {
    try {
      const { data } = await api.post<RegisterResponse>("/user", {
        name,
        email,
        password,
      });
    } catch (error: any) {
      throw error;
    }
  }

  async function signOff() {
    destroyCookie(undefined, "next_access_token");
    destroyCookie(undefined, "next_refresh_token");
    Router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp, signOff, setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
}
