import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import styles from "./index.module.css";

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Navbar />

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
