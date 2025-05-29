import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./lib/translate/en.json";
import id from "./lib/translate/id.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    id: { translation: id },
  },
  lng: "id",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
