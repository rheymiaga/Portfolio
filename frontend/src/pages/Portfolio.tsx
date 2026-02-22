import { ProjectsSection } from "../components/sections/Projects/ProjectsSection"
import { HeroSection } from "../components/sections/Hero/HeroSection"


export const Portfolio = () => {
    return (
        <div className=" w-full max-w-6xl mx-auto">
            <HeroSection />
            <ProjectsSection />
        </div>
    )
}

