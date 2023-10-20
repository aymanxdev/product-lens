interface Paths {
  readonly HOME: string;
  readonly NOT_FOUND: string;
  readonly LOGIN: string;
  readonly REGISTER: string;
  readonly MY_DASHBOARD: string;
  readonly SUGGESTIONS: string;
  readonly TICKET_DETAIL: string;
  readonly ADD_TICKET: string;
}

const paths: Paths = {
  HOME: "/",
  NOT_FOUND: "*",
  LOGIN: "/login",
  REGISTER: "/register",
  MY_DASHBOARD: "/my-dashboard",
  SUGGESTIONS: "/suggestions",
  TICKET_DETAIL: "/ticket-detail/:id",
  ADD_TICKET: "/add-ticket",
};

export default paths;
