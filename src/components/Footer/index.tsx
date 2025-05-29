import styles from "./index.module.css";
import { FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <FaGithub />
    </footer>
  );
};

export default Footer;
