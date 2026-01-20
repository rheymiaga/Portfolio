import { NavLink } from "react-router-dom";
import { NavLinks } from "./NavLinks/NavLinks";
import { useState } from "react";


export const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleScroll = (anchor: string) => {
        const id = anchor.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
        setIsOpen(false);
    };

    return (
        <>
            <nav className="font-Poppins sm:ml-2 md:ml-4 font-medium flex items-center space-x-2 transition-colors duration-500 ease-in-out">

                {/*Desktop navbar */}
                {NavLinks.map((link) => (
                    <NavLink
                        key={link.anchor}
                        to={link.anchor}
                        onClick={(e) => {
                            e.preventDefault();
                            handleScroll(link.anchor);
                        }}
                        className={`hidden md:flex items-center `}
                    >
                        <div className="group p-2 rounded-2xl flex justify-center w-full transition-all duration-300 ease-in-out dark:text-amber-50 hover:scale-105">
                            <span className="group-hover:rotate-12 transition-transform duration-300 ease-in-out">{link.icon}</span>
                            <span className=" group-hover:opacity-80 transition-all duration-300 ease-in-out">{link.label}</span>
                        </div>

                    </NavLink>
                ))}
                {/*Mobile navbar */}

                <div className={`absolute  md:hidden top-14 sm:top-16 z-10 p-2 transform transition-all duration-500 ease-in-out
                 ${isOpen ? '-left-4 sm:-left-5 opacity-100' : 'opacity-0 left-32'}`} >
                    <div className="flex flex-col space-y-2">
                        {NavLinks.map((link) => (
                            <NavLink
                                key={link.anchor}
                                to={link.anchor}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleScroll(link.anchor);
                                }}
                                className={`inline md:hidden backdrop-blur-xs items-center rounded-l-lg`}
                            >
                                <div className="relative flex p-2 rounded-l-lg z-10 bg-linear-to-r from-white transform transition-all duration-500 dark:from-slate-700 to-transparent">
                                    <div className={`absolute bottom-1 -right-3 transform transition-all duration-1000 h-0.5 ${isOpen ? 'w-full opacity-90' : 'w-0 opacity-0'} from-white bg-linear-to-r dark:from-slate-100`}></div>
                                    <span className="text-gray-800 dark:text-blue-100">
                                        {link.icon}
                                    </span>
                                    <span className="text-gray-900 dark:text-blue-100">
                                        {link.label}
                                    </span>
                                </div>

                            </NavLink>

                        ))}
                    </div>
                </div>
                <div
                    className="items-center relative flex shrink-0 md:hidden">

                    <button
                        className={`transition-all p-3 flex shrink-0 rounded-xl relative dark:bg-linear-to-r bg-[#FAF0E6]/80 drop-shadow-sm dark:from-blue-600/15
                     dark:to-cyan-500/30 overflow-hidden dark:bg-amber-900/15 backdrop-blur-xl border-2 border-white dark:border-gray-50/80 
                     items-center justify-center dark:text-amber-50 transform ${isOpen ? 'shadow-md scale-100 dark:shadow-gray-800/80' : 'shadow-none scale-95'}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div className="space-y-2 relative">
                            <span
                                className={`block w-6 h-0.5 bg-current transition-all ${isOpen ? "-rotate-45 translate-y-2.5" : ""
                                    }`}
                            />
                            <span
                                className={`block w-6 h-0.5 bg-current transition-all ${isOpen ? "opacity-0" : ""
                                    }`}
                            />
                            <span
                                className={`block w-6 h-0.5 bg-current transition-all ${isOpen ? "rotate-45 -translate-y-1.75" : ""
                                    }`}
                            />

                        </div>


                    </button>


                </div>
            </nav >
        </>
    );
};
