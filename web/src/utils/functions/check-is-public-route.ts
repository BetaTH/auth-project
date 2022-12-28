import { APP_ROUTES } from "../constants/app_routes";

type CheckIsPublicRoute = (asPath: string) => {
  isPublic: boolean;
  redirectDestination: string | null;
};

export const checkIsPublicRoute: CheckIsPublicRoute = (asPath: string) => {
  const appPublicRoutes = APP_ROUTES.public.map((value) => value.path);

  if (appPublicRoutes.includes(asPath)) {
    const route = APP_ROUTES.public.filter((value) => value.path == asPath)[0];
    return {
      isPublic: appPublicRoutes.includes(asPath),
      redirectDestination: route.redirectDestination,
    };
  }

  const route = APP_ROUTES.private.filter((value) => value.path == asPath)[0];
  return {
    isPublic: appPublicRoutes.includes(asPath),
    redirectDestination: route.redirectDestination,
  };
};
