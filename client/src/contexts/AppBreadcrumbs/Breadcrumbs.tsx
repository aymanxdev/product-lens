import React, { useContext } from "react";
import BreadcrumbContext from "./BreadcrumbContext";

const Breadcrumbs: React.FC = () => {
  const context = useContext(BreadcrumbContext);

  if (!context) {
    throw new Error("Breadcrumbs must be used within a BreadcrumbProvider");
  }

  const { breadcrumbs } = context;

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="breadcrumb-item">
            {breadcrumb}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
