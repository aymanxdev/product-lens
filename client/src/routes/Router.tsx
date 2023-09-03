import { ElementType, lazy, ReactNode, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import paths from "./paths";
import Page from "pages/Page";
import { useAuth } from "hooks/useAuth";
interface Routes {
  path: string;
  element: ReactNode;
  isPrivate?: boolean;
}

const Home = lazy(() => import("../pages/Home"));
const RegistrationAndLoginPage = lazy(
  () => import("../pages/RegistrationAndLoginPage"),
);
const PageNotFound = lazy(() => import("../pages/NotFound"));

const GetRouteElement = (
  Component: ElementType,
  isPrivate: boolean = true,
  props?: any,
): ReactNode => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page>
        <Component {...props} />
      </Page>
    </Suspense>
  );
};

const routes: Routes[] = [
  { path: paths.HOME, element: GetRouteElement(Home) },
  { path: paths.NOT_FOUND, element: GetRouteElement(PageNotFound, false) },
  {
    path: paths.REGISTER,
    element: GetRouteElement(RegistrationAndLoginPage, false),
  },
  {
    path: paths.LOGIN,
    element: GetRouteElement(RegistrationAndLoginPage, false, {
      isLogin: true,
    }),
  },
];
export const Router = createBrowserRouter(routes);
