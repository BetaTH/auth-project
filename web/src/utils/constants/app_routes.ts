type I_APP_ROUTES = {
  private: {
    name: string;
    path: string;
    redirectDestination: string;
  }[];
  public: {
    name: string;
    path: string;
    redirectDestination: string | null;
  }[];
};

export const APP_ROUTES: I_APP_ROUTES = {
  private: [
    {
      name: "home",
      path: "/",
      redirectDestination: "/login",
    },
  ],
  public: [
    { name: "login", path: "/login", redirectDestination: "/" },
    { name: "public-route", path: "/public-route", redirectDestination: null },
  ],
};
