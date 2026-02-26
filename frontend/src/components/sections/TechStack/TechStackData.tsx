import { BiLogoPostgresql, BiLogoTypescript } from "react-icons/bi";
import { FaNode, FaReact } from "react-icons/fa6";
import { IoLogoCss3 } from "react-icons/io5";
import { RiJavascriptFill } from "react-icons/ri";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiExpress, SiGithub, SiPostman, SiRender, SiVite } from "react-icons/si";
import { VscVscodeInsiders } from "react-icons/vsc";
import { FaGitAlt } from "react-icons/fa";
import { AiFillDatabase } from "react-icons/ai";

interface TechStackItem {
    name: string;
    icon: React.ReactNode;
    color: string;
    description: string;
}
interface TechStackCategory {
    category: string;
    items: TechStackItem[];
}

const frontendItems: TechStackItem[] = [
    {
        name: "React",
        icon: <FaReact />,
        color: "#61DAFB",
        description: "UI component library",
    },
    {
        name: "TypeScript",
        icon: <BiLogoTypescript />,
        color: "#3178C6",
        description: "Type safe JavaScript",
    },
    {
        name: "JavaScript",
        icon: <RiJavascriptFill />,
        color: "#F7DF1E",
        description: "Dynamic web scripting",
    },
    {
        name: "Tailwind CSS",
        icon: <RiTailwindCssFill />,
        color: "#38B2AC",
        description: "Utility first CSS",
    },
    {
        name: "CSS3",
        icon: <IoLogoCss3 />,
        color: "#1572B6",
        description: "Modern styling framework",
    },
];

const backendItems: TechStackItem[] = [
    {
        name: "Node.js",
        icon: <FaNode />,
        color: "#339933",
        description: "JavaScript runtime",
    },
    {
        name: "Express.js",
        icon: <SiExpress />,
        color: "#000000",
        description: "Web framework",
    },
    {
        name: "TypeScript",
        icon: <BiLogoTypescript />,
        color: "#3178C6",
        description: "Type safe JavaScript",
    },
    {
        name: "PostgreSQL",
        icon: <BiLogoPostgresql />,
        color: "#47808F",
        description: "Relational database",
    },
];

const toolsItems: TechStackItem[] = [
    {
        name: "Github",
        icon: <SiGithub />,
        color: "#333333",
        description: "Version control platform",
    },
    {
        name: "Git",
        icon: <FaGitAlt />,
        color: "#F05032",
        description: "Version control system",
    },
    {
        name: "Vscode",
        icon: <VscVscodeInsiders />,
        color: "#007ACC",
        description: "Integrated development environment",
    },
    {
        name: "Render",
        icon: <SiRender />,
        color: "#000000",
        description: "Web platform for deployment",
    },
    {
        name: "Postman",
        icon: <SiPostman />,
        color: "#FF6C37",
        description: "API testing tool",
    },
    {
        name: "PgAdmin 4",
        icon: <BiLogoPostgresql />,
        color: "#336791",
        description: "PostgreSQL database management",
    },
    {
        name: "Neon",
        icon: <AiFillDatabase />,
        color: "#44D62C",
        description: "Cloud-native PostgreSQL platform",
    },
    {
        name: "Vite",
        icon: <SiVite />,
        color: "#646CFF",
        description: "Next generation frontend tooling",
    }
];

export const techStack: TechStackCategory[] = [
    {
        category: "All",
        items: [...frontendItems,
        ...backendItems.filter(item => item.name !== 'TypeScript'),
        ...toolsItems],
    },
    {
        category: "Frontend",
        items: frontendItems,
    },
    {
        category: "Backend",
        items: backendItems,
    },
    {
        category: "Tools & Platforms",
        items: toolsItems,
    },
]