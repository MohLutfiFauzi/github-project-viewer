import styles from "./LanguageToggle.module.css";
import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  return (
    <div className={styles.languageToggle}>
      <button
        className={`${styles.btn} ${
          i18n.language === "id" ? styles.active : ""
        }`}
        onClick={() => i18n.changeLanguage("id")}
      >
        IDN
      </button>
      <button
        className={`${styles.btn} ${
          i18n.language === "en" ? styles.active : ""
        }`}
        onClick={() => i18n.changeLanguage("en")}
      >
        ENG
      </button>
    </div>
  );
}
