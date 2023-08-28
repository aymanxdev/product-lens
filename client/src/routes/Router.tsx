import { ElementType, lazy, ReactNode, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import paths from "./paths";
import Page from "pages/Page";
interface Routes {
  path: string;
  element: ReactNode;
}

const Home = lazy(() => import("../pages/Home"));
const RegistrationPage = lazy(() => import("../pages/RegistrationPage"));
const PageNotFound = lazy(() => import("../pages/NotFound"));

const getRouteElement = (Component: ElementType): ReactNode => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page>
        <Component />
      </Page>
    </Suspense>
  );
};

const routes: Routes[] = [
  { path: paths.HOME, element: getRouteElement(Home) },
  { path: paths.NOT_FOUND, element: getRouteElement(PageNotFound) },
  { path: paths.REGISTER, element: getRouteElement(RegistrationPage) },
];

export const Router = createBrowserRouter(routes);
