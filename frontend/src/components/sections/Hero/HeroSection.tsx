import { motion } from 'framer-motion'
import { IoLocation } from "react-icons/io5";
import { SocialLinks } from "../../ui/SocialLinks";
import { heroVariants } from '../../../animations/Variants';
import { History } from '../Projects/ProjectData';

export const HeroSection = () => {
    return (
        <div className='relative flex items-center py-20 my-8 flex-col text-white px-3'>
            <motion.section
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: false }}
                className="absolute top-6 left-6 md:left-12 rounded-b-4xl "
            >
                <div className=" flex items-center gap-2 text-base opacity-70 cormorant">
                    <IoLocation className="shrink-0" />
                    <p>Metropolitan Manila, Philippines</p>
                </div>
            </motion.section>
            <motion.div
                variants={heroVariants}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="space-y-16 w-full text-center max-w-5xl p-0 md:px-18"
            >
                <div className="space-y-6 text-start">
                    <div className="flex flex-col sm:flex-row justify-between items-start">
                        <button className="text-2xl md:text-3xl p-2 hover:bg-neutral-600/50 duration-150 rounded ease-in transition-all font-semibold text-white poppins">
                            Rhey Louie Miaga <span className='text-neutral-400 text-sm'>he/him</span>
                        </button>
                        <SocialLinks />
                    </div>

                    <p className="text-xl ml-2 md:text-2xl font-medium tracking-wide text-neutral-200 poppins">
                        Full Stack Web Developer focused on craft and execution
                    </p>

                    <p className="text-base ml-2 md:text-lg tracking-wide max-w-2xl text-neutral-400 poppins">
                        I specialize in minimalist UI/UX design, creating user‑friendly interfaces that combine modern aesthetics with clarity and detail.
                    </p>
                </div>

                <div className=' items-start text-start pl-2'>
                    <div>
                        {History.map((history) => (
                            <div key={history.category} className="mb-8">
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



            </motion.div>
        </div>
    )
}


// <div className="cinzel space-y-4">
//     <p className="tracking-widest text-lg sm:text-2xl brightness-110">
//         Hello, I’m <span className="font-semibold">Rhey Miaga</span>,
//     </p>
//     <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-linear-to-r from-slate-200 via-slate-300 to-slate-200 bg-clip-text text-transparent">
//         Full Stack Web Developer
//     </h1>
//     <p className="cormorant italic text-sm sm:text-lg lg:text-xl font-light tracking-wide opacity-90">
//         I specialize in minimalist UI/UX design, crafting user‑friendly interfaces that balance modern aesthetics with precision.
//     </p>
// </div>