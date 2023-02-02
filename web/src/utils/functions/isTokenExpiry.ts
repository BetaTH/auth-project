import { JwtUser } from "../../types/auth";
import { decodeJwt } from "./decodeJWT";

export function isTokenExpired(token: string): boolean {
  const payload = decodeJwt<JwtUser>(token);

  const clockTimestamp = Math.floor(Date.now() / 1000);

  return clockTimestamp > payload.exp;
}
