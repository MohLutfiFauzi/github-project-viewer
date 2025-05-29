import { useSelector } from "react-redux";
import Card from "../../components/Card";
import Search from "../../components/Search";
import styles from "./index.module.css";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../store";

const Home = () => {
  const { t } = useTranslation();
  const { repos, username } = useSelector((state: RootState) => state.github);

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Github Project Viewer</h1>
        <p className={styles.subTitle}>{t("description")}</p>

        <Search />
      </div>

      {repos.length > 0 ? (
        <div className={styles.cardContianer}>
          {repos.map((repo) => (
            <Card
              key={repo.id}
              title={repo.name}
              description={repo.description}
              link={repo.html_url}
              language={repo.language}
            />
          ))}
        </div>
      ) : username ? (
        <div className={styles.containerMessage}>
          <p className={styles.message}>{t("noReposFound", { username })}</p>
        </div>
      ) : (
        <div className={styles.containerMessage}>
          <p className={styles.message}>{t("reposWillAppear")}</p>
        </div>
      )}
    </>
  );
};

export default Home;
