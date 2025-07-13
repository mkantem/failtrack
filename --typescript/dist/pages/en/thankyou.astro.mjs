import { c as createComponent, b as renderComponent, m as maybeRenderHead, r as renderTemplate } from '../../chunks/astro/server_CAgZhzEv.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Navbar } from '../../chunks/Navbar_CvTHXCWi.mjs';
export { renderers } from '../../renderers.mjs';

const $$Thankyou = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="max-w-2xl mx-auto p-4 text-center"> <h1 class="text-2xl font-bold mb-4">${import('../../chunks/en_CK7tc_AC.mjs').then((m) => m.thankyou.message)}</h1> </main>`;
}, "C:/Users/ISH/Documents/GitHub/failtrack/--typescript/src/pages/en/thankyou.astro", void 0);

const $$file = "C:/Users/ISH/Documents/GitHub/failtrack/--typescript/src/pages/en/thankyou.astro";
const $$url = "/en/thankyou";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Thankyou,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
