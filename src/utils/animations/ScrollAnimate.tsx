import { useEffect, useState } from "react";
import type { ReactNode } from "react";

type ScrollAnimateProps = {
    id: string;
    threshold?: number;
    direction: "up" | "down";
    children: ReactNode;
    baseClass?: string;
    activeClass?: string;       // animation when visible scrolling down
    inactiveClass?: string;     // animation when hidden scrolling down
    activeUpClass?: string;     // animation when visible scrolling up
    inactiveUpClass?: string;   // animation when hidden scrolling up
};

export const ScrollAnimate = ({
    id,
    threshold = 0.75,
    direction,
    children,
    baseClass = "",
    activeClass = "opacity-100",
    inactiveClass = "opacity-0 translate-y-4",
    activeUpClass = "opacity-100",
    inactiveUpClass = "opacity-0 -translate-y-4",
}: ScrollAnimateProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Load saved state from localStorage
        const savedState = localStorage.getItem(`scroll-animate-${id}`);
        if (savedState === "true") {
            setIsVisible(true);
        }

        const el = document.getElementById(id);
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (direction === "down") {
                        setIsVisible(true);
                        localStorage.setItem(`scroll-animate-${id}`, "true");
                    }
                    if (direction === "up") {
                        setIsVisible(true); // still visible, but apply "up" animation
                        localStorage.setItem(`scroll-animate-${id}`, "true-up");
                    }
                } else {
                    setIsVisible(false);
                    localStorage.setItem(`scroll-animate-${id}`, "false");
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [id, threshold, direction]);

    // Decide which class to apply based on direction
    let appliedClass = inactiveClass;
    if (isVisible) {
        appliedClass = direction === "up" ? activeUpClass : activeClass;
    } else {
        appliedClass = direction === "up" ? inactiveUpClass : inactiveClass;
    }

    return (
        <div
            id={id}
            className={`${baseClass} transition-all duration-700 ease-in-out ${appliedClass}`}
        >
            {children}
        </div>
    );
};
