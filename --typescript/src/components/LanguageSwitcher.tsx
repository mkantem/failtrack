import React from 'react';
import en from '../locales/en.json';
import fr from '../locales/fr.json';

interface Props {
  lang: 'en' | 'fr';
}

const translations = { en, fr };

const LanguageSwitcher: React.FC<Props> = ({ lang }) => {
  // No setLang, just links to switch language
  return (
    <div className="inline-block">
      <label htmlFor="lang-select" className="sr-only">{translations[lang].nav.language}</label>
      <select
        id="lang-select"
        value={lang}
        onChange={e => {
          const newLang = e.target.value;
          window.location.pathname = window.location.pathname.replace(/^\/(en|fr)/, `/${newLang}`);
        }}
        className="rounded border px-2 py-1 text-sm bg-white dark:bg-gray-800 dark:text-white"
        aria-label={translations[lang].nav.language}
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;