
import { HiHomeModern } from "react-icons/hi2"
import { MdContactPhone } from "react-icons/md"
import { TbArrowRoundaboutRight } from "react-icons/tb"

export const NavBarTemplate = [
    {
        icon: <HiHomeModern />,
        label: 'Home',
        anchor: '#home'
    },
    {
        icon: <TbArrowRoundaboutRight />,
        label: 'About',
        anchor: '#about'
    },
    {
        icon: <MdContactPhone />,
        label: 'Contact',
        anchor: '#contact'
    },
]