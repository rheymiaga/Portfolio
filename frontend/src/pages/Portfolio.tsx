import { ProjectsSection } from "../components/sections/Projects/ProjectsSection"
import { HeroSection } from "../components/sections/Hero/HeroSection"
import { TechStackSection } from "../components/sections/TechStack/TechStackSection"
import { AboutSection } from "../components/sections/About/AboutSection"
import { Footer } from "../components/ui/Footer"
import { ReiBot } from "../components/chatbot/ReiBot"

interface User {
    id: number;
    email: string;
    role: string
}

interface PortfolioProps {
    user: User | null;
    error?: string;
}


export const Portfolio = ({ user, error }: PortfolioProps) => {

    return (

        <>
            <ReiBot />
            <div className="flex flex-col max-w-4xl mx-auto gap-16 py-20 px-3 overflow-hidden">
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <HeroSection />
                <ProjectsSection />
                <TechStackSection />
                <AboutSection />

                {user && (
                    <div className="text-center">
                        <a href="/admin" className="text-blue-500 underline text-sm">
                            Go to Admin
                        </a>
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}

