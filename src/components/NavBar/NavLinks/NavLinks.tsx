
import { GoProject } from "react-icons/go"
import { HiHomeModern } from "react-icons/hi2"
import { RiTimeLine } from "react-icons/ri"
import { TbArrowRoundaboutRight } from "react-icons/tb"

// Define the shape of a nav link
type NavLink = {
    icon: React.ReactNode;
    label: string;
    anchor: string;
};

// Your NavLinks array
export const NavLinks: NavLink[] = [
    {
        icon: <HiHomeModern />,
        label: "Home",
        anchor: "#home",
    },
    {
        icon: <GoProject />,
        label: "Projects",
        anchor: "#projects",
    },
    {
        icon: <RiTimeLine />,
        label: "Experience",
        anchor: "#experience",
    },
    {
        icon: <TbArrowRoundaboutRight />,
        label: "About",
        anchor: "#about",
    },
];
