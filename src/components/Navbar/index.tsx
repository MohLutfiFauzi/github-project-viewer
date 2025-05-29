import { Link } from "react-router-dom";
import styles from "./index.module.css";
import Logo from "../../assets/logo.svg";
import LogoWhite from "../../assets/logo-white.svg";
import { AiOutlineSun, AiOutlineMoon } from "react-icons/ai";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";
import type { RootState } from "../../store/index";

const Navbar = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  return (
    <header className={styles.navbar}>
      <Link to="/">
        <img
          className={styles.logo}
          src={mode === "dark" ? LogoWhite : Logo}
          alt="logo"
        />
      </Link>

      <nav className={styles.navConfig}>
        <button
          className={styles.toggleDarkmode}
          onClick={() => dispatch(toggleTheme())}
        >
          {mode === "light" ? <AiOutlineSun /> : <AiOutlineMoon />}
        </button>
        <LanguageToggle />
      </nav>
    </header>
  );
};

export default Navbar;
