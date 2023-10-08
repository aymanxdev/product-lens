import React from "react";

interface BreadcrumbContextProps {
  breadcrumbs: string[];
  addBreadcrumb: (breadcrumb: string) => void;
}

const BreadcrumbContext = React.createContext<
  BreadcrumbContextProps | undefined
>(undefined);

export default BreadcrumbContext;
