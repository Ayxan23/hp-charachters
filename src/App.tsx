import "./assets/styles/reset.css";
import "./assets/styles/global.css";
import "@radix-ui/themes/styles.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Theme } from "@radix-ui/themes";

import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";

import Characters from "./pages/Charachters/Characters";
import Detail from "./pages/Detail/Detail";
import { useTranslation } from "react-i18next";

function App() {
  useTranslation();

  return (
    <BrowserRouter>
      <Theme>
        <div className="wrapper">
          <Header />
          <Routes>
            <Route path="/" element={<Characters />} />
            <Route path="/character/:id" element={<Detail />} />
          </Routes>
          <Footer />
        </div>
      </Theme>
    </BrowserRouter>
  );
}

export default App;
