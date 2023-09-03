import { RouterProvider } from "react-router-dom";
import { Router } from "routes/Router";
import { LanguageProvider } from "contexts/languages/LanguageContext";
import { AuthProvider } from "contexts/Auth/AuthContext";

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <RouterProvider router={Router} />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
