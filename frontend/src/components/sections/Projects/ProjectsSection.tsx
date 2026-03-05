import { allProjects } from "./ProjectData";
import { ProjectCard } from "./ProjectCard";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { cardVariants } from "../../../animations/Variants";

export const ProjectsSection = () => {
    return (
        <section className="min-h-screen space-y-8"
            id="projects">
            <div className="flex flex-col items-center justify-center relative">

                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 1, ease: [0.25, 0.8, 0.25, 1] }}
                    style={{ originX: 0.5 }}
                >
                    <div className="absolute inset-0 bg-linear-to-b from-neutral-800 via-transparent to-neutral-900/10 border-t-2 border-neutral-600 rounded" />
                </motion.div>


                <motion.h2
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    className="text-2xl md:text-[32px] font-semibold poppins text-neutral-200 tracking-tight"
                >
                    Projects
                </motion.h2>

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

            <div className="flex flex-col gap-16">
                <AnimatePresence>
                    {allProjects.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
};
