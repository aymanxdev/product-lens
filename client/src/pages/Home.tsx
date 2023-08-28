import i18n from "common/languages/i18n";
import { useContext } from "react";
import { LanguageContext } from "common/languages/context/LanguageContext";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useState } from "react";
import "./App.css";

const Home = () => {
  const { setCurrentLanguage } = useContext(LanguageContext);
  const [count, setCount] = useState(0);
  const setLanguageToSpanish = () => {
    setCurrentLanguage("es");
  };

  const setLanguageToEnglish = () => {
    setCurrentLanguage("en");
  };

  return (
    <div>
      <div>{i18n.t("greeting")}</div>
      <button onClick={setLanguageToSpanish}>Set language to Spanish</button>
      <button onClick={setLanguageToEnglish}>Set language to English</button>

      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

export default Home;
