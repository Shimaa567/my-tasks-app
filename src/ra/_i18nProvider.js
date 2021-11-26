import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "./i18n/en";

const messages = {
  ar: () => import("./i18n/ar").then((messages) => messages.default),
};

export default polyglotI18nProvider((locale) => {
  if (locale === "ar") {
    return messages[locale]();
  }

  // Always fallback on english
  return englishMessages;
}, "en");
