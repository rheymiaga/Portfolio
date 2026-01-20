// features/PortFolioSections.tsx
import { ScrollWatcher } from "../utils/ScrollWatcher/ScrollWatcher";
import { About } from "./PortfolioSections/About/About";
import { Experience } from "./PortfolioSections/Experience/Experience";
import { Hero } from "./PortfolioSections/Hero/Hero";
import { Projects } from "./PortfolioSections/Projects/Projects";

export const PortFolioSections = () => {
    return (
        <ScrollWatcher
            onEnter={(id) => {
                switch (id) {
                    case "home":
                        console.log("Play Home animation");
                        break;
                    case "projects":
                        console.log("Play Projects animation");
                        break;
                    case "experience":
                        console.log("Play Experience animation");
                        break;
                    case "about":
                        console.log("Play About animation");
                        break;
                    default:
                        break;
                }
            }}
            onLeave={(id) => {
                console.log(`Leaving section: ${id}`);
            }}
        >
            <section id="home">
                <Hero />
            </section>
            <section id="projects">
                <Projects />
            </section>
            <section id="experience">
                <Experience />
            </section>
            <section id="about">
                <About />
            </section>
        </ScrollWatcher>
    );
};
