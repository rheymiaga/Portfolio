import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Scotch from '../../../assets/images/SccotchPixelated.png';
import { heroVariants, cardVariants, sectionVariants, } from '../../../animations/Variants';
import { FaRegWindowMaximize, FaRegWindowRestore } from 'react-icons/fa6';
import { IoSearchOutline } from 'react-icons/io5';
import { tabContent } from './AboutData';
import { BackgroundOutput, ScotchOutput, SomeFactsOutput } from './Output';
import { RunBtns } from '../../ui/buttons/runBtns';
import { WebsiteModal } from '../../ui/modals/websiteModal';
import { TerminalModal } from '../../ui/modals/terminalModal';

export const AboutSection = () => {
    const [activeTab, setActiveTab] = useState("Backgroud.tsx");
    const [showLive, setShowLive] = useState(false);
    const [output, setOutput] = useState<React.ReactNode | null>(null);
    const [maximize, setmaximize] = useState(false);

    useEffect(() => {
        setActiveTab('Background.tsx')
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
            case "Background.tsx":
                setOutput(
                    <BackgroundOutput />
                );
                break;
            case "SomeFacts.tsx":
                setOutput(
                    <SomeFactsOutput />
                );
                break;
            case "Scotch.tsx":
                setOutput(
                    <ScotchOutput />
                );
                break;

            default:
                setOutput("No output available.");
        }
    };

    return (
        <motion.section
            className="relative min-h-screen flex items-center justify-center  text-neutral-100 overflow-hidden"
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
            <WebsiteModal
                showLive={showLive}
                setShowLive={setShowLive}
                activeTab={activeTab}
                output={output}
            />

            <motion.div
                className={`relative z-10 bg-neutral-800 rounded-lg shadow-2xl border border-neutral-700 overflow-hidden font-mono
          ${maximize ? "w-32 h-24 sm:w-48 sm:h-32" : "w-[90%] sm:w-[80%] md:w-[50%] h-60 md:h-76"}`}
                whileHover={{ rotateY: 6, rotateX: -3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                variants={cardVariants}
                drag
                dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                dragElastic={0.2}
                dragMomentum={false}
            >
                <div className="flex items-center justify-between bg-neutral-900 px-3 py-2 text-xs border-b border-neutral-700 text-neutral-300">
                    <div className="flex gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span
                            onClick={() => setmaximize(!maximize)}
                            className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"
                            title={maximize ? "Restore" : "Minimize"}
                        ></span>
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    </div>
                    <h1 className={`font-bold px-4 sm:px-8 py-1 ${maximize ? "hidden" : "flex"} bg-neutral-800 rounded-lg border border-neutral-700  items-center gap-1`}>
                        <IoSearchOutline /> About Me
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="italic hidden sm:inline">VS Code</span>
                        <button
                            onClick={() => setmaximize(!maximize)}
                            className="p-2 hover:bg-neutral-700 rounded"
                            title={maximize ? "Restore" : "Maximize"}
                        >
                            {maximize ? <FaRegWindowMaximize /> : <FaRegWindowRestore />}
                        </button>
                    </div>
                </div>

                {!maximize && (
                    <>
                        <div className="flex items-center bg-neutral-900 text-xs overflow-x-auto text-neutral-300 border-b border-neutral-700">
                            <RunBtns
                                tabContent={tabContent}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                handleRunCode={handleRunCode}
                            />
                        </div>
                        <div className="p-4 text-xs sm:text-sm bg-neutral-800 leading-relaxed overflow-auto h-40 md:h-56 relative">
                            {tabContent[activeTab]}
                            <TerminalModal
                                output={output}
                                setShowLive={setShowLive}
                                setOutput={setOutput}
                                handleRunCode={handleRunCode}
                                activeTab={activeTab}
                            />
                        </div>
                    </>
                )}
            </motion.div>
        </motion.section>
    );
};