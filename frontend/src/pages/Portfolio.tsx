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
                    <div className="absolute top-4 right-4 z-50">
                        <a
                            href="/admin"
                            className="group flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-xl"
                        >
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[10px] uppercase tracking-widest text-neutral-300 font-bold poppins">
                                Admin Panel
                            </span>
                        </a>
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}

