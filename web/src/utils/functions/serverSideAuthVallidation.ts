import { GetServerSidePropsContext, PreviewData, Redirect } from "next";
import { parseCookies } from "nookies";
import { ParsedUrlQuery } from "querystring";
import { User } from "../../contexts/AuthContext";
import { checkIsPublicRoute } from "./check-is-public-route";
import { getUser } from "./getUser";

// export type NextRedirectObject = { redirect: Redirect } | null;

type ServerSideAuthValidationResult = {
  nextRedirectObject: { redirect: Redirect } | null;
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
        nextRedirectObject: {
          redirect: {
            destination: redirectDestination as string,
            permanent: false,
          },
        },
        userData: null,
      };
    } else {
      return {
        nextRedirectObject: null,
        userData: null,
      };
    }
  } else {
    const user = await getUser(access_token);
    if (user) {
      if (!isPublic) {
        return {
          nextRedirectObject: null,
          userData: user,
        };
      } else if (redirectDestination) {
        return {
          nextRedirectObject: {
            redirect: {
              destination: redirectDestination as string,
              permanent: false,
            },
          },
          userData: null,
        };
      } else {
        return {
          nextRedirectObject: null,
          userData: user,
        };
      }
    } else {
      if (!isPublic) {
        return {
          nextRedirectObject: {
            redirect: {
              destination: redirectDestination as string,
              permanent: false,
            },
          },
          userData: null,
        };
      } else {
        return {
          nextRedirectObject: null,
          userData: user,
        };
      }
    }
  }
};
