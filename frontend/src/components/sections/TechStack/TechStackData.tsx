import { BiLogoPostgresql, BiLogoTypescript } from "react-icons/bi";
import { FaNode, FaReact } from "react-icons/fa6";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiExpress, SiGithub, SiNextdotjs, SiPostman, SiPrisma, SiRender, SiSupabase, SiVercel, SiVite } from "react-icons/si";
import { VscVscodeInsiders } from "react-icons/vsc";
import { FaGitAlt } from "react-icons/fa";
import { AiFillDatabase } from "react-icons/ai";
import { SiFramer, } from "react-icons/si";

interface TechStackItem {
    name: string;
    icon: React.ReactNode;
    color: string;
    description: string;
}
interface TechStackCategory {
    category: string;
    description: string
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
        name: "Next.js",
        icon: <SiNextdotjs />,
        color: "#000000",
        description: "Production-grade React framework & SSR architecture",
    },
    {
        name: "TypeScript",
        icon: <BiLogoTypescript />,
        color: "#3178C6",
        description: "Static type safety",
    },
    {
        name: "Tailwind CSS",
        icon: <RiTailwindCssFill />,
        color: "#38B2AC",
        description: "Utility-first styling",
    },
    {
        name: "Framer Motion",
        icon: <SiFramer />,
        color: "#E11D48",
        description: "Interactive 3D animations",
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
        name: "Express.js",
        icon: <SiExpress />,
        color: "#000000",
        description: "Server-side framework",
    },
    {
        name: "PostgreSQL",
        icon: <BiLogoPostgresql />,
        color: "#47808F",
        description: "Relational data management",
    },
    {
        name: "Prisma",
        icon: <SiPrisma />,
        color: "#2D3748",
        description: "Next-gen Type-safe ORM & Automated Migrations",
    },
    {
        name: "TypeScript",
        icon: <BiLogoTypescript />,
        color: "#3178C6",
        description: "Robust backend logic",
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
        name: "Supabase",
        icon: <SiSupabase />,
        color: "#3ECF8E",
        description: "Open-source Firebase alternative with PostgreSQL power",
    },
    {
        name: "Vercel",
        icon: <SiVercel />,
        color: "#000000",
        description: "Cloud orchestration, CI/CD, and Edge deployments",
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
        category: "Mastery",
        description: "My primary powerhouse stack for building scalable applications.",
        items: [
            ...frontendItems.filter(i =>
                ["React", "TypeScript", "Tailwind CSS", "Framer Motion"].includes(i.name)
            ),
            ...backendItems.filter(i =>
                ["Node.js", "Express.js", "PostgreSQL", "Helmet"].includes(i.name)
            ),
        ],
    },
    {
        category: "All",
        description: "A comprehensive index of the technologies and libraries I have worked with across various projects.",
        items: [
            ...frontendItems,
            ...backendItems.filter(item => item.name !== 'TypeScript'),
            ...toolsItems
        ],
    },
    {
        category: "Backend",
        description: "Server-side architecture and security-first development.",
        items: backendItems,
    },

    {
        category: "Frontend",
        description: "Client-side technologies focused on performance and UX.",
        items: frontendItems,
    },
    {
        category: "Tools & Platforms",
        description: "The ecosystem that powers my development workflow.",
        items: toolsItems,
    },
]