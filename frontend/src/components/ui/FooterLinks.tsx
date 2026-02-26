import { PiGithubLogoFill } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { LuExternalLink } from "react-icons/lu";

interface linksProps {
    name: string
    icon: React.ReactNode
    arrow: React.ReactNode
    url: string
}

const socialLinks: linksProps[] = [
    {
        name: "Email",
        icon: <MdEmail />,
        arrow: <IoIosArrowForward />,
        url: 'mailto:mrheylouie@gmail.com'
    },
    {
        name: "GitHub",
        icon: <PiGithubLogoFill />,
        arrow: <IoIosArrowForward />,
        url: 'https://github.com/rheymiaga'
    },

]

export const FooterLinks = () => {

    return (
        <div className="flex flex-col items-start gap-2 w-full">
            {socialLinks.map((link) => (
                <a className="poppins w-full" target="_blank" href={link.url} key={link.url}>
                    <div className="opacity-70 flex justify-between hover:opacity-100 p-2 text-xl w-full hover:bg-neutral-700 rounded-lg gap-1 items-center relative overflow-hidden group transition-all duration-500 ease-in-out">
                        <div className="flex items-center gap-2">
                            <span className="group-hover:hidden">{link.icon}</span>
                            <span className="hidden group-hover:block ease-in-out duration-300 transform group-hover:animate-bounce">{link.arrow}</span>
                            <span className="text-base group-hover:-translate-x-1 transition-all duration-300 ease-in-out">
                                {link.name === "Email" ? "mrheylouie@gmail.com" : link.name}
                            </span>
                        </div>
                        <span className="text-neutral-500 group-hover:text-neutral-200"><LuExternalLink /></span>

                    </div>
                </a>
            ))}
        </div>

    )
}
