/* empty css                          */
import { d as createAstro, e as createComponent, r as renderTemplate, m as maybeRenderHead, i as renderSlot, h as renderComponent } from '../astro_BCmwdkZx.mjs';
import 'kleur/colors';
import { $ as $$Layout } from './404_DuLQuKO7.mjs';
import 'clsx';
/* empty css                           */

const $$Astro = createAstro("https://pavitrapheres.com");
const $$TextPage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$TextPage;
  const { title } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col items-center"> <div class="prose my-8 lg:mx-0 mx-4 flex items-center flex-col prose-slate"> <h1>${title}</h1> ${renderSlot($$result, $$slots["default"])} </div> </div>`;
}, "C:/Users/singh/OneDrive/Desktop/Work/pheres/src/layouts/Text Page.astro", void 0);

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "About Us" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "TextPage", $$TextPage, { "title": "About Us" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h3>Welcome to Pavitra Pheres</h3> <p>
At <a class="text-primary" href="/">Pavitra Pheres</a>, we're passionate about showcasing
            the timeless allure of Uttarakhand as an exquisite destination for
            weddings. Nestled amidst the majestic Himalayas, Uttarakhand offers
            a picturesque backdrop for couples seeking to exchange vows in a
            setting of natural splendor and cultural richness.
</p> <p>
Our mission is simple yet profound: to inspire and assist couples in
            crafting unforgettable moments as they embark on the journey of a
            lifetime. Whether you're drawn to the serene lakes of Nainital, the
            lush valleys of Mussoorie, or the spiritual ambiance of Rishikesh,
            we're here to guide you in creating the wedding of your dreams in
            this enchanting region.
</p> <p>
With a deep appreciation for the local customs and traditions, we
            strive to connect you with the essence of Uttarakhand's heritage,
            weaving elements of authenticity into every aspect of your
            celebration. From recommending breathtaking venues to providing
            insights into logistics and planning, our dedicated team is
            committed to ensuring that your wedding experience is seamless and
            magical.
</p> <p>
At Pavitra Pheres, we believe that every love story deserves to be
            celebrated in a setting as unique and remarkable as the bond it
            honors. Join us on this journey as we unveil the beauty and charm of
            Uttarakhand through the lens of matrimonial bliss.
</p> <p>
Let's embark on this enchanting adventure together, where love knows
            no bounds and dreams take flight amidst the pristine landscapes of
            Uttarakhand.
</p> ` })} ` })}`;
}, "C:/Users/singh/OneDrive/Desktop/Work/pheres/src/pages/about.astro", void 0);

const $$file = "C:/Users/singh/OneDrive/Desktop/Work/pheres/src/pages/about.astro";
const $$url = "/about";

const about = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$About,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$TextPage as $, about as a };
