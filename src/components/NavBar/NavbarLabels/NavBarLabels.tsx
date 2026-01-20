import { useState, useEffect } from "react";
import { NavLinks } from "../../../components/NavBar/NavLinks/NavLinks";

export const NavBarLabels = () => {
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.6 }
        );

        NavLinks.forEach((link) => {
            const id = link.anchor.replace("#", "");
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const activeLink = NavLinks.find(
        (link) => link.anchor.replace("#", "") === activeSection
    );

    return (
        <div className="fixed left-6 top-6 sm:top-8 sm:left-8 md:left-1/2 md:-translate-x-1/2 md:top-26 lg:left-18 lg:top-10 transform   
      px-4 py-2 rounded-full backdrop-blur-xl 
      bg-white/70 dark:bg-gray-900/60 
      border border-white/30 dark:border-gray-200/20 
      shadow-md transition-all duration-500 ease-in-out 
      flex items-center justify-center">
            {activeLink && (
                <div
                    key={activeLink.anchor}

                    className="flex items-center gap-2 text-sm font-medium 
            text-gray-800 dark:text-gray-100 
            transition-all duration-300 ease-in-out"
                >
                    {activeLink.icon}
                    {activeLink.label}
                </div>
            )}
        </div>
    );
};
