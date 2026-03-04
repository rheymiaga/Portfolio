import type { Variants } from "framer-motion";

const cubicBezier = [0.23, 1, 0.32, 1] as const;

export const heroVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
        y: 60,
        rotateX: 15,
        perspective: 1000
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.8,
            ease: cubicBezier
        }
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        y: 20,
        rotateX: -10,
        transition: { duration: 0.4 }
    },
};

export const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.9,
        z: -100,
        rotateX: 20,
        y: 50
    },
    visible: {
        opacity: 1,
        scale: 1,
        z: 0,
        rotateX: 0,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
            mass: 1
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        rotateX: -10,
        y: 30,
        transition: { duration: 0.3 }
    },
};

export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1,
        },
    },
};

export const sectionVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
        rotateX: 10,
    },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.7,
            ease: "easeOut"
        },
    },
};

export const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.98,
        rotateY: 5
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateY: 0,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 12
        },
    },
};