import { RouterProvider } from "react-router-dom";
import { Router } from "routes/Router";
import { LanguageProvider } from "contexts/languages/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={Router} />
    </LanguageProvider>
  );
}

export default App;
