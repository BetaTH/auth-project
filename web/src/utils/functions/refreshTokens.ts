import { GetServerSidePropsContext } from "next";
import { parseCookies, setCookie } from "nookies";
import { api } from "../../lib/axios/api";
import { JwtUser, LoginResponse, User } from "../../types/auth";
import { decodeJwt } from "./decodeJWT";

interface RefreshTokensReponse {
  userData: User;
  access_token: string;
  refresh_token: string;
}

export async function refreshTokens(
  ctx: GetServerSidePropsContext | undefined
): Promise<RefreshTokensReponse> {
  const { ["next_refresh_token"]: refresh_token } = parseCookies(ctx);
  try {
    const { data } = await api.get<LoginResponse>("/auth/refresh", {
      headers: { Authorization: `Bearer ${refresh_token}` },
    });

    const userData: User = {
      id: decodeJwt<JwtUser>(data.access_token).sub,
      name: decodeJwt<JwtUser>(data.access_token).name,
      email: decodeJwt<JwtUser>(data.access_token).email,
    };

    setCookie(ctx, "next_access_token", data.access_token, {
      maxAge:
        decodeJwt<JwtUser>(data.access_token).exp -
        Math.floor(Date.now() / 1000),
    });

    setCookie(ctx, "next_refresh_token", data.refresh_token, {
      maxAge:
        decodeJwt<JwtUser>(data.refresh_token).exp -
        Math.floor(Date.now() / 1000),
    });

    return {
      userData,
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    };
  } catch (e) {
    throw e;
  }
}
