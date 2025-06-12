import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { translations } from "./translations";

const { en: shipEnTranslations } = translations;

i18n.use(initReactI18next).init({
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

i18n.addResourceBundle("en", "local", shipEnTranslations);

export default i18n;
