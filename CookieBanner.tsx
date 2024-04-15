"use client";
import React, { FC, useEffect, useMemo, useState } from "react";

import CookieManager, {
  CookieGtagConsentsKeys,
  ICookieIGtagConsents,
} from "ga-4-plugin"; //Link to cookie plugin



import styles from "./CookieBanner.module.scss";

import CookieBannerFooter from "./components/CookieBannerFooter/CookieBannerFooter";
import { CookieBannerHeader } from "./components/CookieBannerHeader";
import { CookieBannerContent } from "./components/CookieBannerContent";

const CONSENTSLABELS = {
  ad_storage: "Przechowywanie podstawowych danych",
  ad_user_data: "Przechowywanie dany uzytkownika",
  ad_personalization: "Spresonaliowanne dane",
  analytics_storage: "Analityka przechowywania",
};

const CONSETSREQUIRED = {
  label: "Niezbędne ciasteczka",
  id: "cookies",
  value: true,
};

const CookieWrapper: FC = () => {
  const [cookieBannerExtended, setCookieBannerExtended] = useState(false);

  const [cookie, setCookie] = useState<CookieManager | undefined>(undefined);
  const [cookiePopupVis, setCookiePopupVis] = useState<boolean>(false);
  const [cookieConsents, setCookieConsents] = useState<
    ICookieIGtagConsents | undefined
  >(undefined);

  useEffect(() => {
    setCookie(new CookieManager({ gtagId: "Cookie GTAG ID" }));
  }, []);

  useEffect(() => {
    if (cookie) {
      setCookiePopupVis(cookie.popupVisibility);
      setCookieConsents(cookie.getGtagConsents());
    }
  }, [cookie]);

  const handleSave = (all?: boolean) => {
    if (cookie) {
      if (all) cookie.updateGtagConsentAll("granted");

      cookie?.save();
      setCookiePopupVis(cookie?.popupVisibility);
    }
  };

  const handleChangeConsent = (id: CookieGtagConsentsKeys, value: boolean) => {
    if (cookie) {
      cookie.updateGtagConsent(id, value ? "granted" : "denied");
      setCookieConsents({ ...cookie.getGtagConsents() });
    }
  };

  const footerData = !cookieBannerExtended
    ? {
        buttons: [
          {
            label: "Pozwól wybrać",
            onClick: () => {
              setCookieBannerExtended(!cookieBannerExtended);
            },
          },
          {
            label: "Akceptuje",
            onClick: () => handleSave(),
          },
        ],
      }
    : {
        buttons: [
          {
            label: "Akceptuj wybrane",
            onClick: () => handleSave(),
          },
          {
            label: "Akceptuj wszystkie",
            onClick: () => handleSave(true),
          },
        ],
      };

  const mapConsents = useMemo(() => {
    if (cookieConsents)
      return (Object.keys(cookieConsents) as Array<CookieGtagConsentsKeys>).map(
        (cons) => ({
          label: CONSENTSLABELS[cons],
          id: cons,
          value: cookieConsents[cons] === "granted",
        })
      );

    return undefined;
  }, [cookieConsents]);

  if (cookiePopupVis)
    return (
      <div className={styles["cookie-banner-wrap"]}>
        <div className={styles["cookie-banner"]}>
          <CookieBannerHeader title="Cookies" />
          <CookieBannerContent
            isExtended={cookieBannerExtended}
            consents={mapConsents}
            reguired={CONSETSREQUIRED}
            onConsentChange={handleChangeConsent}
          >
            <p>
              Administratorem Twoich danych osobowych jest ------- z siedzibą w
              -------
            </p>
            <p>
              Cele przetwarzania danych osobowych, okresy przechowywania opisane
              są w Polityce Prywatności.
            </p>
          </CookieBannerContent>
          <CookieBannerFooter {...footerData} />
        </div>
      </div>
    );

  return <></>;
};

export default CookieWrapper;
