import i18n from "common/languages/i18n";
import { useContext } from "react";
import { LanguageContext } from "common/languages/context/LanguageContext";

const Home = () => {
  const { setCurrentLanguage } = useContext(LanguageContext);

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
    </div>
  );
};

export default Home;
