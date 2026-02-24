import { allProjects } from "./ProjectData";
import { ProjectCard } from "./ProjectCard";
import { AnimatePresence } from "framer-motion";

export const ProjectsSection = () => {
    return (
        <section className="min-h-screen px-3 py-16 space-y-8">
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
