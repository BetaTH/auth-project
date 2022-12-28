import { GetServerSidePropsContext, PreviewData, Redirect } from "next";
import { parseCookies } from "nookies";
import { ParsedUrlQuery } from "querystring";
import { User } from "../../contexts/AuthContext";
import { checkIsPublicRoute } from "./check-is-public-route";
import { getUser } from "./getUser";

export type RedirectProp = { redirect: Redirect } | null;

type ServerSideAuthValidationResult = {
  redirect: RedirectProp;
  userData: User | null;
};

type ServerSideAuthValidation<
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> = (
  context: GetServerSidePropsContext<Q, D>
) => Promise<ServerSideAuthValidationResult>;

export const serverSideAuthValidation: ServerSideAuthValidation = async (
  ctx
) => {
  const { ["nextwebauth.token"]: access_token } = parseCookies(ctx);

  const { isPublic, redirectDestination } = checkIsPublicRoute(
    ctx.resolvedUrl.split("?")[0]
  );

  if (!access_token) {
    if (!isPublic) {
      return {
        redirect: {
          redirect: {
            destination: redirectDestination as string,
            permanent: false,
          },
        },
        userData: null,
      };
    } else {
      return {
        redirect: null,
        userData: null,
      };
    }
  } else {
    const user = await getUser(access_token);
    if (user) {
      if (!isPublic) {
        return {
          redirect: null,
          userData: user,
        };
      } else if (redirectDestination) {
        return {
          redirect: {
            redirect: {
              destination: redirectDestination as string,
              permanent: false,
            },
          },
          userData: null,
        };
      } else {
        return {
          redirect: null,
          userData: user,
        };
      }
    } else {
      if (!isPublic) {
        return {
          redirect: {
            redirect: {
              destination: redirectDestination as string,
              permanent: false,
            },
          },
          userData: null,
        };
      } else {
        return {
          redirect: null,
          userData: user,
        };
      }
    }
  }
};
