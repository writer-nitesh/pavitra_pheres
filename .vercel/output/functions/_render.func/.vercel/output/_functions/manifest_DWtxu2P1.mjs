import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import './chunks/astro_BCmwdkZx.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Uy7zXoO-.js"},{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/about.CrPUT8Cb.css"},{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Outfit:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap\";::-webkit-scrollbar-track{border-radius:10px;background-color:transparent}::-webkit-scrollbar{width:5px;background-color:transparent}::-webkit-scrollbar-thumb{border-radius:10px;background-color:#9e9e9ebe}body{font-family:Outfit,sans-serif}.hero_text{font-family:Playfair Display}.hero_bg{content-visibility:auto;background:linear-gradient(90deg,#fff -10%,#fff0 60%),url(/images/hero_image_desktop.jpg) center/cover no-repeat}@media screen and (max-width: 640px){.hero_bg{content-visibility:auto;background:linear-gradient(360deg,#fff,#fff0 80%),url(/images/hero_img_mobile.jpg) center/cover no-repeat}}\n"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Uy7zXoO-.js"},{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/about.CrPUT8Cb.css"},{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Outfit:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap\";::-webkit-scrollbar-track{border-radius:10px;background-color:transparent}::-webkit-scrollbar{width:5px;background-color:transparent}::-webkit-scrollbar-thumb{border-radius:10px;background-color:#9e9e9ebe}body{font-family:Outfit,sans-serif}.hero_text{font-family:Playfair Display}.hero_bg{content-visibility:auto;background:linear-gradient(90deg,#fff -10%,#fff0 60%),url(/images/hero_image_desktop.jpg) center/cover no-repeat}@media screen and (max-width: 640px){.hero_bg{content-visibility:auto;background:linear-gradient(360deg,#fff,#fff0 80%),url(/images/hero_img_mobile.jpg) center/cover no-repeat}}\n"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Uy7zXoO-.js"},{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/about.CrPUT8Cb.css"},{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Outfit:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap\";::-webkit-scrollbar-track{border-radius:10px;background-color:transparent}::-webkit-scrollbar{width:5px;background-color:transparent}::-webkit-scrollbar-thumb{border-radius:10px;background-color:#9e9e9ebe}body{font-family:Outfit,sans-serif}.hero_text{font-family:Playfair Display}.hero_bg{content-visibility:auto;background:linear-gradient(90deg,#fff -10%,#fff0 60%),url(/images/hero_image_desktop.jpg) center/cover no-repeat}@media screen and (max-width: 640px){.hero_bg{content-visibility:auto;background:linear-gradient(360deg,#fff,#fff0 80%),url(/images/hero_img_mobile.jpg) center/cover no-repeat}}\n"}],"routeData":{"route":"/blogs","isIndex":false,"type":"page","pattern":"^\\/blogs\\/?$","segments":[[{"content":"blogs","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blogs.astro","pathname":"/blogs","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Uy7zXoO-.js"},{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/about.CrPUT8Cb.css"},{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Outfit:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap\";::-webkit-scrollbar-track{border-radius:10px;background-color:transparent}::-webkit-scrollbar{width:5px;background-color:transparent}::-webkit-scrollbar-thumb{border-radius:10px;background-color:#9e9e9ebe}body{font-family:Outfit,sans-serif}.hero_text{font-family:Playfair Display}.hero_bg{content-visibility:auto;background:linear-gradient(90deg,#fff -10%,#fff0 60%),url(/images/hero_image_desktop.jpg) center/cover no-repeat}@media screen and (max-width: 640px){.hero_bg{content-visibility:auto;background:linear-gradient(360deg,#fff,#fff0 80%),url(/images/hero_img_mobile.jpg) center/cover no-repeat}}\n"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Uy7zXoO-.js"},{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/about.CrPUT8Cb.css"},{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Outfit:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap\";::-webkit-scrollbar-track{border-radius:10px;background-color:transparent}::-webkit-scrollbar{width:5px;background-color:transparent}::-webkit-scrollbar-thumb{border-radius:10px;background-color:#9e9e9ebe}body{font-family:Outfit,sans-serif}.hero_text{font-family:Playfair Display}.hero_bg{content-visibility:auto;background:linear-gradient(90deg,#fff -10%,#fff0 60%),url(/images/hero_image_desktop.jpg) center/cover no-repeat}@media screen and (max-width: 640px){.hero_bg{content-visibility:auto;background:linear-gradient(360deg,#fff,#fff0 80%),url(/images/hero_img_mobile.jpg) center/cover no-repeat}}\n"}],"routeData":{"route":"/cultural-heritage","isIndex":false,"type":"page","pattern":"^\\/cultural-heritage\\/?$","segments":[[{"content":"cultural-heritage","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cultural-heritage.astro","pathname":"/cultural-heritage","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Uy7zXoO-.js"},{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/about.CrPUT8Cb.css"},{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Outfit:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap\";::-webkit-scrollbar-track{border-radius:10px;background-color:transparent}::-webkit-scrollbar{width:5px;background-color:transparent}::-webkit-scrollbar-thumb{border-radius:10px;background-color:#9e9e9ebe}body{font-family:Outfit,sans-serif}.hero_text{font-family:Playfair Display}.hero_bg{content-visibility:auto;background:linear-gradient(90deg,#fff -10%,#fff0 60%),url(/images/hero_image_desktop.jpg) center/cover no-repeat}@media screen and (max-width: 640px){.hero_bg{content-visibility:auto;background:linear-gradient(360deg,#fff,#fff0 80%),url(/images/hero_img_mobile.jpg) center/cover no-repeat}}\n"}],"routeData":{"route":"/destination","isIndex":false,"type":"page","pattern":"^\\/destination\\/?$","segments":[[{"content":"destination","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/destination.astro","pathname":"/destination","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Uy7zXoO-.js"},{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/about.CrPUT8Cb.css"},{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Outfit:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap\";::-webkit-scrollbar-track{border-radius:10px;background-color:transparent}::-webkit-scrollbar{width:5px;background-color:transparent}::-webkit-scrollbar-thumb{border-radius:10px;background-color:#9e9e9ebe}body{font-family:Outfit,sans-serif}.hero_text{font-family:Playfair Display}.hero_bg{content-visibility:auto;background:linear-gradient(90deg,#fff -10%,#fff0 60%),url(/images/hero_image_desktop.jpg) center/cover no-repeat}@media screen and (max-width: 640px){.hero_bg{content-visibility:auto;background:linear-gradient(360deg,#fff,#fff0 80%),url(/images/hero_img_mobile.jpg) center/cover no-repeat}}\n"}],"routeData":{"route":"/planning","isIndex":false,"type":"page","pattern":"^\\/planning\\/?$","segments":[[{"content":"planning","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/planning.astro","pathname":"/planning","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Uy7zXoO-.js"},{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/about.CrPUT8Cb.css"},{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Outfit:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap\";::-webkit-scrollbar-track{border-radius:10px;background-color:transparent}::-webkit-scrollbar{width:5px;background-color:transparent}::-webkit-scrollbar-thumb{border-radius:10px;background-color:#9e9e9ebe}body{font-family:Outfit,sans-serif}.hero_text{font-family:Playfair Display}.hero_bg{content-visibility:auto;background:linear-gradient(90deg,#fff -10%,#fff0 60%),url(/images/hero_image_desktop.jpg) center/cover no-repeat}@media screen and (max-width: 640px){.hero_bg{content-visibility:auto;background:linear-gradient(360deg,#fff,#fff0 80%),url(/images/hero_img_mobile.jpg) center/cover no-repeat}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://pavitrapheres.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/singh/OneDrive/Desktop/Work/pheres/src/pages/blogs/[slug].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/singh/OneDrive/Desktop/Work/pheres/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/singh/OneDrive/Desktop/Work/pheres/src/pages/about.astro",{"propagation":"none","containsHead":true}],["C:/Users/singh/OneDrive/Desktop/Work/pheres/src/pages/blogs.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/singh/OneDrive/Desktop/Work/pheres/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["C:/Users/singh/OneDrive/Desktop/Work/pheres/src/pages/cultural-heritage.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/singh/OneDrive/Desktop/Work/pheres/src/pages/destination.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/singh/OneDrive/Desktop/Work/pheres/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/singh/OneDrive/Desktop/Work/pheres/src/pages/planning.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/singh/OneDrive/Desktop/Work/pheres/src/components/blog/related.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/singh/OneDrive/Desktop/Work/pheres/src/layouts/Blog Layout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blogs/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blogs@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/cultural-heritage@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/destination@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/planning@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/contact.astro":"chunks/pages/contact_B_-NeF41.mjs","/src/pages/cultural-heritage.astro":"chunks/pages/cultural-heritage_QQoNn2s6.mjs","/src/pages/destination.astro":"chunks/pages/destination_-0d88nk8.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_rQqLwtt6.mjs","/src/pages/index.astro":"chunks/pages/index_BA9fPbmh.mjs","/src/pages/planning.astro":"chunks/pages/planning_sO3N6YbX.mjs","\u0000@astrojs-manifest":"manifest_DWtxu2P1.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_Dd5fzVq3.mjs","\u0000@astro-page:src/pages/404@_@astro":"chunks/404_BqUg5CZk.mjs","\u0000@astro-page:src/pages/about@_@astro":"chunks/about_k-Tvt0HW.mjs","\u0000@astro-page:src/pages/blogs/[slug]@_@astro":"chunks/_slug__CZ-Sgoau.mjs","\u0000@astro-page:src/pages/blogs@_@astro":"chunks/blogs_ClvCZLRV.mjs","\u0000@astro-page:src/pages/contact@_@astro":"chunks/contact_CWW-kd-x.mjs","\u0000@astro-page:src/pages/cultural-heritage@_@astro":"chunks/cultural-heritage_D9BBuQbG.mjs","\u0000@astro-page:src/pages/destination@_@astro":"chunks/destination_Bl0-u4Vy.mjs","\u0000@astro-page:src/pages/planning@_@astro":"chunks/planning_CPnmjKNe.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_BInrO5D7.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/node_modules/@astrojs/vercel/dist/image/build-service.js":"chunks/build-service_DX7j3V2m.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/src/content/posts/post-1.mdx?astroContentCollectionEntry=true":"chunks/post-1_DHG73Prp.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/src/content/posts/post-2.mdx?astroContentCollectionEntry=true":"chunks/post-2_6OU8WJbp.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/src/content/posts/post-3.mdx?astroContentCollectionEntry=true":"chunks/post-3_CS5zwNGB.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/src/content/posts/post-4.mdx?astroContentCollectionEntry=true":"chunks/post-4_CQru0GLO.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/src/content/posts/post-5.mdx?astroContentCollectionEntry=true":"chunks/post-5_DR7dO9r7.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/src/content/posts/post-6.mdx?astroContentCollectionEntry=true":"chunks/post-6_kCt5CzGw.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/src/content/posts/post-7.mdx?astroContentCollectionEntry=true":"chunks/post-7_BE8z2e8t.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/src/content/posts/post-8.mdx?astroContentCollectionEntry=true":"chunks/post-8_CZHyl4Wh.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/src/content/posts/post-1.mdx?astroPropagatedAssets":"chunks/post-1_BQCLxde6.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/src/content/posts/post-2.mdx?astroPropagatedAssets":"chunks/post-2_Cu9qpsFn.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/src/content/posts/post-3.mdx?astroPropagatedAssets":"chunks/post-3_XVWCOCpA.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/src/content/posts/post-4.mdx?astroPropagatedAssets":"chunks/post-4_DF0aduO0.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/src/content/posts/post-5.mdx?astroPropagatedAssets":"chunks/post-5_Lr6xk-4w.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/src/content/posts/post-6.mdx?astroPropagatedAssets":"chunks/post-6_DEE9KqAj.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/src/content/posts/post-7.mdx?astroPropagatedAssets":"chunks/post-7_C1A9S82y.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/src/content/posts/post-8.mdx?astroPropagatedAssets":"chunks/post-8_C54poeUf.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/src/content/posts/post-1.mdx":"chunks/post-1_DEp4e_PE.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/src/content/posts/post-2.mdx":"chunks/post-2_DRtT2kwU.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/src/content/posts/post-3.mdx":"chunks/post-3_UM8pb7sn.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/src/content/posts/post-4.mdx":"chunks/post-4_CmyvgDcb.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/src/content/posts/post-5.mdx":"chunks/post-5_Y-r9ljrF.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/src/content/posts/post-6.mdx":"chunks/post-6_BuwgGtaW.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/src/content/posts/post-7.mdx":"chunks/post-7_D9wwoEXE.mjs","C:/Users/singh/OneDrive/Desktop/Work/pheres/src/content/posts/post-8.mdx":"chunks/post-8_C_0biEyc.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.C7KSlz2U.js","/astro/hoisted.js?q=1":"_astro/hoisted.Uy7zXoO-.js","@astrojs/react/client.js":"_astro/client.Df8ih4qs.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/rajula_balaushai.ClCQGTm9.jpg","/_astro/uttarakhand_rituals.aFRJso-t.jpg","/_astro/phadi_brides.CHna07h5.jpg","/_astro/destination_wedding.BI4B9tR1.jpg","/_astro/Shiva-Parvati.DqMkNN1x.webp","/_astro/plan_destination_wedding.BIgdUTiY.webp","/_astro/ritauls.C6mEMpMd.jpg","/_astro/Budget_Friendly.CmCiNYcD.png","/_astro/phadi_globand.MNAKHhI7.jpg","/_astro/pahdi_nath.B3OejdHX.jpg","/_astro/phadi_Hansuli.BpQyEzpP.jpg","/_astro/women_in _traditonal_attire.CSCvt1AE.png","/_astro/chandan_haar.DsEfrWM1.jpg","/_astro/pahdi_kanphool.Cw0-kmSX.jpg","/_astro/about.CrPUT8Cb.css","/pavitra_pheres_logo.png","/images/hero_image_desktop.jpg","/images/hero_img_mobile.jpg","/_astro/client.Df8ih4qs.js","/_astro/hoisted.C7KSlz2U.js","/_astro/hoisted.Uy7zXoO-.js"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
