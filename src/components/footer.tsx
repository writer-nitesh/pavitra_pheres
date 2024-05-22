
import { navigation, description, social } from "../application.json";
import { icons, SocialIcons, socialIcons } from "../utils/helpers";

import { Logo } from "./logo";


export function Footer() {
    const { links } = navigation;
    const currentYear = new Date().getFullYear();
    return (
        <footer className="flex flex-col items-center border-t-gray-100 border-t-2 mt-4">



            <div className="lg:flex w-full items-center justify-between py-2 px-4">
                <div className="flex flex-col lg:items-start items-center  gap-2">
                    <Logo />
                    {/* <h3 className="text-sm font-medium text-secondary">{tagline}</h3> */}
                    <p className="text-sm w-80 lg:text-left text-center">
                        {description}
                    </p>

                    <div className="flex items-center flex-col gap-2 lg:my-0 my-4">
                        <h3 className="text-sm font-bold">Follow us on</h3>
                        <div className="flex gap-4">
                            {
                                social.map(({ name, url }) => {
                                    const Icon = icons[SocialIcons[name]];
                                    return (

                                        <a aria-label={name} href={url} key={name}>
                                            <Icon className="size-4 text-primary" />
                                        </a>


                                    )
                                })

                            }
                        </div>
                    </div>
                </div>

                <div className="flex lg:flex-row flex-col gap-10">
                    <div className="flex flex-col items-center">
                        <h2 className="font-bold">Page</h2>
                        <nav className="flex flex-col  items-center">
                            {links.map(({ name, url }) => <a key={name} href={url}>{name}</a>)}
                        </nav>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="font-bold">Blogs</h2>
                        <span className="flex flex-col items-center">
                            <a href="http://localhost:3000/blogs">Something </a>
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="font-bold">Legal</h2>
                        <span className="flex flex-col items-center">
                            <a href="http://localhost:3000/blogs">Something </a>
                        </span>
                    </div>
                </div>


            </div>

            <div >
                <p className="text-xs py-2">
                    © {currentYear} Pavitra Pheres. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
