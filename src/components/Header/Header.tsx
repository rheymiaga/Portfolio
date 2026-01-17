import { BiCodeCurly, } from "react-icons/bi"
import { NavBar } from "../NavBar/NavBar"

export const Header = () => {
    // ⟩⟨
    return (
        <header className="bg-black overflow-hidden relative">

            <div className="flex relative items-center justify-between w-full px-4 py-2 sm:px-10 md:py-6 transition-all duration-300 bg-linear-to-tl from-transparent via-gray-900/60 to-transparent">
                <BiCodeCurly className="text-purple-300/20 animate-pulse duration-500 text-7xl sm:text-8xl lg:text-9xl rotate-90 absolute -left-8 sm:-left-11 lg:-left-16" />
                <BiCodeCurly className="text-purple-300/20 animate-pulse duration-500 text-7xl sm:text-8xl lg:text-9xl rotate-90 absolute -right-8 sm:-right-11 lg:-right-16" />
                <div className="flex items-center relative group">
                    <div className="absolute -inset-4 bg-purple-300/20 opacity-0
                    group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-xl"></div>
                    <h1 className="ml-4 md:ml-8 hidden md:inline transition-all duration-300 text-2xl sm:text-3xl md:text-4xl text-white
                    font-serif text-shadow-lg text-shadow-black truncate text-nowrap">Rhey Louie Miaga
                    </h1>
                    
                </div>
                <NavBar />
            </div>
        </header>
    )
}