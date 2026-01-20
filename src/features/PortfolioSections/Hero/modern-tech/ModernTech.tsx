import { RiTailwindCssFill } from "react-icons/ri";
import { SiTypescript, SiVite } from "react-icons/si";


export const ModernTech = [

    {
        icon: <RiTailwindCssFill />,
        label: 'TailwindCss',
        color: 'text-cyan-500 ',
        textColor: ' from-blue-600 via-cyan-400 to-blue-500',
        pos: 'bottom-1/2 right-1/9 text-white ',
        style: 'bg-conic from-cyan-400 via-emerald-500 to-blue-500'
    },
    {
        icon: <SiTypescript />,
        label: 'TypeScript',
        color: 'text-blue-400 ',
        textColor: ' from-blue-600 via-purple-400 to-blue-500',
        pos: 'bottom-1/4 right-1/6 text-white ',
        style: 'bg-conic from-purple-400 via-cyan-500 to-blue-500 '
    },
    {
        icon: <SiVite />,
        label: 'Vite',
        color: 'text-purple-400',
        textColor: ' from-purple-600 to-amber-500',
        pos: 'bottom-1/2 right-1/3 text-white',
        style: ' bg-conic from-purple-400 via-cyan-500 to-amber-400'

    },
]