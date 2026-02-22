import type { Variants } from "framer-motion";

export const heroVariants = {
    hidden: { opacity: 0, scale: 0.90, y: 40 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 40 },
};

export const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 40 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 40,
        transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
    },
};