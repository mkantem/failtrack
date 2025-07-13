import { c as createComponent, m as maybeRenderHead, b as renderComponent, a as addAttribute, r as renderTemplate } from './astro/server_CAgZhzEv.mjs';
import 'kleur/colors';
import 'html-escaper';
import React, { createContext, useContext } from 'react';

const TranslationContext = createContext(void 0);
const useTranslation = () => {
  const ctx = useContext(TranslationContext);
  if (!ctx) throw new Error("useTranslation must be used within a TranslationProvider");
  return ctx;
};

const LanguageSwitcher = () => {
  const { lang, setLang, t } = useTranslation();
  return /* @__PURE__ */ React.createElement("div", { className: "inline-block" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "lang-select", className: "sr-only" }, t("nav.language")), /* @__PURE__ */ React.createElement(
    "select",
    {
      id: "lang-select",
      value: lang,
      onChange: (e) => setLang(e.target.value),
      className: "rounded border px-2 py-1 text-sm bg-white dark:bg-gray-800 dark:text-white",
      "aria-label": t("nav.language")
    },
    /* @__PURE__ */ React.createElement("option", { value: "en" }, "English"),
    /* @__PURE__ */ React.createElement("option", { value: "fr" }, "Français")
  ));
};

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const links = [
    { href: "/en", key: "nav.home" },
    { href: "/en/submit", key: "nav.submit" },
    { href: "/en/browse", key: "nav.browse" }
  ];
  return renderTemplate`${maybeRenderHead()}<nav class="w-full flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 shadow"> <div class="flex items-center gap-4"> <a href="/en" class="font-bold text-lg">failtrack</a> <ul class="flex gap-4"> ${links.map((link) => renderTemplate`<li><a${addAttribute(link.href, "href")} class="hover:underline">${useTranslation().t(link.key)}</a></li>`)} </ul> </div> <div class="flex items-center gap-4"> ${renderComponent($$result, "LanguageSwitcher", LanguageSwitcher, { "client:react": true, "client:component-hydration": "react", "client:component-path": "C:/Users/ISH/Documents/GitHub/failtrack/--typescript/src/components/LanguageSwitcher", "client:component-export": "default" })} <button id="dark-toggle"${addAttribute(useTranslation().t("nav.darkMode"), "aria-label")} class="ml-2 p-2 rounded bg-gray-200 dark:bg-gray-700"> <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"></path></svg> </button> </div> </nav>`;
}, "C:/Users/ISH/Documents/GitHub/failtrack/--typescript/src/components/Navbar.astro", void 0);

export { $$Navbar as $ };
