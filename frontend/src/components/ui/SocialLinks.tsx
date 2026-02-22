import { PiGithubLogoFill } from "react-icons/pi";
import { MdEmail } from "react-icons/md";

interface linksProps {
    name: string
    icon: React.ReactNode
    url: string
}

const socialLinks: linksProps[] = [
    {
        name: 'Github',
        icon: <PiGithubLogoFill />,
        url: 'https://github.com/rheymiaga'
    },
    {
        name: 'Email me',
        icon: <MdEmail />,
        url: 'mailto:mrheylouie@gmail.com'
    },
]

export const SocialLinks = () => {

    return (
        <div className="flex items-center gap-4 p-2 relative justify-center">

            {socialLinks.map((link) => (
                <a className="poppins" target="_blank"
                    href={link.url} key={link.url}>
                    <div className="flex opacity-70 hover:opacity-100 p-2 text-base hover:bg-white/10 rounded-lg gap-1 items-center relative overflow-hidden group hover:scale-105 transition-all duration-500 ease-in-out">
                        <div className="h-full w-0 group-hover:w-full transition-all duration-500 transform -z-10 absolute -right-5 group-hover:-translate-x-40 top-0 bg-white/40 blur-sm"></div>
                        <p>
                            {link.icon}
                        </p>
                        <p>{link.name}</p>
                    </div>
                </a>
            ))
            }


        </div >
    )
}
