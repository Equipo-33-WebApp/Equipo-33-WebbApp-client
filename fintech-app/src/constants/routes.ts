export const ROUTES = {
  BASE: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: {
    BASE: "/dashboard",
    PYME: {
      BASE: "/dashboard/pyme",
      OVERVIEW: "/dashboard/pyme/overview",
      APPLICATIONS: "/dashboard/pyme/applications",
      REQUEST: "/dashboard/pyme/request",
      ACCOUNT: "/dashboard/pyme/account",
    },
    OPERATOR: {
      BASE: "/dashboard/op",
      OVERVIEW: "/dashboard/op/overview",
      REVIEW: "/dashboard/op/review",
      REPORTS: "/dashboard/op/reports",
      ACCOUNT: "/dashboard/op/account",
    },
  },
};
