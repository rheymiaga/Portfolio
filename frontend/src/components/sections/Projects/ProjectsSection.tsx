import { allProjects } from "./ProjectData";
import { ProjectCard } from "./ProjectCard";
import { AnimatePresence } from "framer-motion";

export const ProjectsSection = () => {
    return (
        <section className="min-h-screen px-3 py-16 space-y-8">
            <h1 className="text-transparent text-2xl md:text-[32px] font-bold bg-linear-to-r from-slate-400 via-slate-200 to-slate-300 brightness-110 bg-clip-text cinzel">
                Projects
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AnimatePresence>
                    {allProjects.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
};
