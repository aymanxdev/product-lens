import React, { useState, useCallback } from "react";
import BreadcrumbContext from "./BreadcrumbContext";

interface BreadcrumbProviderProps {
  children: React.ReactNode;
}

const BreadcrumbProvider: React.FC<BreadcrumbProviderProps> = ({
  children,
}) => {
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  const updateBreadcrumb = useCallback((breadcrumb: string) => {
    setBreadcrumbs([breadcrumb]); // This line replaces the entire breadcrumb list
  }, []);

  return (
    <BreadcrumbContext.Provider
      value={{ breadcrumbs, addBreadcrumb: updateBreadcrumb }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
};

export default BreadcrumbProvider;
