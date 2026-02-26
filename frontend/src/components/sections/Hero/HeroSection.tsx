import { motion } from 'framer-motion'
import { IoLocation } from "react-icons/io5";
import { heroVariants } from '../../../animations/Variants';
import { CallToAction } from '../../ui/CallToAction';
import { History } from '../Projects/ProjectData';


export const HeroSection = () => {
    return (
        <div className='relative flex items-center flex-col text-white '>
            <motion.div
                variants={heroVariants}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="space-y-6 w-full text-center"
            >
                <div className="space-y-6 text-start poppins">
                    <div className="flex flex-wrap gap-2 justify-between items-center">
                        <h1 className="text-2xl md:text-[32px] duration-150 rounded ease-in transition-all font-semibold text-white poppins">
                            Rhey Louie Miaga
                        </h1>
                        <div className=" flex text-[12px] opacity-70 poppins">
                            <IoLocation className="shrink-0" />
                            <p>Metropolitan Manila, Philippines</p>
                        </div>
                    </div>

                    <p className="text-xl md:text-2xl font-medium tracking-wide text-neutral-200">
                        Full Stack Web Developer focused on craft and execution
                    </p>

                    <p className="text-base md:text-lg tracking-wide max-w-2xl text-neutral-400">
                        I specialize in minimalist UI/UX design, creating user‑friendly interfaces that combine modern aesthetics with clarity and detail.
                    </p>
                    <CallToAction />
                    <div className=' items-start text-start'>
                        <div className='space-y-4'>
                            {History.map((history) => (
                                <div key={history.category}>
                                    <div className="flex items-center gap-2 text-[12px] md:text-base tracking-wide opacity-70 cinzel mb-4">
                                        {history.icon}
                                        <p>{history.category}</p>
                                    </div>
                                    <div className=" divide-y divide-neutral-700/50 border-l border-neutral-700/50 px-2">
                                        {history.items.map((item) => (
                                            <div key={item.title} className="flex text-[12px] md:text-base justify-between items-center gap-1 poppins">
                                                <div className='p-2 flex gap-2 items-center'>
                                                    <h3 className=''>{item.title}</h3>
                                                    <span className='text-neutral-700/50'>/</span>
                                                    <p className="opacity-60">{item.description}</p>
                                                </div>
                                                <p className="opacity-50">{item.year}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>


            </motion.div>
        </div>
    )
}


