import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Select } from "@radix-ui/themes";
import { useCharacterStore } from "../../../store/characterStore";

const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const refetchCharacters = useCharacterStore(
    (state) => state.refetchCharacters
  );

  const currentLang = i18n.language;

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    refetchCharacters?.();
  };

  return (
    <div className={styles.bg}>
      <div className="container">
        <div className={styles.wrapper}>
          <Link to="/">
            <img src="/logo.png" alt="logo" draggable="false" />
            Hogwarts
          </Link>

          <Select.Root value={currentLang} onValueChange={handleLanguageChange}>
            <Select.Trigger radius="large" className={styles.button} />
            <Select.Content position="popper">
              <Select.Item value="en">EN</Select.Item>
              <Select.Item value="az">AZ</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
      </div>
    </div>
  );
};

export default Header;
