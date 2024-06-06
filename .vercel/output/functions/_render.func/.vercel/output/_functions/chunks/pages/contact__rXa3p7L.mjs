/* empty css                          */
import { f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from '../astro_DVL52kWv.mjs';
import 'kleur/colors';
import { b as contact, $ as $$Layout } from './404_DDJa9XmF.mjs';
import { $ as $$TextPage } from './about_Ba3psucc.mjs';

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Contact Us" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "TextPage", $$TextPage, { "title": "Contact Us" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="h-96 flex items-center justify-center"> <a class="lg:text-4xl text-xl" href="mailto:{contact.email}"> ${contact.email} </a> </div> ` })} ` })}`;
}, "C:/Users/singh/OneDrive/Desktop/pheres/src/pages/contact.astro", void 0);

const $$file = "C:/Users/singh/OneDrive/Desktop/pheres/src/pages/contact.astro";
const $$url = "/contact";

export { $$Contact as default, $$file as file, $$url as url };