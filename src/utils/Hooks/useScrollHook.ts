import { useEffect, useState } from "react";

export type ScrollDirection = "up" | "down";

/**
 * Lightweight hook that only tracks scroll direction.
 * Returns "up" or "down".
 */
export const useScrollDirection = () => {
    const [direction, setDirection] = useState<ScrollDirection>("up");

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const updateScrollDirection = () => {
            const scrollY = window.scrollY;
            if (scrollY > lastScrollY) {
                setDirection("down");
            } else if (scrollY < lastScrollY) {
                setDirection("up");
            }
            lastScrollY = scrollY > 0 ? scrollY : 0;
        };

        window.addEventListener("scroll", updateScrollDirection);

        return () => {
            window.removeEventListener("scroll", updateScrollDirection);
        };
    }, []);

    return direction;
};
