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
            <div className="fixed top-0 left-0 w-full z-9999 overflow-hidden">
                <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md border-b border-white/5" />
                <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-neutral-500/50 to-transparent" />
                <div className="relative flex items-center justify-center gap-3 py-2.5 px-4">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-500"></span>
                    </span>

                    <h3 className="text-[10px] md:text-xs text-neutral-300 poppins font-medium tracking-[0.2em] uppercase">
                        Update in Progress <span className="text-neutral-500 mx-1">•</span> coming soon
                    </h3>
                </div>
            </div>
            <ReiBot />
            <div className="flex flex-col max-w-4xl mx-auto gap-16 py-20 px-3 overflow-hidden">
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <HeroSection />
                <ProjectsSection />
                <TechStackSection />
                <AboutSection />

                {user && (
                    <div className="fixed top-4 right-4 z-50">
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

