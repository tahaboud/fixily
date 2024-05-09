import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import frTranslation from "../locales/fr/fr.json";

i18n.use(initReactI18next).init({
  resources: {
    fr: {
      translation: frTranslation,
    },
  },
  lng: "fr",
  fallbackLng: "fr",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});
