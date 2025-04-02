import React from "react";
import styles from "./styles.module.css";
import { Trans } from "react-i18next";

const Footer: React.FC = () => {

  return (
    <div className={styles.bg}>
      <div className="container">
        <div className={styles.wrapper}>
          {/* {t("footer")} */}
          <Trans
            i18nKey="footer"
            components={{
              1: (
                <a
                  href="https://github.com/Ayxan23"
                  target="_blank"
                  rel="noreferrer"
                />
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
