import type { IconType } from "react-icons";
import { FaEnvelope, FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";


export enum SocialIcons {
    Twitter = "Twitter",
    Facebook = "Facebook",
    Instagram = "Instagram",
    Email = "Email",
    LinkedIn = "LinkedIn"
}

export const icons: { [key in SocialIcons]: IconType } = {
    Twitter: FaTwitter,
    Facebook: FaFacebookF,
    Instagram: FaInstagram,
    Email: FaEnvelope,
    LinkedIn: FaLinkedin
}

export const socialIcons = {
    Twitter: FaTwitter,
    Facebook: FaFacebookF,
    Instagram: FaInstagram,
    Email: FaEnvelope
}

export function calculateReadingTime(text: string) {
    const defaultWordsPerMinute = 200;
    const wordsCount = text.split(/\s+/).length;
    const readingTime = wordsCount / defaultWordsPerMinute
    const minutes = Math.ceil(readingTime);
    const hours = Math.floor(minutes / 60);
    const formattedTime =
        hours > 0 ?
            `${hours} ${hours === 1 ? "hour" : "hours"}` :
            `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
    return formattedTime;
}

