import { c as createComponent, b as renderComponent, m as maybeRenderHead, a as addAttribute, r as renderTemplate } from '../../chunks/astro/server_CAgZhzEv.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Navbar } from '../../chunks/Navbar_CvTHXCWi.mjs';
export { renderers } from '../../renderers.mjs';

const $$Soumettre = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="max-w-2xl mx-auto p-4"> <h1 class="text-2xl font-bold mb-4">${import('../../chunks/fr_BcOP4tQ4.mjs').then((m) => m.nav.submit)}</h1> <form id="failForm" class="space-y-4"${addAttribute(async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      story: form.story.value,
      tags: form.tags.value,
      discipline: form.discipline.value,
      year: form.year.value,
      pseudonym: form.pseudonym.value,
      language: form.lang.value
    };
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      window.location.href = "/fr/merci";
    } else {
      const err = await res.json();
      alert(err.error || "\xC9chec de la soumission");
    }
  }, "on:submit")}> <div> <label for="story" class="block font-medium mb-1">${import('../../chunks/fr_BcOP4tQ4.mjs').then((m) => m.form.storyLabel)}</label> <textarea id="story" name="story" required minlength="30" maxlength="1000" class="w-full p-2 border rounded"${addAttribute(import('../../chunks/fr_BcOP4tQ4.mjs').then((m) => m.form.storyPlaceholder), "placeholder")}></textarea> </div> <div> <label for="tags" class="block font-medium mb-1">${import('../../chunks/fr_BcOP4tQ4.mjs').then((m) => m.form.tagsLabel)}</label> <input id="tags" name="tags" class="w-full p-2 border rounded"> </div> <div> <label for="discipline" class="block font-medium mb-1">${import('../../chunks/fr_BcOP4tQ4.mjs').then((m) => m.form.disciplineLabel)}</label> <input id="discipline" name="discipline" class="w-full p-2 border rounded"> </div> <div> <label for="year" class="block font-medium mb-1">${import('../../chunks/fr_BcOP4tQ4.mjs').then((m) => m.form.yearLabel)}</label> <input id="year" name="year" class="w-full p-2 border rounded"> </div> <div> <label for="pseudonym" class="block font-medium mb-1">${import('../../chunks/fr_BcOP4tQ4.mjs').then((m) => m.form.pseudonymLabel)}</label> <input id="pseudonym" name="pseudonym" class="w-full p-2 border rounded"> </div> <div> <label for="lang" class="block font-medium mb-1">${import('../../chunks/fr_BcOP4tQ4.mjs').then((m) => m.form.languageLabel)}</label> <select id="lang" name="lang" class="w-full p-2 border rounded"> <option value="fr">Français</option> <option value="en">English</option> </select> </div> <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">${import('../../chunks/fr_BcOP4tQ4.mjs').then((m) => m.form.submitButton)}</button> </form> </main>`;
}, "C:/Users/ISH/Documents/GitHub/failtrack/--typescript/src/pages/fr/soumettre.astro", void 0);

const $$file = "C:/Users/ISH/Documents/GitHub/failtrack/--typescript/src/pages/fr/soumettre.astro";
const $$url = "/fr/soumettre";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Soumettre,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
