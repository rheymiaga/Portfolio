import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Scotch from '../../../assets/images/SccotchPixelated.png';
import { heroVariants, cardVariants, sectionVariants } from '../../../animations/Variants';
import { FaRegWindowMaximize, FaRegWindowRestore } from 'react-icons/fa6';
import { IoSearchOutline } from 'react-icons/io5';
import { tabContent } from './AboutData';
import { BackgroundOutput, ScotchOutput, SomeFactsOutput } from './Output';
import { RunBtns } from '../../ui/buttons/runBtns';
import { WebsiteModal } from '../../ui/modals/websiteModal';
import { TerminalModal } from '../../ui/modals/terminalModal';

export const AboutSection = () => {
    const [activeTab, setActiveTab] = useState("Background.tsx");
    const [showLive, setShowLive] = useState(false);
    const [output, setOutput] = useState<React.ReactNode | null>(null);
    const [maximize, setmaximize] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 35, stiffness: 120, mass: 1 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);
    const bgMoveX = useTransform(smoothX, [-0.5, 0.5], ["3%", "-3%"]);
    const bgMoveY = useTransform(smoothY, [-0.5, 0.5], ["3%", "-3%"]);

    const bgRotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
    const bgRotateY = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);

    const cardRotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
    const cardRotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

    useEffect(() => {
        setActiveTab('Background.tsx');
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX / window.innerWidth - 0.5);
            mouseY.set(e.clientY / window.innerHeight - 0.5);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const handleRunCode = () => {
        switch (activeTab) {
            case "Background.tsx":
                setOutput(<BackgroundOutput />);
                break;
            case "SomeFacts.tsx":
                setOutput(<SomeFactsOutput />);
                break;
            case "Scotch.tsx":
                setOutput(<ScotchOutput />);
                break;
            default:
                setOutput("No output available.");
        }
    };

    return (
        <motion.section
            className="relative min-h-screen flex items-center justify-center text-neutral-100 overflow-hidden bg-neutral-950"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            style={{ perspective: "1500px" }}
        >
            <motion.div
                id="scotch-bg"
                className="absolute inset-0 bg-cover bg-center will-change-transform opacity-15 pointer-events-none"
                style={{
                    backgroundImage: `url(${Scotch})`,
                    x: bgMoveX,
                    y: bgMoveY,
                    rotateX: bgRotateX,
                    rotateY: bgRotateY,
                    scale: 1.15
                }}
                variants={heroVariants}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_85%)] pointer-events-none z-1" />

            <WebsiteModal
                showLive={showLive}
                setShowLive={setShowLive}
                activeTab={activeTab}
                output={output}
            />
            <motion.div
                className={`relative z-10 bg-neutral-900/90 backdrop-blur-xl rounded-xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-neutral-700/50 overflow-hidden font-mono
                ${maximize ? "w-40 h-28 sm:w-56 sm:h-36" : "w-[92%] sm:w-[85%] md:w-162.5 h-76 md:h-112.5"}`}
                style={{
                    rotateX: cardRotateX,
                    rotateY: cardRotateY,
                    transformStyle: "preserve-3d"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                variants={cardVariants}
                drag
                dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                dragElastic={0.1}
                dragMomentum={false}
            >

                <div className="flex items-center justify-between bg-neutral-950/80 px-4 py-3 text-xs border-b border-neutral-800 text-neutral-400">
                    <div className="flex gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-inner"></span>
                        <span
                            className="w-3 h-3 rounded-full bg-[#ffbd2e]  shadow-inner"
                        ></span>
                        <span className="w-3 h-3 rounded-full bg-[#27c93f] shadow-inner"></span>
                    </div>
                    <h1 className={`font-bold px-4 md:px-8 lg:px-12 py-1.5 ${maximize ? "hidden" : "flex"} bg-neutral-900 rounded-md border border-neutral-800 items-center gap-2 text-neutral-200 tracking-tight`}>
                        <IoSearchOutline className="text-blue-400" /> About Me
                    </h1>
                    <div className="flex items-center gap-3">
                        <span className="italic hidden sm:inline text-[10px] opacity-50 uppercase tracking-widest">Vscode</span>
                        <button
                            onClick={() => setmaximize(!maximize)}
                            className="p-1.5 hover:bg-neutral-800 rounded-md transition-colors"
                        >
                            {maximize ? <FaRegWindowMaximize /> : <FaRegWindowRestore />}
                        </button>
                    </div>
                </div>

                {!maximize && (
                    <div className="flex flex-col h-full">
                        <div className="flex items-center bg-neutral-950/80 text-xs overflow-x-auto text-neutral-400 border-b border-neutral-800/50">
                            <RunBtns
                                tabContent={tabContent}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                handleRunCode={handleRunCode}
                            />
                        </div>

                        <div className="p-6 text-xs sm:text-sm bg-neutral-900 leading-relaxed overflow-auto flex-1 relative ">
                            <div className="opacity-80">
                                {tabContent[activeTab]}
                            </div>
                            <TerminalModal
                                output={output}
                                setShowLive={setShowLive}
                                setOutput={setOutput}
                                handleRunCode={handleRunCode}
                                activeTab={activeTab}
                            />
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.section>
    );
};