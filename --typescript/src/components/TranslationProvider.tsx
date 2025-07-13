import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import en from '../locales/en.json';
import fr from '../locales/fr.json';

const translations = { en, fr };

type Lang = 'en' | 'fr';

interface TranslationContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextProps | undefined>(undefined);

export const TranslationProvider = ({ children, initialLang }: { children: ReactNode; initialLang?: Lang }) => {
  const [lang, setLang] = useState<Lang>(initialLang || 'en');

  useEffect(() => {
    if (!initialLang) {
      const browserLang = navigator.language.startsWith('fr') ? 'fr' : 'en';
      setLang(browserLang);
    }
  }, [initialLang]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[lang as keyof typeof translations];
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }
    return typeof value === 'string' ? value : key;
  };

  return (
    <TranslationContext.Provider value={{ lang, setLang, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const ctx = useContext(TranslationContext);
  if (!ctx) throw new Error('useTranslation must be used within a TranslationProvider');
  return ctx;
}; 