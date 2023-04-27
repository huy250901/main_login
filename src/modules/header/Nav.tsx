import React from "react";
import { useTranslation } from "react-i18next";
const Nav = () => {
  const { i18n } = useTranslation();
  const changLanguage = (lng: "en" | "vi") => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ padding: "10px 10px", position: "fixed" }}>
      <button
        style={{ padding: "10px 10px", marginLeft: "6px" }}
        onClick={() => changLanguage("vi")}
      >
        Tiếng việt
      </button>
      <button
        style={{ padding: "10px 10px", marginLeft: "6px" }}
        onClick={() => changLanguage("en")}
      >
        English
      </button>
    </div>
  );
};

export default Nav;
