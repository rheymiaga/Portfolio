import { PiGithubLogoFill } from "react-icons/pi";
import { LuExternalLink } from "react-icons/lu";
import { FaMobile } from "react-icons/fa6";
import { IoDesktop } from "react-icons/io5";
import { BsStack } from "react-icons/bs";
import { MdZoomOutMap } from "react-icons/md";

import electrical_shop_mobile from "../../../assets/images/electrical-shop-mobile.png";
import electrical_shop_desktop from "../../../assets/images/electrical-shop-desktop.png";

export type ShownImage = "mobileImage" | "desktopImage" | "usedTechStack" | "allImages";

export interface ProjectCardProps {
    title: string;
    description: string;
    repoLink: string;
    pageLink: string;
    projcategory: string;
    mobileImg: string;
    desktopImg: string;
}

export interface ProjectLinkProps {
    icon: React.ReactNode;
    name: string;
}

export interface ProjectViewProps {
    icon: React.ReactNode;
    view: ShownImage;
}

export const projectView: ProjectViewProps[] = [
    { icon: <MdZoomOutMap />, view: "allImages" },
    { icon: <FaMobile />, view: "mobileImage" },
    { icon: <IoDesktop />, view: "desktopImage" },
    { icon: <BsStack />, view: "usedTechStack" },

];

export const projectLinks: ProjectLinkProps[] = [
    { name: "Github", icon: <PiGithubLogoFill /> },
    { name: "Visit", icon: <LuExternalLink /> },
];

export const allProjects: ProjectCardProps[] = [
    {
        title: "Yan-Yan Electrical Shop",
        description: "Responsive e-commerce demo for a local shop.",
        repoLink: "https://github.com/rheymiaga/YanYan",
        pageLink: "https://rheymiaga.github.io/YanYan",
        projcategory: "Personal",
        mobileImg: electrical_shop_mobile,
        desktopImg: electrical_shop_desktop,
    },
    {
        title: "Another Project",
        description: "Second project example with modern UI/UX.",
        repoLink: "https://github.com/rheymiaga/YanYan",
        pageLink: "https://rheymiaga.github.io/YanYan",
        projcategory: "Commission",
        mobileImg: electrical_shop_mobile,
        desktopImg: electrical_shop_desktop,
    },

];
