
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { techStack } from './TechStackData';
import { IoChevronDown } from 'react-icons/io5';
import { cardVariants, containerVariants, itemVariants, sectionVariants } from '../../../animations/Variants';

export const TechStackSection = () => {
    const [filter, setFilter] = useState<'all' | 'Frontend' | 'Backend' | 'Tools & Platforms'>('all');
    const [isOpen, setIsOpen] = useState(false);

    const displayedCategories = filter === 'all'
        ? [techStack[0]]
        : techStack.filter(cat => cat.category === filter);

    return (
        <section className="w-full relative overflow-visible py-16 px-3">

            <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute inset-0 bg-linear-to-b from-neutral-800 rounded via-transparent to-neutral-900/10 border-t-2 border-neutral-600" />
                <div className="absolute top-32 right-20 w-80 h-80 bg-neutral-200/3 rounded-full blur-3xl" />
                <div className="absolute bottom-32 left-20 w-72 h-72 bg-slate-400/3 rounded-full blur-3xl" />
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                variants={containerVariants}
                className="max-w-6xl mx-auto relative z-10 h-full flex flex-col"
            >
                <motion.div
                    variants={sectionVariants}
                    className="mb-6"
                >
                    <div className='flex items-center justify-between gap-4 mb-3'>
                        <motion.div variants={itemVariants}>
                            <h2 className="text-2xl md:text-[32px] font-semibold poppins text-white tracking-tight">
                                Tech-Stack
                            </h2>
                        </motion.div>
                        <motion.div
                            variants={itemVariants}
                            className="relative w-fit shrink-0"
                        >
                            <motion.button
                                onClick={() => setIsOpen(!isOpen)}
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-3.5 md:px-4 py-1 md:py-1.5 rounded-lg transition-all duration-200 text-xs font-semibold poppins uppercase tracking-widest border bg-neutral-900/40 text-neutral-300 border-neutral-700/30 hover:border-neutral-600/45 hover:bg-neutral-800/50 flex items-center gap-2 backdrop-blur-md"
                            >
                                <span className="text-[10px]">
                                    {filter === 'all' ? 'All' : filter === 'Tools & Platforms' ? 'Tools' : filter}
                                </span>
                                <motion.div
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{ duration: 0.15, type: 'spring', stiffness: 400 }}
                                    className="text-neutral-500 text-xs"
                                >
                                    <IoChevronDown />
                                </motion.div>
                            </motion.button>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -6, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.1, type: 'spring', stiffness: 400, damping: 25 }}
                                        className="absolute top-full right-0 mt-2 rounded-lg border border-neutral-700/30 bg-neutral-800/95 backdrop-blur-lg overflow-hidden shadow-lg z-50 text-left w-40"
                                    >
                                        {(['all', 'Frontend', 'Backend', 'Tools & Platforms'] as const).map((option) => (
                                            <motion.button
                                                key={option}
                                                onClick={() => {
                                                    setFilter(option);
                                                    setIsOpen(false);
                                                }}
                                                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                                className={`w-full px-4 md:px-5 py-1.5 md:py-2 text-xs font-semibold poppins uppercase tracking-widest transition-all duration-100 ${filter === option
                                                    ? 'text-white bg-neutral-900/60 border-l-2 border-neutral-400/50'
                                                    : 'text-neutral-400 hover:text-neutral-300'
                                                    }`}
                                            >
                                                {option === 'all' ? 'All' : option === 'Tools & Platforms' ? 'Tools' : option}
                                            </motion.button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="mb-3">
                        <div className="h-0.5 w-14 bg-linear-to-r from-neutral-500/60 via-neutral-500/40 to-transparent rounded-full" />
                    </motion.div>

                    <motion.p
                        variants={itemVariants}
                        className="text-[12px] md:text-base poppins text-neutral-400 leading-relaxed font-medium"
                    >
                        Tools and Frameworks Behind My Work
                    </motion.p>
                </motion.div>

                <AnimatePresence mode="wait">
                    <div className="space-y-6 flex-1" key={filter}>
                        {displayedCategories.map((category) => (
                            <motion.div
                                key={category.category}
                                variants={sectionVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <motion.div variants={itemVariants} className="mb-6">
                                    <div className="flex items-center gap-2.5 mb-2.5">
                                        <h3 className="text-base md:text-2xl font-semibold poppins text-white tracking-tight">
                                            {category.category}
                                        </h3>
                                        <span className="px-1 py-0.5 rounded-full bg-neutral-800/40 border border-neutral-700/30 text-[8px] font-bold poppins text-neutral-500 uppercase tracking-widest">
                                            {category.items.length}
                                        </span>
                                    </div>
                                    <div className="h-0.5 w-16 bg-linear-to-r from-neutral-600/60 via-neutral-600/30 to-transparent rounded-full" />
                                </motion.div>
                                <motion.div
                                    variants={containerVariants}
                                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3"
                                >
                                    {category.items.map((tech) => (
                                        <motion.div
                                            key={tech.name}
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.03, y: -1 }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                            className="group h-full"
                                        >
                                            <div className="relative h-full p-3 rounded-lg border border-neutral-700/20 bg-neutral-900/40 backdrop-blur-sm flex flex-row items-center justify-start gap-3 transition-all duration-300 hover:border-neutral-600/40 hover:bg-neutral-900/55 hover:shadow-md cursor-default overflow-hidden group/card" style={{ backdropFilter: 'blur(8px)' }}>

                                                <div
                                                    className="absolute inset-0 rounded-lg opacity-0 group-hover/card:opacity-4 transition-opacity duration-300"
                                                    style={{ backgroundColor: tech.color }}
                                                />

                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                                    className="relative z-10 w-10 h-10 md:w-11 md:h-11 rounded-lg bg-neutral-800/40 flex items-center justify-center shrink-0 transition-all duration-300 group-hover/card:bg-neutral-800/60 shadow-sm"
                                                    style={{
                                                        border: `1.5px solid ${tech.color}20`,
                                                    }}
                                                >
                                                    <div
                                                        className="text-lg md:text-xl transition-all duration-300 group-hover/card:drop-shadow-sm"
                                                        style={{
                                                            color: tech.color,
                                                        }}
                                                    >
                                                        {tech.icon}
                                                    </div>
                                                </motion.div>

                                                <div className="relative z-10 flex flex-col justify-center gap-1 min-w-0 flex-1">
                                                    <p className="text-[12px] font-semibold poppins text-neutral-100 transition-all duration-300 group-hover/card:text-white leading-snug">
                                                        {tech.name}
                                                    </p>
                                                    <p className="text-[8px] font-medium poppins text-neutral-500 group-hover/card:text-neutral-350 transition-all duration-300 leading-snug">
                                                        {tech.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
