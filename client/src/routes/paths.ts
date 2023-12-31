interface Paths {
  readonly HOME: string;
  readonly NOT_FOUND: string;
  readonly LOGIN: string;
  readonly REGISTER: string;
  readonly MY_DASHBOARD: string;
  readonly SUGGESTIONS: string;
}

const paths: Paths = {
  HOME: "/",
  NOT_FOUND: "*",
  LOGIN: "/login",
  REGISTER: "/register",
  MY_DASHBOARD: "/my-dashboard",
  SUGGESTIONS: "/suggestions",
};

export default paths;
