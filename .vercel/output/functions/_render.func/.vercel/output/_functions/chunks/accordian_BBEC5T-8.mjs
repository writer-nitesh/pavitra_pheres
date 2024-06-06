import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead } from './astro_DVL52kWv.mjs';
import 'kleur/colors';
import 'clsx';

const post6_faqs = [
  {
    "q": "How far in advance should I start planning my destination wedding?",
    "a": "Ideally, you should start planning at least a year in advance to give yourself and your guests ample time to prepare."
  },
  {
    "q": "What’s the best way to handle guest accommodations?",
    "a": "Block book rooms at a hotel near the wedding venue and provide guests with booking information early on."
  },
  {
    "q": "Should I provide transportation for my guests?",
    "a": "Yes, arranging transportation can ease the stress for your guests and ensure everyone arrives on time."
  },
  {
    "q": " How can I make my destination wedding eco-friendly?",
    "a": "Opt for sustainable vendors, minimize waste, and choose a location that practices environmental conservation."
  }
];
const post7_faqs = [
  {
    "q": "What are some budget-friendly wedding venues in Uttarakhand?",
    "a": "Some budget-friendly venues include guest houses in Rishikesh, boutique hotels in Mussoorie, and homestays in Nainital."
  },
  {
    "q": "How can I save on wedding decorations?",
    "a": "DIY decorations using local flowers and materials can significantly cut down costs. Enlist the help of friends and family for added fun and savings."
  },
  {
    "q": "When is the best time to book for a cheaper wedding?",
    "a": "Booking during the off-peak season and securing your venue and vendors well in advance can help you get the best rates."
  }
];

const $$Astro = createAstro("https://pavitrapheres.com");
const $$Accordian = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Accordian;
  const { faqs } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col gap-4"> ${faqs.map(({ q, a }) => renderTemplate`<details open> <summary class="font-bold cursor-pointer"> <h3 class="inline text-lg">${q}</h3> </summary> <p>${a}</p> </details>`)} </div>`;
}, "C:/Users/singh/OneDrive/Desktop/pheres/src/components/blog/accordian.astro", void 0);

export { $$Accordian as $, post7_faqs as a, post6_faqs as p };
