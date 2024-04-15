import React, { FC } from "react";

import styles from "./CookieBannerFooter.module.scss";

interface ICookieBannerFooter {
  buttons: {
    label: String;
    onClick: () => void;
  }[];
}

const CookieBannerFooter: FC<ICookieBannerFooter> = (props) => {
  const { buttons } = props;

  return (
    <div className={styles["cookie-banner-footer"]}>
      {buttons?.map((btn, i) => {
        return (
          <button
            type="button"
            onClick={btn.onClick}
            key={`btn-${i + 1}`}
            className={styles["cookie-banner-footer__button"]}
          >
            {btn.label}
          </button>
        );
      })}
    </div>
  );
};

export default CookieBannerFooter;
