import React from 'react';
import { useTranslation } from './TranslationProvider';

const LanguageSwitcher: React.FC = () => {
  const { lang, setLang, t } = useTranslation();

  return (
    <div className="inline-block">
      <label htmlFor="lang-select" className="sr-only">{t('nav.language')}</label>
      <select
        id="lang-select"
        value={lang}
        onChange={e => setLang(e.target.value as 'en' | 'fr')}
        className="rounded border px-2 py-1 text-sm bg-white dark:bg-gray-800 dark:text-white"
        aria-label={t('nav.language')}
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher; 