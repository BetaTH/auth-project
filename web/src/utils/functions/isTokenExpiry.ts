import { JwtUser } from "../../types/auth";
import { decodeJwt } from "./decodeJWT";

export function isTokenExpired(token: string | undefined | null): boolean {
  if (token) {
    try {
      const payload = decodeJwt<JwtUser>(token);

      const clockTimestamp = Math.floor(Date.now() / 1000); //timestamp without miliseconds

      return (
        clockTimestamp > payload.exp - 10 * 60 /* 10 * 60 = 10 min in seconds */
      );
    } catch (e) {
      return true;
    }
  }
  return true;
}
