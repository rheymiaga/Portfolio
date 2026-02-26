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
        transition: { duration: 0.6, ease: [0.25, 0.8, 0.25, 1], },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 40,
        transition: { duration: 0.4, ease: [0.25, 0.8, 0.25, 1] },
    },
};

export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.02,
            delayChildren: 0,
        },
    },
};

export const sectionVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 },
    },
};