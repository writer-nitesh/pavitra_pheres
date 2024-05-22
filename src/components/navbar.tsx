
import { navigation } from "../application.json";
import { useEffect, useState } from "react";
import { Hero } from "./hero";
import { HiBars3 } from 'react-icons/hi2'

export function Navbar({ children }: { children: any }) {
    const { cta, links } = navigation;
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    const [openNavbar, setOpenNavbar] = useState(false)


    useEffect(() => {
        if (window.location.pathname === "/") {
            setCurrentPath(window.location.pathname);
        }

    }, [window.location.pathname]);


    return (
        <header className={`flex flex-col ${currentPath === "/" && "hero_bg"}`}>

            <div className="flex  items-center justify-between p-4 ">
                {children}
                <div className='lg:hidden md:hidden flex items-center justify-center'>
                    <button type="button" onClick={() => { setOpenNavbar(!openNavbar) }} title="Toggle Navigation">
                        <HiBars3 className='size-6' />
                    </button>
                </div>

                <nav className="lg:flex hidden">
                    <ul className="lg:flex gap-8 hidden">
                        {
                            links.map(({ name, url }) => (
                                <li>
                                    <a key={name} className={`uppercase font-medium ${currentPath === url && "text-primary"}`} href={url}>
                                        {name}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
                {/* <button className="bg-secondary text-white font-bold px-4 py-2 hidden lg:block rounded-md" type="button">{cta} </button> */}
            </div>
            {
                openNavbar &&
                <nav>
                    <ul className="flex items-center my-2 flex-col gap-4 lg:hidden">
                        {
                            links.map(({ name, url }) => (
                                <li>
                                    <a key={name} className={`uppercase font-medium ${currentPath === url && "text-primary"}`} href={url}>
                                        {name}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            }
            {currentPath === "/" && <Hero />}
        </header >
    )
}

