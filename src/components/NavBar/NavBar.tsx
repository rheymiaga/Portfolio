import { NavLink } from "react-router-dom"
import { NavBarTemplate } from "./NavBarTemplate/NavBarTemplate"
import { useState } from "react"
import { DiCode } from "react-icons/di"
import { FaCode } from "react-icons/fa"

export const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="p-4">

            {/*Desktop NavBar*/}
            <ul className="md:flex items-center gap-3 hidden">
                {NavBarTemplate.map((link) => (
                    <NavLink
                        key={link.anchor}
                        to={link.anchor}
                        className={({ isActive }) =>
                            `group relative flex items-center text-lg md:text-2xl 
               text-amber-100 transition-all duration-300 scroll-smooth
               ${isActive
                                ? "scale-105 brightness-105"
                                : "hover:scale-105 hover:brightness-105"
                            }`
                        }
                    >
                        <button className="items-center flex rounded-2xl p-3">
                            <span className="mr-2 text-lg sm:text-xl md:text-2xl lg:text-3xl transition-transform duration-300 group-hover:rotate-15">
                                {link.icon}
                            </span>
                            <span className="text-lg md:text-xl lg:text-2xl relative transition-all duration-300 group-hover:scale-105 group-hover:brightness-110">
                                {link.label}

                                <span
                                    className="absolute -bottom-1 left-0 h-0.5 w-0 bg-linear-to-r from-transparent via-purple-300 to-transparent 
                           transition-all duration-300 opacity-0 group-hover:w-full group-hover:opacity-100"
                                />
                            </span>
                        </button>
                    </NavLink>
                ))}
            </ul>
            {/*Mobile NavBar*/}
            <div className="flex md:hidden items-center overflow-x-scroll">

                <h1 className={`md:hidden absolute left-1/6 text-xl sm:text-2xl transition-all duration-300  text-white
                    font-serif text-shadow-lg text-shadow-black ${isOpen ? 'opacity-0' : 'opacity-100'}`}>Rhey Louie Miaga
                </h1>
                <span className={`w-0 h-0.5 bottom-1/4 animate-pulse right-0 absolute bg-linear-to-l from-transparent via-lime-300 to-purple-300 transition-all duration-700 ${isOpen ? 'w-xs' : 'w-0'}`}></span>

                <button
                    className="text-purple-500 hover:text-purple-300 flex items-center focus:outline-none transition-all p-2
                     rounded-xl border-slate-900/30 hover:border-slate-600/50 relative backdrop-blur-xl shadow-md shadow-purple-900/20 hover:shadow-lg hover:shadow-purple-500/30"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="space-y-2 relative ">
                        <span
                            className={`block w-6 h-0.5 bg-linear-to-r transition-all duration-700 ${isOpen ? "-rotate-45 translate-y-0 from-transparent via-purple-400 to-transparent w-6" : "from-slate-400 via-gray-200 to-purple-200 w-0"}`} />
                        <span
                            className={`block w-6 h-0.5 bg-slate-400 bg-linear-to-r transition-al duration-300 ${isOpen ? "opacity-0" : "from-slate-400 via-gray-200 to-purple-200"}`} />
                        <span
                            className={`block w-6 h-0.5 bg-linear-to-r transition-all duration-700 ${isOpen ? "rotate-45 -translate-y-1 from-transparent via-purple-400 to-transparent w-6" : "from-slate-400 via-gray-200 to-purple-200 w-0"}`} />

                    </div>


                </button>
                {
                    isOpen && (
                        <ul className="flex items-center space-x-2 md:hidden relative transition-all duration-500">

                            {NavBarTemplate.map((link) => (
                                <NavLink
                                    key={link.anchor}
                                    to={link.anchor}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) => `p-2 rounded-2xl scroll-smooth relative items-center transition-all
                                     duration-300 ${isActive ? 'brightness-105' : 'brightness-100'}`}
                                >

                                    <span className="text-amber-100 flex relative rounded-2xl text-shadow-black text-shadow-sm ">
                                        {link.icon}
                                        {link.label}
                                        <div className="absolute -inset-2 bg-purple-300/10 rounded-full blur-sm"></div>
                                    </span>
                                </NavLink>
                            ))}
                        </ul>
                    )
                }

            </div >
        </nav >
    )
}
