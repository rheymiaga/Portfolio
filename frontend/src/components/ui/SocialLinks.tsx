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
        <div className="flex items-center gap-4 mx-4 relative justify-center">

            {socialLinks.map((link) => (
                <>
                    <a className="poppins" target="_blank"
                        href={link.url} key={link.url}>
                        <div className="flex opacity-70 hover:opacity-100 p-3    rounded gap-1 items-center">
                            <span className=" rounded flex shrink-0  text-xl">
                                {link.icon}
                            </span>
                            <p>{link.name}</p>
                        </div>

                    </a>
                </>
            ))
            }


        </div >
    )
}
