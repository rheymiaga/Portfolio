import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Scotch from '../../../assets/images/SccotchPixelated.png';
import {
    heroVariants,
    cardVariants,
    sectionVariants,
} from '../../../animations/Variants';
import { FaReact, FaRegWindowMaximize, FaRegWindowRestore } from 'react-icons/fa6';
import { IoPlayOutline, IoSearchOutline } from 'react-icons/io5';
import { tabContent } from './AboutData';
import { FaCoffee } from 'react-icons/fa';

export const AboutSection = () => {
    const [activeTab, setActiveTab] = useState("AboutSection.tsx");
    const [output, setOutput] = useState<React.ReactNode | null>(null);
    const [minimized, setMinimized] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;
            const bg = document.getElementById('scotch-bg');
            if (bg) {
                bg.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleRunCode = () => {
        switch (activeTab) {
            case "AboutSection.tsx":
                setOutput(
                    <div className="flex flex-col gap-1">
                        <div className=" flex w-full items-center">
                            <span>Extra Notes</span>
                        </div>
                        <div className=" flex w-full items-center">
                            <span>Recently, I've been:</span>
                        </div>
                        <div className=" flex w-full items-center gap-2">
                            <FaCoffee className="shrink-0 text-brown-500" />
                            <span>Drinking 3+ coffees a day on average</span>
                        </div>
                    </div>
                );
                break;
            case "Info.tsx":
                setOutput(".... \n ....");
                break;
            case "Hobbies.tsx":
                setOutput(".... \n .... \n ....");
                break;
            default:
                setOutput("No output available.");
        }
    };

    return (
        <motion.section
            className="relative min-h-screen flex items-center justify-center bg-neutral-950 text-slate-100 overflow-hidden"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            exit="exit"
        >
            <motion.div
                id="scotch-bg"
                className="absolute inset-0 bg-cover bg-center will-change-transform transition-transform duration-500 ease-out opacity-10"
                style={{ backgroundImage: `url(${Scotch})` }}
                variants={heroVariants}
            />

            <motion.div
                className={`relative z-10 bg-neutral-800 rounded-lg shadow-2xl border border-neutral-700 overflow-hidden font-mono
          ${minimized ? "w-32 h-24 sm:w-48 sm:h-32" : "w-[90%] sm:w-[80%] md:w-[50%] h-60 md:h-76"}`}
                whileHover={{ rotateY: 6, rotateX: -3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                variants={cardVariants}
                drag
                dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                dragElastic={0.2}
                dragMomentum={false}
            >
                {/* Title bar */}
                <div className="flex items-center justify-between bg-neutral-900 px-3 py-2 text-xs border-b border-neutral-700 text-slate-300">
                    <div className="flex gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span
                            onClick={() => setMinimized(!minimized)}
                            className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"
                            title={minimized ? "Restore" : "Minimize"}
                        ></span>
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    </div>
                    <h1 className={`font-bold px-4 sm:px-8 py-1 ${minimized ? "hidden" : "flex"} bg-neutral-800 rounded-lg border border-neutral-700  items-center gap-1`}>
                        <IoSearchOutline /> About Me
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="italic hidden sm:inline">VS Code</span>
                        <button
                            onClick={() => setMinimized(!minimized)}
                            className="p-2 hover:bg-neutral-700 rounded"
                            title={minimized ? "Restore" : "Minimize"}
                        >
                            {minimized ? <FaRegWindowMaximize /> : <FaRegWindowRestore />}
                        </button>
                    </div>
                </div>

                {!minimized && (
                    <>
                        <div className="flex items-center bg-neutral-900 text-xs overflow-x-auto text-slate-300 border-b border-neutral-700">
                            {Object.keys(tabContent).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-3 py-2 gap-1 transition-colors flex items-center ${activeTab === tab
                                        ? "bg-neutral-800 text-neutral-100 border-t border-blue-500 border-b-0"
                                        : "hover:bg-neutral-700 text-neutral-400 border-r border-b border-neutral-700"
                                        }`}
                                >
                                    <FaReact className="text-cyan-400" /> {tab}
                                </button>
                            ))}
                            <button
                                onClick={handleRunCode}
                                className="sticky right-0 top-0 shrink-0 p-2.5 bg-neutral-900 hover:bg-neutral-600 ml-auto"
                            >

                                <IoPlayOutline />
                            </button>
                        </div>

                        <div className="p-4 text-xs sm:text-sm bg-neutral-800 leading-relaxed overflow-auto h-40 md:h-56 relative">
                            {tabContent[activeTab]}
                            {output && (
                                <div className="fixed bottom-0 w-full left-0 bg-black text-green-400 font-mono text-sm h-28 border-t border-neutral-700">
                                    <div className="flex justify-between items-center bg-neutral-900 px-2 py-1 text-xs text-slate-300 border-b border-neutral-700">
                                        <span>Terminal</span>
                                        <button
                                            onClick={() => setOutput(null)}
                                            className="text-red-400 hover:text-red-600 font-bold px-2"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    <div className="p-2 overflow-y-auto h-20 ">
                                        <span>C:\Portfolio\{activeTab}</span>
                                        {output}
                                        <span className="animate-pulse">...|</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </motion.div>
        </motion.section>
    );
};