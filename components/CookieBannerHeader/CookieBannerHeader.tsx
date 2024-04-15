"use client";
import React, { FC } from "react";

import styles from "./CookieBannerHeader.module.scss";

interface ICookieBannerHeader {
  title: string;
  icon?: React.JSX.Element;
}

const CookieBannerHeader: FC<ICookieBannerHeader> = (props) => {
  const { icon, title } = props;

  return (
    <div className={styles["cookie-banner-header"]}>
      {!!icon && (
        <span className={styles["cookie-banner-header__icon"]}>{icon}</span>
      )}
      <p className={styles["cookie-banner-header__title"]}>{title}</p>
    </div>
  );
};

export default CookieBannerHeader;
