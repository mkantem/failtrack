import { c as createComponent, b as renderComponent, m as maybeRenderHead, r as renderTemplate } from '../chunks/astro/server_CAgZhzEv.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Navbar } from '../chunks/Navbar_CvTHXCWi.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="max-w-2xl mx-auto p-4"> <h1 class="text-3xl font-bold mb-4">${import('../chunks/en_CK7tc_AC.mjs').then((m) => m.siteTitle)}</h1> <p class="mb-2">${import('../chunks/en_CK7tc_AC.mjs').then((m) => m.intro)}</p> <p class="mb-6">${import('../chunks/en_CK7tc_AC.mjs').then((m) => m.howItWorks)}</p> <div class="flex gap-4"> <a href="/en/submit" class="px-4 py-2 bg-blue-600 text-white rounded">${import('../chunks/en_CK7tc_AC.mjs').then((m) => m.links.submit)}</a> <a href="/en/browse" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-white rounded">${import('../chunks/en_CK7tc_AC.mjs').then((m) => m.links.browse)}</a> </div> </main>`;
}, "C:/Users/ISH/Documents/GitHub/failtrack/--typescript/src/pages/en/index.astro", void 0);

const $$file = "C:/Users/ISH/Documents/GitHub/failtrack/--typescript/src/pages/en/index.astro";
const $$url = "/en";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
