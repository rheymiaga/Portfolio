import { PiGithubLogoFill } from "react-icons/pi";
import { MdEmail } from "react-icons/md";

interface CallToActionProps {
    name: string;
    url: string;
    icon: React.ReactNode;
}

const callToActions: CallToActionProps[] = [
    {
        name: "Get in Touch",
        url: 'mailto:mrheylouie@gmail.com',
        icon: <MdEmail />
    },
    {
        name: "GitHub",
        url: 'https://github.com/rheymiaga',
        icon: <PiGithubLogoFill />
    }
]



export const CallToAction = () => {
    return (
        <div className="gap-2 flex items-center poppins">
            {callToActions.map((cta) => (
                <a
                    key={cta.name}
                    href={cta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex relative group overflow-hidden items-center px-4 py-2 hover:bg-white/10 rounded-lg transition-all duration-300"
                >
                    <div className="h-full w-0 group-hover:w-full transition-all duration-500 transform -z-10 absolute -right-5 group-hover:-translate-x-50 top-0 bg-white/40 blur-sm"></div>
                    <span className="mr-2">{cta.icon}</span>
                    <span>{cta.name}</span>
                </a>
            ))}
        </div>
    )
}
