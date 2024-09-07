/* empty css                          */
import { e as createComponent, r as renderTemplate, h as renderComponent, m as maybeRenderHead } from '../astro_BCmwdkZx.mjs';
import 'kleur/colors';
import { g as getCollection, $ as $$Card, a as $$Meta } from './blogs_BDjGi4Xb.mjs';
import { c as calculateReadingTime, $ as $$Layout } from './404_DuLQuKO7.mjs';

const $$CulturalHeritage = createComponent(async ($$result, $$props, $$slots) => {
  const posts = await getCollection("posts", ({ data }) => {
    return data.category.includes("Cultural Heritage");
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blogs" }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="flex flex-col gap-8 px-4 mt-2"> <div class="flex flex-col items-center"> <h1 class="text-3xl font-bold">Cultural Heritage</h1> </div> <div class="flex flex-wrap gap-8 justify-start items-center"> ${posts.map(({ body, data, slug }) => {
    return renderTemplate`${renderComponent($$result2, "Card", $$Card, { "loading": "eager", "link": `/blogs/${slug}`, "data": data, "readingTime": calculateReadingTime(body) })}`;
  })} </div> </div> `, "meta": ($$result2) => renderTemplate`${renderComponent($$result2, "Meta", $$Meta, { "slot": "meta", "title": "Blogs", "image": "test" })}` })}`;
}, "C:/Users/singh/OneDrive/Desktop/Work/pheres/src/pages/cultural-heritage.astro", void 0);

const $$file = "C:/Users/singh/OneDrive/Desktop/Work/pheres/src/pages/cultural-heritage.astro";
const $$url = "/cultural-heritage";

export { $$CulturalHeritage as default, $$file as file, $$url as url };
