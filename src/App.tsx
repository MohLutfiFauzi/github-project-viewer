import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import type { RootState } from "./store";
import "./i18n";

function App() {
  const theme = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Routes data-theme={theme}>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
