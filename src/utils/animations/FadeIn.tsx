// utils/animations/FadeInSection.tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInSectionProps = {
    children: ReactNode;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right";
};

export const FadeIn = ({
    children,
    delay = 0,
    duration = 0.8,
    direction = "up",
}: FadeInSectionProps) => {
    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
            x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
        },
        visible: { opacity: 1, x: 0, y: 0 },
        exit: {
            opacity: 0,
            y: direction === "up" ? -50 : direction === "down" ? 50 : 0,
            x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
        },
    };

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            transition={{ duration, ease: "easeInOut", delay }} 
            viewport={{ once: true, amount: 0.6 }}
        >
            {children}
        </motion.div>
    );
};
