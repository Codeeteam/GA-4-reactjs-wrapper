import React, { FC } from "react";

import { CookieGtagConsentsKeys } from "ga-4-plugin"; //Link to cookie plugin

import styles from "./CookieBannerContent.module.scss";

interface ICookieBannerContent {
  isExtended: boolean;
  consents?: { label: string; id: CookieGtagConsentsKeys; value: boolean }[];
  reguired?: { label: string; id: string; value: boolean };
  onConsentChange: (id: CookieGtagConsentsKeys, value: boolean) => void;
  children: any;
}

const CookieBannerContent: FC<ICookieBannerContent> = (props) => {
  const { isExtended, consents, reguired, onConsentChange, children } = props;

  const consentClassName = `${styles["cookie-banner-content__consents"]} ${
    isExtended ? styles["cookie-banner-content__consents--active"] : ""
  }`;

  return (
    <div className={styles["cookie-banner-content"]}>
      <div className={styles["cookie-banner-content__main"]}>{children}</div>
      <ul className={consentClassName}>
        {!!reguired && (
          <li>
            <input
              type="checkbox"
              id={reguired.id}
              name={reguired.id}
              checked={reguired.value}
              disabled
            />
            <label htmlFor={reguired.id}>{reguired.label}</label>
          </li>
        )}
        {consents?.map((con, i) => {
          return (
            <li key={`consent-${i + 1}`}>
              <input
                type="checkbox"
                id={con.id}
                name={con.id}
                onChange={(e) => {
                  onConsentChange(con.id, e.target.checked);
                }}
                checked={con.value}
              />
              <label htmlFor={con.id}>{con.label}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CookieBannerContent;
