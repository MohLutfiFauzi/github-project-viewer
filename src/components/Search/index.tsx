import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { AppDispatch, RootState } from "../../store";
import { setUsername, fetchRepos } from "../../store/githubSlice";
import styles from "./index.module.css";

const Search = () => {
  const [input, setInput] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, username } = useSelector((state: RootState) => state.github);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setUsername(input));
    dispatch(fetchRepos(input));
  };

  useEffect(() => {
    setInput(username);
  }, [username]);

  return (
    <form className={styles.formSearch} onSubmit={handleSubmit}>
      <input
        className={styles.search}
        type="text"
        placeholder={t("search")}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
      />
    </form>
  );
};

export default Search;
