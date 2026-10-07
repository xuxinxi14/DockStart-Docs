import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const chinese = (zh: string, _en: string) => zh;
const english = (_zh: string, en: string) => en;

/** Shared labels follow the locale of the current Docusaurus page. */
export default function useGuideLocale() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const isEnglish = currentLocale === 'en';
  return {locale: currentLocale, isEnglish, t: isEnglish ? english : chinese};
}
