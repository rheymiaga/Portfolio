import { allProjects } from "./ProjectData";
import { ProjectCard } from "./ProjectCard";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { containerVariants, cardVariants } from "../../../animations/Variants";

export const ProjectsSection = () => {
    return (
        <section className="min-h-screen space-y-8" id="projects">
            <div className="flex flex-col items-center justify-center relative">
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-linear-to-b from-neutral-800 rounded via-transparent to-neutral-900/10 border-t-2 border-neutral-600" />
                    </div>
                    <h2 className="text-2xl md:text-[32px] font-semibold poppins text-white tracking-tight">
                        Projects
                    </h2>
                </motion.div>

                {/* Scroll button */}
                <button
                    className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("projects")?.scrollIntoView({
                            behavior: "smooth",
                        });
                    }}
                >
                    <IoIosArrowDown className="animate-bounce text-neutral-700 text-[24px]" />
                </button>
            </div>

            {/* Projects grid with staggered animation */}
            <motion.div
                className="flex flex-col gap-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <AnimatePresence>
                    {allProjects.map((project) => (
                        <motion.div
                            key={project.title}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};
