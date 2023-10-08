import { RouterProvider } from "react-router-dom";
import { Router } from "routes/Router";
import { LanguageProvider } from "contexts/languages/LanguageContext";
import { AuthProvider } from "contexts/Auth/AuthContext";
import BreadcrumbProvider from "contexts/AppBreadcrumbs/BreadcrumbProvider";

function App() {
  return (
    <BreadcrumbProvider>
      <LanguageProvider>
        <AuthProvider>
          <RouterProvider router={Router} />
        </AuthProvider>
      </LanguageProvider>
    </BreadcrumbProvider>
  );
}

export default App;
