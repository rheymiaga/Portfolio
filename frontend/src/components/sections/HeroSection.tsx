import { motion } from 'framer-motion'
import { IoLocation } from "react-icons/io5";
import { SocialLinks } from "../ui/SocialLinks";
import { heroSection } from '../../animations/animate';


export const HeroSection = () => {


    return (
        <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: false }}
            className="relative min-h-screen flex items-center justify-center flex-col text-white p-3">
            <div
                className="absolute text-base top-5 left-5 sm:left-10 opacity-70 flex shrink-0 items-center cormorant">
                <IoLocation className="flex shrink-0" />
                <p>Metropolitan Manila, Philippines</p>
            </div>

            <motion.div
                variants={heroSection}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="space-y-6 mask-shadow">
                <div className="cinzel p-2">
                    <p className=" tracking-widest text-center brightness-110 text-2xl sm:text-[32px] transition-all duration-300 ease-in-out">
                        Hello, I’m Rhey Miaga,
                    </p>
                    <p className="text-[32px] text-center tracking-wider lg:text-[56px] transition-all duration-300 ease-in-out brightness-110
                    font-semibold bg-linear-to-r bg-clip-text text-transparent from-slate-200 via-slate-300 to-slate-200">
                        Full Stack Web Developer
                    </p>

                    <p className="text-center brightness-110 cormorant italic
                    transition-all duration-300 ease-in-out tracking-widest text-base sm:text-2xl mb-2 font-extralight">
                        I specialize in minimalist UI/UX design, building user‑friendly projects that emphasize clean and modern experiences.
                    </p>
                </div>
                <SocialLinks />
            </motion.div>

        </motion.div >
    )
}
