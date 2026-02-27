import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Scotch from '../../../assets/images/SccotchPixelated.png';
import {
    heroVariants,
    cardVariants,
    sectionVariants,
} from '../../../animations/Variants';
import { FaReact } from 'react-icons/fa6';
import { IoPlayOutline, IoSearchOutline } from 'react-icons/io5';
import { tabContent } from './AboutData';

export const AboutSection = () => {
    const [activeTab, setActiveTab] = useState("AboutSection.tsx");
    const [output, setOutput] = useState<string | null>(null);

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
                    "..... \n .....",

                );
                break;
            case "WhatILike.tsx":
                setOutput(".... \n ....");
                break;
            case "Info.tsx":
                setOutput(".... \n ....");
                break;
            case "Hobbies.tsx":
                setOutput(
                    ".... \n .... \n ...."
                );
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
            ></motion.div>

            <motion.div
                className="relative z-10 w-[95%] sm:w-[80%] md:w-[55%] bg-slate-800 rounded-lg shadow-2xl border border-neutral-700 overflow-hidden font-mono"
                whileHover={{ rotateY: 6, rotateX: -3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                variants={cardVariants}
                drag
                dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                dragElastic={0.2}
                dragMomentum={false}
            >
                <div className="flex items-center justify-between bg-neutral-900 px-3 py-2 text-xs border-b border-neutral-700 text-slate-300 cursor-grab active:cursor-grabbing">
                    <div className="flex gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    </div>
                    <h1 className="font-bold px-8 py-1 bg-neutral-800 rounded-lg border border-neutral-700 flex items-center gap-1">
                        <IoSearchOutline /> About Me
                    </h1>
                    <span className="italic">VS Code</span>
                </div>

                <div className="flex items-center bg-neutral-900 text-xs text-slate-300 border-b border-neutral-700">
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
                    <div className="relative group">
                        <button
                            onClick={handleRunCode}
                            className="flex shrink-0 p-2.5 bg-neutral-900 hover:bg-neutral-600"
                        >
                            <IoPlayOutline />
                        </button>
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 
                  hidden group-hover:flex items-center 
                  bg-neutral-800 text-slate-200 text-xs px-2 py-1 rounded shadow-lg">
                            Run Code
                        </div>
                    </div>
                </div>

                <div className="p-4 text-xs sm:text-sm bg-neutral-800 leading-relaxed overflow-x-auto h-48 md:h-64">
                    {tabContent[activeTab]}
                    <div className='absolute bottom-0 w-full left-0'>
                        {output && (
                            <div className="bg-black text-green-400 font-mono text-sm h-32 overflow-y-auto border-t border-neutral-700">
                                <div className="flex justify-between items-center bg-neutral-900 px-2 py-1 text-xs text-slate-300 border-b border-neutral-700">
                                    <span>Terminal</span>
                                    <button
                                        onClick={() => setOutput(null)}
                                        className="text-red-400 hover:text-red-600 font-bold px-2"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <pre className="p-2 whitespace-pre-line">
                                    $ {output}
                                    <span className="animate-pulse">█</span>
                                </pre>
                            </div>
                        )}
                    </div>
                </div>


            </motion.div>
        </motion.section>
    );
};