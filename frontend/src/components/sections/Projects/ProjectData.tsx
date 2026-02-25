import { PiGithubLogoFill } from "react-icons/pi";
import { LuExternalLink } from "react-icons/lu";
import { FaMobile } from "react-icons/fa6";
import { IoDesktop } from "react-icons/io5";
import { BsStack } from "react-icons/bs";
import { MdZoomOutMap } from "react-icons/md";
import { FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import { FaNode } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiExpress, SiRender } from "react-icons/si";
import { FaDatabase } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io5";
import { HiAcademicCap } from "react-icons/hi2";
import { MdWork } from "react-icons/md";

import AuctionXpressMobile from "../../../assets/images/AuctionXpressMobile.png";
import AuctionXpressDesktop from "../../../assets/images/AuctionXpressDesktop.png";
import gameHubMobile from "../../../assets/images/GameHubMobile.png";
import gameHubDesktop from "../../../assets/images/GameHubDesktop.png";
import electrical_shop_mobile from "../../../assets/images/electrical-shop-mobile.png";
import electrical_shop_desktop from "../../../assets/images/electrical-shop-desktop.png";

import YanYanMobileVid from "../../../assets/videos/YanYanMobileVId.mp4";
import YanYanDesktopVid from "../../../assets/videos/YanYanDesktopVid.mp4";
import AuctionXpressMobileVid from "../../../assets/videos/AuctionXpressMobileVid.mp4";
import AuctionXpressDesktopVid from "../../../assets/videos/AuctionXpressDesktopVid.mp4";
import GameHubMobileVid from "../../../assets/videos/GameHubMobileVid.mp4";
import GameHubDesktopVid from "../../../assets/videos/GameHubDesktopVid.mp4";

export type ShownImage = "mobileImage" | "desktopImage" | "usedTechStack" | "allImages";

export interface ProjectCardProps {
    title: string;
    teamType?: "Solo" | "Team";
    repoLink: string;
    pageLink: string;
    projcategory: string;
    mobileVid: string;
    mobileImg: string;
    desktopVid: string;
    desktopImg: string;
    icons?: React.ReactNode[];
    iconsName?: string[];
    iconsColor?: string[];
    hostedIcons?: React.ReactNode[];
    hostedNames?: string[];
    hostedColors?: string[];
    description?: string;
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
    { name: "Code", icon: <PiGithubLogoFill /> },
    { name: "Visit", icon: <LuExternalLink /> },
];

export interface HistoryItem {
    title: string;
    year: string | number;
    description: string;

}

export interface HistoryCategory {
    category: string;
    icon: React.ReactNode;
    items: HistoryItem[];
}

export const History: HistoryCategory[] = [
    {
        category: "Academic History",
        icon: <HiAcademicCap />,
        items: [
            {
                title: "College",
                year: "Present",
                description: "BS Information Technology",

            },
            {
                title: "Senior High School",
                year: "2021 – 2023",
                description: "ICT Strand",
            },

        ]
    },
    {
        category: "Career Path",
        icon: <MdWork />,
        items: [
            {
                title: "Software Engineer",
                year: "Post-Graduation",
                description: "Future Goal",
            }
        ]
    }

];


export const allProjects: ProjectCardProps[] = [
    {
        title: "Auction Xpress",
        teamType: "Solo",
        repoLink: "https://github.com/rheymiaga/auction_app",
        pageLink: "https://auction-xpress.onrender.com",
        projcategory: "Academic",
        mobileImg: AuctionXpressMobile,
        mobileVid: AuctionXpressMobileVid,
        desktopVid: AuctionXpressDesktopVid,
        desktopImg: AuctionXpressDesktop,

        icons: [
            <FaReact />,
            <BiLogoTypescript />,
            <RiTailwindCssFill />,
            <IoLogoCss3 />,
            <FaNode />,
            <SiExpress />,
            <BiLogoPostgresql />,

        ],
        iconsName: [
            "React",
            "TypeScript",
            "Tailwind CSS",
            "CSS 3",
            "Node.js",
            "Express",
            "PostgreSQL",

        ],
        iconsColor: [
            "#61DAFB",
            "#3178C6",
            "#38BDF8",
            "#264DE4",
            "#339933",
            "#3178C2",
            "#336791",

        ],
        hostedIcons: [
            <FaDatabase />,
            <SiRender />
        ],
        hostedNames: [
            "Neon",
            "Render"
        ],
        hostedColors: [
            "#00E599",
            "#6C63FF"
        ],
        description:
            "A full-stack auction app for online bidding, developed as an academic project. Deployed on Render with a Neon-backed PostgreSQL database."
    },
    {
        title: "Electrical Shop",
        teamType: "Solo",
        repoLink: "https://github.com/rheymiaga/YanYan",
        pageLink: "https://rheymiaga.github.io/YanYan",
        projcategory: "Personal",
        mobileVid: YanYanMobileVid,
        desktopVid: YanYanDesktopVid,
        mobileImg: electrical_shop_mobile,
        desktopImg: electrical_shop_desktop,
        icons: [<FaReact />, <BiLogoTypescript />, <RiTailwindCssFill />, <IoLogoCss3 />],
        iconsName: ["React", "TypeScript", "Tailwind CSS", "CSS 3"],
        iconsColor: ["#61DAFB", "#3178C6", "#38BDF8", "#264DE4"],
        hostedIcons: [
            <FaGithubSquare />
        ],
        hostedNames: [
            "GitHub Pages"
        ],
        hostedColors: [
            "#B2BEB5"
        ],
        description:
            "A practice web app showcasing electrical services and parts, created as a personal project to explore React, TypeScript, and Tailwind CSS."
    },
    {
        title: "Sci-fi GameHub",
        teamType: "Solo",
        repoLink: "https://github.com/rheymiaga/GameHub",
        pageLink: "https://rheymiaga.github.io/GameHub",
        projcategory: "Academic",
        mobileVid: GameHubMobileVid,
        desktopVid: GameHubDesktopVid,
        mobileImg: gameHubMobile,
        desktopImg: gameHubDesktop,
        icons: [<FaReact />, <BiLogoTypescript />, <RiTailwindCssFill />, <IoLogoCss3 />],
        iconsName: ["React", "TypeScript", "Tailwind CSS", "CSS 3"],
        iconsColor: ["#61DAFB", "#3178C6", "#38BDF8", "#264DE4"],
        hostedIcons: [
            <FaGithubSquare />
        ],
        hostedNames: [
            "GitHub Pages"
        ],
        hostedColors: [
            "#B2BEB5"
        ],
        description:
            "A sci-fi game discovery hub, developed as an academic project. Deployed on GitHub Pages."
    }

];
