interface Paths {
  [route: string]: string;
}

const paths: Paths = {
  HOME: "/",
  NOT_FOUND: "*",
  LOGIN: "/login",
  REGISTER: "/register",
};

export default paths;
