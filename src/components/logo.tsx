// import { Image } from 'astro:assets'
import { logo } from "../application.json";

export function Logo() {
    return (
        <a aria-label='Pavitra Pheres' href="/">
            <img
                src={logo}
                alt="Pavitra Pheres Logo"
                aria-label="Pavitra Pheres Logo"
                sizes={"100vw"}
                height={150}
                width={150}
            />
        </a>
    )
}
