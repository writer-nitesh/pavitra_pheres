/* empty css                          */
import { A as AstroError, k as UnknownContentCollectionError, e as createComponent, l as renderUniqueStylesheet, n as renderScriptElement, o as createHeadAndContent, r as renderTemplate, h as renderComponent, u as unescapeHTML, d as createAstro, m as maybeRenderHead, i as renderSlot, g as addAttribute } from '../astro_BCmwdkZx.mjs';
import 'kleur/colors';
import pLimit from 'p-limit';
import { p as prependForwardSlash } from '../astro/assets-service_CjcCo6Sm.mjs';
import { n as name, d as description, k as keywords, u as url, a as $$Image, c as calculateReadingTime, $ as $$Layout } from './404_DuLQuKO7.mjs';
import { FaCalendar, FaClock } from 'react-icons/fa';
import 'clsx';

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign({"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://pavitrapheres.com", "ASSETS_PREFIX": undefined}, { Path: process.env.Path })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = [...cacheEntriesByCollection.get(collection)];
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries;
    }
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/posts/post-1.mdx": () => import('../post-1_DHG73Prp.mjs'),"/src/content/posts/post-2.mdx": () => import('../post-2_6OU8WJbp.mjs'),"/src/content/posts/post-3.mdx": () => import('../post-3_CS5zwNGB.mjs'),"/src/content/posts/post-4.mdx": () => import('../post-4_CQru0GLO.mjs'),"/src/content/posts/post-5.mdx": () => import('../post-5_DR7dO9r7.mjs'),"/src/content/posts/post-6.mdx": () => import('../post-6_kCt5CzGw.mjs'),"/src/content/posts/post-7.mdx": () => import('../post-7_BE8z2e8t.mjs'),"/src/content/posts/post-8.mdx": () => import('../post-8_CZHyl4Wh.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"posts":{"type":"content","entries":{"Unforgettable Rituals of an Uttarakhand Wedding":"/src/content/posts/post-2.mdx","The Allure of Traditional Jewelry in Uttarakhand. A Timeless Elegance":"/src/content/posts/post-1.mdx","Preserving Cultural Heritage.Traditional Wedding Rituals of Uttarakhand":"/src/content/posts/post-3.mdx","Why Choose Uttarakhand for Your Destination Wedding":"/src/content/posts/post-4.mdx","Endless Love Story of Kumaon - Rajula and Malushahi":"/src/content/posts/post-5.mdx","How to Plan a Destination Wedding. Tips for Your Dream Wedding Abroad":"/src/content/posts/post-6.mdx","Budget-Friendly Destination Wedding Planning in Uttarakhand":"/src/content/posts/post-7.mdx","The Divine Wedding Venue of Shiva-Parvati at Uttarakhand's Triyuginarayan Temple":"/src/content/posts/post-8.mdx"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/posts/post-1.mdx": () => import('../post-1_Te4hcfr1.mjs'),"/src/content/posts/post-2.mdx": () => import('../post-2_D4xLi0Ec.mjs'),"/src/content/posts/post-3.mdx": () => import('../post-3_XVWCOCpA.mjs'),"/src/content/posts/post-4.mdx": () => import('../post-4_Crl6z34K.mjs'),"/src/content/posts/post-5.mdx": () => import('../post-5_Bz2PX3IL.mjs'),"/src/content/posts/post-6.mdx": () => import('../post-6_DEE9KqAj.mjs'),"/src/content/posts/post-7.mdx": () => import('../post-7_C1A9S82y.mjs'),"/src/content/posts/post-8.mdx": () => import('../post-8_C54poeUf.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
});

const $$Astro$2 = createAstro("https://pavitrapheres.com");
const $$Info = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Info;
  const { readingTime, pubDate, showShareLinks = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div> <div class="flex justify-between items-center"> <div class="flex gap-2 justify-center items-center"> ${renderComponent($$result, "FaCalendar", FaCalendar, { "color": "#6b7280", "size": 15 })} <span class="text-sm text-gray-500"> ${new Date(pubDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </span> </div> <div class="flex gap-2 justify-center items-center"> ${renderComponent($$result, "FaClock", FaClock, { "color": "#6b7280", "size": 15 })} <span class="text-sm text-gray-500">${readingTime}</span> </div> ${showShareLinks && renderTemplate`<div class=" gap-2 justify-center items-center lg:flex hidden"> ${renderSlot($$result, $$slots["default"])} </div>`} </div> </div>`;
}, "C:/Users/singh/OneDrive/Desktop/Work/pheres/src/components/blog/info.astro", void 0);

const $$Astro$1 = createAstro("https://pavitrapheres.com");
const $$Meta = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Meta;
  const {
    isBlog = false,
    title = name,
    desc = description,
    keyword = keywords,
    image
  } = Astro2.props;
  return renderTemplate`<title>
    ${isBlog ? `${title} | ${name}` : title}
</title><meta property="og:type" content="website"><meta property="og:url"${addAttribute(url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(desc ? desc : description, "content")}><meta property="og:image"${addAttribute(image, "content")}><meta name="twitter:card" content="summary_large_image"><meta name="twitter:url"${addAttribute(url, "content")}><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(desc ? desc : description, "content")}><meta name="twitter:image"${addAttribute(image, "content")}><meta name="description"${addAttribute(desc ? desc : description, "content")}><meta name="keywords"${addAttribute(keyword.join(", "), "content")}><meta name="author"${addAttribute(name, "content")}><meta name="robots" content="index, follow">`;
}, "C:/Users/singh/OneDrive/Desktop/Work/pheres/src/components/meta.astro", void 0);

const $$Astro = createAstro("https://pavitrapheres.com");
const $$Card = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Card;
  const { data, link, readingTime, loading } = Astro2.props;
  const { cover, coverAlt, title, description, pubDate } = data;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(link, "href")} class="lg:w-[320px] max-h-96 shadow-md flex flex-col items-center justify-center rounded-md gap-2 overflow-hidden bg-white"> <div class="w-full max-h-52 min-h-52 flex flex-col"> ${renderComponent($$result, "Image", $$Image, { "decoding": "async", "src": cover.src, "alt": coverAlt, "class": "h-full w-full max-h-52 min-h-52 flex object-cover", "loading": loading, "height": 500, "width": 500 })} </div> <div class="w-full px-2 flex flex-col gap-2 my-1 h-60 justify-between"> <h3 class="font-bold text-lg line-clamp-2 min-h-14 max-h-14"> ${title} </h3> <p class="min-h-16 max-h-16 line-clamp-3 text-gray-500 text-sm"> ${description} </p> <div class="py-1"> ${renderComponent($$result, "Info", $$Info, { "pubDate": pubDate, "readingTime": readingTime })} </div> </div> </a>`;
}, "C:/Users/singh/OneDrive/Desktop/Work/pheres/src/components/card.astro", void 0);

const $$Blogs = createComponent(async ($$result, $$props, $$slots) => {
  const posts = await getCollection("posts");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blogs" }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="flex flex-col gap-8 px-4 mt-2"> <div class="flex flex-col items-center"> <h1 class="text-3xl font-bold">Blogs</h1> </div> <div class="flex flex-wrap gap-8 justify-start items-center"> ${posts.map(({ body, data, slug }) => {
    return renderTemplate`${renderComponent($$result2, "Card", $$Card, { "loading": "eager", "link": `/blogs/${slug}`, "data": data, "readingTime": calculateReadingTime(body) })}`;
  })} </div> </div> `, "meta": ($$result2) => renderTemplate`${renderComponent($$result2, "Meta", $$Meta, { "slot": "meta", "title": "Blogs", "image": "test" })}` })}`;
}, "C:/Users/singh/OneDrive/Desktop/Work/pheres/src/pages/blogs.astro", void 0);

const $$file = "C:/Users/singh/OneDrive/Desktop/Work/pheres/src/pages/blogs.astro";
const $$url = "/blogs";

const blogs = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blogs,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Card as $, $$Meta as a, $$Info as b, blogs as c, getCollection as g };
