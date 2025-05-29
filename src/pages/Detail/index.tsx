import React, { useEffect } from "react";
import styles from "./index.module.css";
import ReactMarkdown from "react-markdown";
import remarkGemoji from "remark-gemoji";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import "github-markdown-css/github-markdown-light.css";
import { fetchReadme } from "../../store/githubSlice";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { useTranslation } from "react-i18next";

const ReadmeViewer: React.FC = () => {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const repo = params.get("repo");

  const dispatch = useDispatch<AppDispatch>();
  const { username, readme, loading } = useSelector(
    (state: RootState) => state.github
  );

  useEffect(() => {
    if (repo && username) {
      dispatch(fetchReadme({ username, repo }));
    }
  }, [repo, username]);

  if (loading)
    return (
      <p className={`${styles.readmeMessage} ${styles.loading}`}>Loading ...</p>
    );
  if (!readme)
    return (
      <p className={`${styles.readmeMessage} ${styles.noReadme}`}>
        {t("noReadmeFound")}
      </p>
    );

  return (
    <div
      className={`markdown-body`}
      style={{
        maxWidth: "740px",
        margin: "2rem auto",
        padding: "2rem",
        borderRadius: "8px",
        lineHeight: "1.6",
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGemoji, remarkBreaks]}
        rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
      >
        {readme}
      </ReactMarkdown>
    </div>
  );
};

export default ReadmeViewer;
