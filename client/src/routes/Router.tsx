import { ElementType, lazy, ReactNode, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import paths from "./paths";
import Page from "pages/Page";
import PrivateRouteWrapper from "./PrivateRouteWrapper";

interface Routes {
  path: string;
  element: ReactNode;
}

const Home = lazy(() => import("../pages/Home"));
const RegistrationAndLoginPage = lazy(
  () => import("../pages/RegistrationAndLoginPage"),
);
const PageNotFound = lazy(() => import("../pages/NotFound"));
const MyDashboard = lazy(() => import("../components/MyDashboard/MyDashboard"));
const suggestions = lazy(() => import("../components/Suggestions/Suggestions"));
const ticketDetail = lazy(() => import("../components/Tickets/TicketDetail"));

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
  {
    path: paths.MY_DASHBOARD,
    element: (
      <PrivateRouteWrapper>{getRouteElement(MyDashboard)}</PrivateRouteWrapper>
    ),
  },
  // {
  //   path: paths.SUGGESTIONS,
  //   element: (<PrivateRouteWrapper>{getRouteElement(suggestions)}</PrivateRouteWrapper>),
  // },
  {
    path: paths.SUGGESTIONS,
    element: getRouteElement(suggestions),
  },
  { path: paths.TICKET_DETAIL, element: getRouteElement(ticketDetail) },
];
export const Router = createBrowserRouter(routes);
