import { BiLogoPostgresql, BiLogoTypescript } from "react-icons/bi";
import { FaNode, FaReact } from "react-icons/fa6";
import { IoLogoCss3 } from "react-icons/io5";
import { RiJavascriptFill } from "react-icons/ri";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiExpress, SiGithub, SiPostman, SiRender, SiVite } from "react-icons/si";
import { VscVscodeInsiders } from "react-icons/vsc";
import { FaGitAlt } from "react-icons/fa";
import { AiFillDatabase } from "react-icons/ai";
import { FaHtml5 } from "react-icons/fa6";
import { SiJsonwebtokens } from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { SiFramer, } from "react-icons/si";
import { MdOutlineSecurity } from "react-icons/md";

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
        description: "Component-based UI",
    },
    {
        name: "TypeScript",
        icon: <BiLogoTypescript />,
        color: "#3178C6",
        description: "Static type safety",
    },
    {
        name: "JavaScript",
        icon: <RiJavascriptFill />,
        color: "#F7DF1E",
        description: "Dynamic client scripting",
    },
    {
        name: "Tailwind CSS",
        icon: <RiTailwindCssFill />,
        color: "#38B2AC",
        description: "Utility-first styling",
    },
    {
        name: "CSS3",
        icon: <IoLogoCss3 />,
        color: "#1572B6",
        description: "Modern layout system",
    },
    {
        name: "Framer Motion",
        icon: <SiFramer />,
        color: "#E11D48",
        description: "Interactive 3D animations",
    },
    {
        name: "HTML 5",
        icon: <FaHtml5 />,
        color: "#F16529",
        description: "Semantic web structure",
    },
];

const backendItems: TechStackItem[] = [
    {
        name: "Node.js",
        icon: <FaNode />,
        color: "#339933",
        description: "Server-side runtime",
    },
    {
        name: "JWT",
        icon: <SiJsonwebtokens />,
        color: "#FB015B",
        description: "Stateless secure authentication",
    },
    {
        name: "RESTful API",
        icon: <TbApi />,
        color: "#007ACC",
        description: "Standardized data endpoints",
    },
    {
        name: "Express.js",
        icon: <SiExpress />,
        color: "#000000",
        description: "Server-side framework",
    },
    {
        name: "TypeScript",
        icon: <BiLogoTypescript />,
        color: "#3178C6",
        description: "Robust backend logic",
    },
    {
        name: "PostgreSQL",
        icon: <BiLogoPostgresql />,
        color: "#47808F",
        description: "Relational data management",
    },
    {
        name: "RBAC",
        icon: <MdOutlineSecurity />,
        color: "#FF5733",
        description: "Role-based security",
    },
];

const toolsItems: TechStackItem[] = [
    {
        name: "Github",
        icon: <SiGithub />,
        color: "#333333",
        description: "Version control hosting",
    },
    {
        name: "Git",
        icon: <FaGitAlt />,
        color: "#F05032",
        description: "Distributed version control",
    },
    {
        name: "Vscode",
        icon: <VscVscodeInsiders />,
        color: "#007ACC",
        description: "Primary development environment",
    },
    {
        name: "Render",
        icon: <SiRender />,
        color: "#46E3B7",
        description: "Cloud hosting platform",
    },
    {
        name: "Postman",
        icon: <SiPostman />,
        color: "#FF6C37",
        description: "API testing suite",
    },
    {
        name: "PgAdmin 4",
        icon: <BiLogoPostgresql />,
        color: "#336791",
        description: "Database administration tool",
    },
    {
        name: "Neon",
        icon: <AiFillDatabase />,
        color: "#44D62C",
        description: "Serverless cloud database",
    },
    {
        name: "Vite",
        icon: <SiVite />,
        color: "#646CFF",
        description: "Modern build tool",
    },
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