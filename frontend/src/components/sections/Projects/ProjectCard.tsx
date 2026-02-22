import { useState } from "react";
import { motion } from "framer-motion";
import { projectView, projectLinks } from "./ProjectData";
import type { ProjectCardProps, ShownImage } from "./ProjectData";
import { AiFillProject } from "react-icons/ai";
import { cardVariants } from "../../../animations/Variants";

export const ProjectCard = ({ project }: { project: ProjectCardProps }) => {
    const [shownProject, setShownProject] = useState<ShownImage>("allImages");

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.2 }}
            className="bg-white/10 rounded-lg relative overflow-hidden"
        >
            {/* Image Section */}
            <div className="flex mask-bottom overflow-hidden h-96 hover:scale-105 transition-all duration-300 justify-center rounded-lg p-2 gap-2">
                <img loading="lazy"
                    className={`${shownProject === "mobileImage"
                        ? "opacity-100 scale-100 absolute top-0 right-1/2 translate-x-1/2 h-96 z-0"
                        : "opacity-0 scale-80 -z-10"
                        } ${shownProject === "allImages" ? "opacity-100 scale-100 z-0" : "scale-80 opacity-0"}
            transition-all duration-500 transform rounded-lg flex shrink-0`}
                    src={project.mobileImg}
                    alt={project.title}
                />
                <div className="flex flex-col gap-2">
                    <img loading="lazy"
                        className={`flex-1 flex shrink-0 h-48 transition-all duration-500 transform rounded-lg ${shownProject === "desktopImage"
                            ? "opacity-100 scale-100 absolute object-contain top-0 left-1/2 -translate-x-1/2 h-96 z-0"
                            : "opacity-0 scale-80 -z-10"
                            } ${shownProject === "allImages" ? "opacity-100 scale-100 z-0" : "scale-80 opacity-0"}`}
                        src={project.desktopImg}
                        alt={project.title}
                    />
                    <div
                        className={`flex-1 bg-black/80 transition-all duration-500 transform rounded-lg ${shownProject === "usedTechStack"
                            ? "max-w-xl w-full opacity-100 scale-100 absolute top-0 left-1/2 -translate-x-1/2 h-full max-h-96 z-0"
                            : "opacity-0 scale-80 -z-10"
                            } text-white p-2 ${shownProject === "allImages" ? "opacity-100 scale-100 z-0" : "scale-80 opacity-0"}`}
                    >
                        Tech stack info here
                    </div>
                </div>
            </div>

            {/* Toggle Buttons */}
            <div className="flex gap-8 absolute bottom-1/7 w-full items-center justify-center">
                {projectView.map((pv) => (
                    <button
                        onClick={() => setShownProject(pv.view)}
                        key={pv.view}
                        className="group hover:animate-pulse hover:text-white/60 text-white/40 relative rounded-lg hover:scale-105 transition-all duration-300 transform overflow-hidden hover:backdrop-blur-xs text-2xl"
                    >
                        <div className="h-full w-0 group-hover:w-full transition-all duration-500 transform -z-10 absolute -right-5 group-hover:-translate-x-40 top-0 bg-white/40 blur-sm"></div>
                        <div
                            className={`p-2 ${shownProject === pv.view ? "bg-white/10 text-white" : "hover:bg-white/10"}`}
                        >
                            {pv.icon}
                        </div>
                    </button>
                ))}
            </div>

            {/* Links */}
            <div className="flex items-center poppins text-white justify-between py-2 px-4">
                <span className="font-semibold cinzel flex items-center truncate">
                    <AiFillProject className="flex shrink-0" /> {project.projcategory}
                </span>
                <div className="flex gap-2">
                    {projectLinks.map((pl) => (
                        <a
                            key={pl.name}
                            href={pl.name === "Github" ? project.repoLink : project.pageLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex relative group overflow-hidden items-center px-4 py-2 hover:bg-white/10 rounded-lg transition-all duration-300"
                        >
                            <div className="h-full w-0 group-hover:w-full transition-all duration-500 transform -z-10 absolute -right-5 group-hover:-translate-x-40 top-0 bg-white/40 blur-sm"></div>
                            <p>{pl.icon}</p>
                            <p>{pl.name}</p>
                        </a>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};
