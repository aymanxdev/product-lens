import { RouterProvider } from "react-router-dom";
import { Router } from "routes/Router";
import { LanguageProvider } from "common/languages/context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={Router} />
    </LanguageProvider>
  );
}

export default App;
