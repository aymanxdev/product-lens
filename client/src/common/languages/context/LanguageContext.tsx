import { createContext, ReactNode, useCallback, useState } from "react";
import i18n from "../i18n";

export interface LanguageContextType {
  language: "en" | "es";
  setCurrentLanguage: (language: "en" | "es") => void;
}

interface ChildrenProps {
  children: ReactNode;
}

const defaultContext: LanguageContextType = {
  language: "en",
  setCurrentLanguage: () => {},
};

export const LanguageContext =
  createContext<LanguageContextType>(defaultContext);

export const LanguageProvider = ({ children }: ChildrenProps) => {
  const [language, setLanguage] = useState<"en" | "es">("en");

  const changeCurrentLanguage = useCallback((lang: "en" | "es") => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  }, []);

  return (
    <LanguageContext.Provider
      value={{ language, setCurrentLanguage: changeCurrentLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
