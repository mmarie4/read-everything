import translationsEN from './en.json';
import translationsFR from './fr.json';

import { locales, localStorageLocaleKeyName } from "./i18n.constants"

export const getLocale = () => {
    const cookieLocale = localStorage.getItem(localStorageLocaleKeyName);
    const browserLocale = navigator.languages === undefined
      ? navigator.language
      : navigator.languages[0]; 
    const locale = cookieLocale || browserLocale || locales.en
    if (locale.toLowerCase().includes(locales.fr))
      return locales.fr

    return locales.en
}

const resources = {
    en: translationsEN,
    fr: translationsFR
};

const translate = (key: string) => {
    const locale = getLocale()
    if (locale === locales.en)
        return resources.en[key as keyof object] ?? key
    if (locale === locales.fr)
      return resources.fr[key as keyof object] ?? key

    return "Locale not found"
}

export const getLocaleToDisplay = () => {
  const locale = getLocale().toLowerCase();
  if (locale.includes(locales.en))
      return "EN";
  if (locale.includes(locales.fr))
      return "FR";
}

export const setLocale = (l : string) => {
  if (l.toLowerCase().includes(locales.en))
    localStorage.setItem(localStorageLocaleKeyName, locales.en);
  else if (l.toLowerCase().includes(locales.fr))
    localStorage.setItem(localStorageLocaleKeyName, locales.fr);
}

export default translate