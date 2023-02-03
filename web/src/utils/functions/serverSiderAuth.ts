import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";
import { User } from "../../types/auth";
import { getUser } from "./getUser";
import axios from "axios";
import { refreshTokens } from "./refreshTokens";

type Callback = (
  context: GetServerSidePropsContext,
  userData?: User
) => Promise<GetServerSidePropsResult<any>>;

export function serverSideAuth(func: Callback): GetServerSideProps {
  return async (ctx) => {
    const { ["next_access_token"]: access_token } = parseCookies(ctx);
    const { ["next_refresh_token"]: refresh_token } = parseCookies(ctx);

    if (!access_token && !refresh_token) {
      return func(ctx);
    }

    const userData = await getUser(access_token);

    if (userData) {
      return func(ctx, userData);
    } else {
      try {
        const { userData } = await refreshTokens(ctx);
        return func(ctx, userData);
      } catch (error: any) {
        if (
          axios.isAxiosError(error) &&
          (error.response?.status === 401 || error.response?.status === 403)
        ) {
          return func(ctx);
        }
        return func(ctx);
      }
    }
  };
}
