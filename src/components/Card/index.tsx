import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { useTranslation } from "react-i18next";

interface CardProps {
  title: string;
  description: string | null;
}

const Card = ({ title, description }: CardProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description ? description : "-"}</p>
      <Link to={`/detail?repo=${title}`} className={styles.link}>
        {t("viewReadme")} →
      </Link>
    </div>
  );
};

export default Card;
