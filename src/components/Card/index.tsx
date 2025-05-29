import { Link } from "react-router-dom";
import styles from "./index.module.css";
// import { languageColors } from "../../lib";
import { useTranslation } from "react-i18next";

interface CardProps {
  title: string;
  description: string | null;
  link: string;
  language: string;
}

const Card = ({ title, description, link, language }: CardProps) => {
  // const color = languageColors[language] || "#999";
  const { t } = useTranslation();

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description ? description : "-"}</p>
      {/* <p className={styles.language}>
        <span className={styles.dot} style={{ backgroundColor: color }}></span>{" "}
        {language}
      </p> */}
      <Link to={`/detail?repo=${title}`} className={styles.link}>
        {t("viewReadme")} →
      </Link>
    </div>
  );
};

export default Card;
