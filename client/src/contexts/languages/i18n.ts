import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EN from "./locales/en.json";
import ES from "./locales/es.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: EN },
    es: { translation: ES },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
