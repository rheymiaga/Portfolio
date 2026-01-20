import { NavBar } from "../NavBar/NavBar"
import { ThemeToggle } from "../../ThemeToggle/ThemeToggle"
import { NavBarLabels } from "../NavBar/NavbarLabels/NavBarLabels"

export const Header = () => {

    return (
        <>
            <div className="relative z-50">
                <NavBarLabels />
            </div>
            <div className="fixed z-50 top-0 md:left-1/2 overflow-hidden transform transition-all duration-500 ease-in md:-translate-x-1/2 w-full flex items-center justify-end md:max-w-2xl px-3 py-4 sm:py-5 md:py-6">
                {/*Desktop Header*/}
                <header className="hidden md:flex dark:bg-linear-to-r bg-[#FAF0E6]/80 drop-shadow-sm dark:from-blue-600/15 dark:to-cyan-500/30 overflow-hidden dark:bg-amber-900/15 backdrop-blur-xl border-2 border-white dark:border-gray-50/80 rounded-3xl items-center justify-center w-full ">
                    <div className="flex items-center gap-2 p-2 sm:p-3 justify-between w-full rounded-2xl navbar-scroll overflow-x-auto overflow-y-hidden">

                        <div className="flex items-center gap-2 mx-auto md:w-full md:justify-between transition-all duration-300 ease-in-out">
                            <NavBar />
                            <ThemeToggle />
                        </div>

                    </div>

                </header>
                {/*Desktop Header*/}
                <header className="flex md:hidden gap-2 justify-center items-center relative">
                    <ThemeToggle />
                    <NavBar />

                </header >


            </div >
        </>
    )
}