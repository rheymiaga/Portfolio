import { useState } from "react";
import { motion } from "framer-motion";
import { projectView, projectLinks } from "./ProjectData";
import type { ProjectCardProps, ShownImage } from "./ProjectData";
import { AiFillProject } from "react-icons/ai";
import { cardVariants } from "../../../animations/Variants";
import { IconGrid, SectionHeader } from "./ProjectDetailsStyle";

export const ProjectCard = ({ project }: { project: ProjectCardProps }) => {
    const [shownProject, setShownProject] = useState<ShownImage>("allImages");

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.2 }}
            className="rounded-lg shadow-[1px_1px_8px] p-0.5 bg-linear-to-r from-neutral-700 via-neutral-400 to-neutral-700 ">
            <div className="border bg-neutral-800 brightness-110  relative rounded-lg overflow-hidden border-neutral-600">
                <div className="flex mask-bottom overflow-hidden h-72 sm:h-108 md:h-144 hover:scale-102 transition-all duration-300 justify-center rounded-lg p-2 gap-2">
                    {project.mobileVid && shownProject === "mobileImage" ? (
                        <video
                            src={project.mobileVid}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="opacity-100 scale-100 absolute top-0 right-1/2 translate-x-1/2 h-72 sm:h-108 md:h-144 z-0 rounded-lg"
                        />
                    ) : (
                        <img
                            loading="lazy"
                            className={`${shownProject === "mobileImage"
                                ? "opacity-100 scale-100 absolute top-0 right-1/2 translate-x-1/2 h-72 sm:h-108 md:h-144 z-0"
                                : "opacity-0 scale-80 -z-10"} 
                            ${shownProject === "allImages" ? "opacity-100 scale-100 z-0" : "scale-80 opacity-0"} 
                            transition-all duration-500 transform rounded-lg flex shrink-0`}
                            src={project.mobileImg}
                            alt={project.title + " mobile preview"}
                        />
                    )}

                    <div className="flex flex-col gap-2">
                        {project.desktopVid && shownProject === "desktopImage" ? (

                            <video
                                src={project.desktopVid}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="flex-1 flex shrink-0 transition-all duration-500 transform rounded-lg opacity-100 scale-100 absolute object-contain top-0 left-1/2 -translate-x-1/2 h-72 sm:h-108 md:h-144 z-0"
                            />
                        ) : (
                            <img
                                loading="lazy"
                                className={`flex-1 flex shrink-0 h-48 transition-all duration-500 transform rounded-lg ${shownProject === "desktopImage"
                                    ? "opacity-100 scale-100 absolute object-contain top-0 left-1/2 -translate-x-1/2 h-72 sm:h-108 md:h-144 z-0"
                                    : "opacity-0 scale-80 -z-10"} 
                                ${shownProject === "allImages" ? "opacity-100 scale-100 z-0" : "scale-80 opacity-0"}`}
                                src={project.desktopImg}
                                alt={project.title + " desktop preview"}
                            />
                        )}


                        <div
                            className={`flex-1 space-y-6 overflow-y-scroll rounded-lg border max-w-lg border-neutral-800/50 backdrop-blur-xl transition-all duration-700 ease-in-out 
                            ${shownProject === "usedTechStack"
                                    ? "max-w-xl w-full py-10 opacity-100 scale-100 absolute top-0 left-1/2 -translate-x-1/2 h-72 sm:h-108 md:h-144 z-10 bg-neutral-900/80"
                                    : "opacity-0 scale-95 -z-10 bg-neutral-900/40"} 
                                ${shownProject === "allImages" ? "opacity-100 scale-100 z-0 pb-4" : "scale-80 opacity-0 pb-20"} text-white p-4`}>
                            <div
                                className={`poppins flex flex-wrap gap-2 items-center justify-between transition-all duration-500 ease-in-out 
                                ${shownProject === "usedTechStack"
                                        ? "text-base font-semibold border-b border-white/10 pb-4 mb-4 tracking-wide"
                                        : "text-sm font-medium opacity-60 mb-2"}`}
                            >
                                <h1 className="truncate">{project.title}</h1>

                                {project.teamType && (
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap 
                                        ${project.teamType === "Solo"
                                                ? "bg-neutral-700 text-white"
                                                : "bg-blue-600 text-white"}`}
                                    >
                                        {project.teamType} Project
                                    </span>
                                )}
                            </div>

                            <p
                                className={`poppins transition-all duration-500 ease-in-out 
                                ${shownProject === "usedTechStack" ? "opacity-90 text-base" : "opacity-60 text-xs"}`}>
                                {project.description}
                            </p>

                            <SectionHeader shown={shownProject === "usedTechStack"}>Built with</SectionHeader>
                            <IconGrid
                                icons={project.icons}
                                names={project.iconsName}
                                colors={project.iconsColor}
                                shown={shownProject === "usedTechStack"}
                            />

                            <SectionHeader shown={shownProject === "usedTechStack"}>Hosted with</SectionHeader>
                            <IconGrid
                                icons={project.hostedIcons}
                                names={project.hostedNames}
                                colors={project.hostedColors}
                                shown={shownProject === "usedTechStack"}
                            />
                        </div>
                    </div>
                </div>

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

                <div className="flex text-base items-center poppins text-white justify-between py-2 px-4">
                    <span className="font-semibold cinzel flex items-center truncate">
                        <AiFillProject className="flex shrink-0" />
                        {project.projcategory}
                    </span>
                    <div className="flex gap-2">
                        {projectLinks.map((pl) => (
                            <a
                                key={pl.name}
                                href={pl.name === "Code" ? project.repoLink : project.pageLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex relative group overflow-hidden items-center px-4 py-2 hover:bg-white/10 rounded-lg transition-all duration-300"
                            >
                                <div className="h-full w-0 group-hover:w-full transition-all duration-500 transform -z-10 absolute -right-5 group-hover:-translate-x-40 top-0 bg-white/40 blur-sm"></div>
                                <span>{pl.icon}</span>
                                <p>{pl.name}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div >
    );
};
