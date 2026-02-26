import { ProjectsSection } from "../components/sections/Projects/ProjectsSection"
import { HeroSection } from "../components/sections/Hero/HeroSection"
import { TechStackSection } from "../components/sections/TechStack/TechStackSection"
import { AboutSection } from "../components/sections/About/AboutSection"


export const Portfolio = () => {
    return (
        <div className="flex flex-col max-w-4xl mx-auto gap-16 py-20 px-3">
            <HeroSection />
            <ProjectsSection />
            <TechStackSection />
            <AboutSection />
        </div>
    )
}

