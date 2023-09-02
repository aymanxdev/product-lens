import { ElementType, lazy, ReactNode, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import paths from "./paths";
import Page from "pages/Page";
interface Routes {
  path: string;
  element: ReactNode;
}

const Home = lazy(() => import("../pages/Home"));
const RegistrationAndLoginPage = lazy(
  () => import("../pages/RegistrationAndLoginPage"),
);
const PageNotFound = lazy(() => import("../pages/NotFound"));

const getRouteElement = (Component: ElementType, props?: any): ReactNode => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page>
        <Component {...props} />
      </Page>
    </Suspense>
  );
};

const routes: Routes[] = [
  { path: paths.HOME, element: getRouteElement(Home) },
  { path: paths.NOT_FOUND, element: getRouteElement(PageNotFound) },
  { path: paths.REGISTER, element: getRouteElement(RegistrationAndLoginPage) },
  {
    path: paths.LOGIN,
    element: getRouteElement(RegistrationAndLoginPage, { isLogin: true }),
  },
];

export const Router = createBrowserRouter(routes);
