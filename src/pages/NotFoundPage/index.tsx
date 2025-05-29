import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { useTranslation } from "react-i18next";

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <h2 className={styles.title}>{t("pageNotFound")}</h2>
      <p className={styles.message}>{t("sorry")}</p>
      <Link to="/" className={styles.homeButton}>
        {t("backToHome")}
      </Link>
    </div>
  );
};

export default NotFoundPage;
