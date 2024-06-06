/* empty css                          */
import { f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from '../astro_DVL52kWv.mjs';
import 'kleur/colors';
import { g as getCollection, $ as $$Card, a as $$Meta } from './blogs_BQrM2Q42.mjs';
import { c as calculateReadingTime, $ as $$Layout } from './404_DDJa9XmF.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const heritage = await getCollection("posts", ({ data }) => {
    return data.category.includes("Cultural Heritage");
  });
  const planning = await getCollection("posts", ({ data }) => {
    return data.category.includes("Wedding Planning");
  });
  const destination = await getCollection("posts", ({ data }) => {
    return data.category.includes("Destination Weddings");
  });
  const oneWeekLater = /* @__PURE__ */ new Date();
  oneWeekLater.setDate(oneWeekLater.getDate() - 7);
  const mustReadPost = await getCollection("posts", ({ data }) => {
    const pubDate = new Date(data.pubDate);
    return pubDate > oneWeekLater && pubDate <= /* @__PURE__ */ new Date();
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pavitra Pheres" }, { "default": ($$result2) => renderTemplate`  ${mustReadPost.length > 0 && renderTemplate`${maybeRenderHead()}<section class="flex flex-col items-start px-4"> <div class="flex flex-col items-center py-8 w-full"> <a href="/blogs" class="text-3xl font-bold text-secondary">
Latest Post
</a> </div> <div class="flex flex-wrap gap-8 justify-start"> ${mustReadPost.slice(0, 4).map(({ body, data, slug }) => {
    return renderTemplate`${renderComponent($$result2, "Card", $$Card, { "loading": "lazy", "link": `/blogs/${slug}`, "data": data, "readingTime": calculateReadingTime(body) })}`;
  })} </div> </section>`}${heritage.length > 0 && renderTemplate`<section class="flex flex-col items-start px-4"> <div class="flex flex-col items-center py-8 w-full"> <a href="/cultural-heritage" class="text-3xl font-bold text-secondary">
Cultural Heritage
</a> </div> <div class="flex flex-wrap gap-8 justify-start"> ${heritage.slice(0, 4).map(({ body, data, slug }) => {
    return renderTemplate`${renderComponent($$result2, "Card", $$Card, { "loading": "lazy", "link": `/blogs/${slug}`, "data": data, "readingTime": calculateReadingTime(body) })}`;
  })} </div> </section>`}${destination.length > 0 && renderTemplate`<section class="flex flex-col items-start px-4"> <div class="flex flex-col items-center py-8 w-full"> <a href="/destination" class="text-3xl font-bold text-secondary">
Wedding Destination
</a> </div> <div class="flex flex-wrap gap-8 justify-start"> ${destination.slice(0, 4).map(({ body, data, slug }) => {
    return renderTemplate`${renderComponent($$result2, "Card", $$Card, { "loading": "lazy", "link": `/blogs/${slug}`, "data": data, "readingTime": calculateReadingTime(body) })}`;
  })} </div> </section>`}${planning.length > 0 && renderTemplate`<section class="flex flex-col items-start px-4"> <div class="flex flex-col items-center py-8 w-full"> <a href="/planning" class="text-3xl font-bold text-secondary">
Plan Your Dream Wedding
</a> </div> <div class="flex flex-wrap gap-8 justify-start"> ${planning.slice(0, 4).map(({ body, data, slug }) => {
    return renderTemplate`${renderComponent($$result2, "Card", $$Card, { "loading": "lazy", "link": `/blogs/${slug}`, "data": data, "readingTime": calculateReadingTime(body) })}`;
  })} </div> </section>`}`, "meta": ($$result2) => renderTemplate`${renderComponent($$result2, "Meta", $$Meta, { "slot": "meta", "image": "test" })}` })}`;
}, "C:/Users/singh/OneDrive/Desktop/pheres/src/pages/index.astro", void 0);

const $$file = "C:/Users/singh/OneDrive/Desktop/pheres/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
