import { MdEmail } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useHoverOffset } from "../../../utils/HoverOffset/HoverOffset";
import { FadeIn } from "../../../utils/animations/FadeIn";
import { ScrollAnimate } from "../../../utils/animations/ScrollAnimate";
import { useScrollDirection } from "../../../utils/Hooks/useScrollHook";

export const Hero = () => {
    const { offset, handleMouseMove } = useHoverOffset();
    const direction = useScrollDirection();

    const handleScroll = (anchor: string) => {
        const id = anchor.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>

            <div
                className="p-4 min-h-screen verflow-hidden bg-[#FAF0E6] dark:bg-black/90 border-b dark:border-gray-700 border-white transition-all duration-500 ease-in-out">
                <FadeIn direction="up" duration={1} delay={0.5}>
                    <div className="flex items-center min-h-screen relative max-w-4xl mx-auto ">

                        <div className="absolute w-full transition-opacity duration-500 ease-in-out 
                            top-[20%] sm:top-[20%] left-1/2 -translate-x-1/2 ">

                            <div className="flex flex-col space-y-2 mx-2 sm:mx-3 lg:mx-4 md:space-y-3 w-full items-center">
                                <ScrollAnimate
                                    id="home"
                                    threshold={0.8}
                                    direction={direction}
                                    baseClass="flex flex-col transition-all transform font-Inter w-full ease-in-out duration-1000"
                                    activeClass="opacity-100"
                                    inactiveClass="opacity-0 blur-xs mask-radial-from-90% scale-90 -inset-4 -translate-y-1/2"
                                    activeUpClass="opacity-100 -translate-y-0"
                                    inactiveUpClass="opacity-0 -translate-y-6"
                                >
                                    <div className="flex flex-col overflow-hidden antialiased md:subpixel-antialiased font-Inter tracking-wide w-full
                                    ">
                                        <span className=" dark:text-amber-50 text-lg sm:text-xl md:text-2xl lg:text-3xl transition-all duration-300 ease-in-out">
                                            Hello, I'm
                                        </span>
                                        <span className="text-2xl dark:text-amber-50 md:text-3xl lg:text-4xl transition-all duration-300 ease-in-out text-nowrap ">
                                            Rhey Louie Miaga
                                        </span>
                                        <div className="text-xs sm:text-sm md:text-base tracking-wide mt-2 sm:mt-3 mask-radial-from-50% p-2 transition-all duration-300 dark:text-amber-50">
                                            A <span className="bg-gray-500/35 transition-colors duration-500 dark:bg-gray-600/90">second-year Bachelor of Science in Information Technology student </span> ,
                                            dedicated to developing modern, user-friendly digital solutions.
                                        </div>
                                    </div>
                                </ScrollAnimate>
                                <ScrollAnimate
                                    id="home"
                                    threshold={0.7}
                                    direction={direction}
                                    baseClass="flex flex-col font-Inter w-full transition-all transform ease-in-out duration-1000"
                                    activeClass="opacity-100"
                                    inactiveClass="opacity-0 blur-xs mask-radial-from-90% -inset-2 scale-80 translate-y-1/2"
                                    activeUpClass="opacity-100 -translate-y-0"
                                    inactiveUpClass="opacity-0 -translate-y-6"
                                >
                                    <div className="flex tracking-widest md:tracking-wide lg:tracking-widest md:justify-end antialiased items-center md:subpixel-antialiased font-semibold
                                  ease-in-out duration-700 text-end mask-radial-from-25% dark:text-amber-50 sm:text-lg md:text-xl lg:text-[20px]">
                                        <div className=" p-2">This portfolio is designed to be <span className=" underline decoration-sky-500">simple</span> yet <span className="underline decoration-amber-500">powerful</span> — seamless across devices, <span className="underline decoration-green-500">elegant</span> in every detail.</div>
                                    </div>
                                </ScrollAnimate>
                            </div>
                        </div>


                        <ScrollAnimate
                            id="home"
                            threshold={0.5}
                            direction={direction}
                            baseClass="flex font-Inter overflow-hidden w-full ease-in-out duration-1000 antialiased md:subpixel-antialiased absolute bottom-[33%] sm:-botttom-[30%] md:bottom-[32%] lg:bottom-[30%] left-1/2 -translate-x-[50%] items-center justify-center text-sm sm:text-lg md:xl space-x-6 md:space-x-10 lg:space-x-14 transition-all transform"
                            activeClass="opacity-100"
                            inactiveClass="opacity-0 blur-xs mask-radial-from-90%"
                            activeUpClass="opacity-100 -translate-y-0"
                            inactiveUpClass="opacity-0 -translate-y-6 scale-150"
                        >
                            <div className="relative inline-block">
                                <NavLink className="peer px-3 py-2 sm:py-2.5 sm:px-3.5 flex shrink-0 dark:text-amber-50 border-white dark:border-gray-700/80 hover:shadow-lg transition-all transform duration-300 hover:scale-101 border-2 rounded-tr-3xl rounded-lg" to="#projects" onClick={(e) => {
                                    e.preventDefault();
                                    handleScroll("#projects");
                                }}
                                    onMouseMove={handleMouseMove}
                                >
                                    <span className="truncate">View my works</span>
                                </NavLink>

                                <div className="w-64 h-80 p-2 hidden sm:inline absolute bg-amber-50 dark:bg-black dark:text-amber-50 border border-white dark:border-slate-800 right-full translate-x-2 -bottom-1/2 mt-2 rounded-2xl shadow-lg opacity-0 peer-hover:opacity-100 transition-transform duration-300 ease-out" style={{ transform: `translate(${offset.x}px, ${offset.y}px)`, }} >
                                    Hello world
                                </div>
                            </div>

                            <a href="mailto:mrheylouie@gmail.com"
                                className="px-3 py-2 sm:py-2.5 sm:px-3.5 flex shrink-0 dark:text-amber-50 transition-all duration-300 rounded-lg" >

                                <MdEmail />Email me
                            </a>
                        </ScrollAnimate>
                    </div >
                </FadeIn >
            </div >

        </>
    );
};
