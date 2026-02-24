import { motion } from 'framer-motion'
import { IoLocation } from "react-icons/io5";
import { SocialLinks } from "../../ui/SocialLinks";
import { heroVariants } from '../../../animations/Variants';

export const HeroSection = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: false }}
            className="relative min-h-screen flex items-center justify-center flex-col text-white px-6"
        >
            {/* Location */}
            <div className="absolute top-6 left-6 sm:left-12 flex items-center gap-2 text-sm sm:text-base opacity-70 cormorant">
                <IoLocation className="shrink-0" />
                <p>Metropolitan Manila, Philippines</p>
            </div>

            <motion.div
                variants={heroVariants}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="space-y-6 text-center max-w-4xl"
            >
                <div className="cinzel space-y-4">
                    <p className="tracking-widest text-lg sm:text-2xl brightness-110">
                        Hello, I’m <span className="font-semibold">Rhey Miaga</span>
                    </p>
                    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-linear-to-r from-slate-200 via-slate-300 to-slate-200 bg-clip-text text-transparent">
                        Full Stack Web Developer
                    </h1>
                    <p className="cormorant italic text-sm sm:text-lg lg:text-xl font-light tracking-wide opacity-90">
                        I specialize in minimalist UI/UX design, creating user‑friendly interfaces that combine modern aesthetics with precise attention to detail. My focus is on delivering clean, intuitive experiences that enhance usability and engagement.
                    </p>
                </div>
                <SocialLinks />
            </motion.div>
        </motion.section>
    )
}
