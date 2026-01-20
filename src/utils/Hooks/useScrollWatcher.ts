import { useEffect } from "react";

type ScrollWatcherOptions = {
    targets: string[];              // list of element IDs to watch
    threshold?: number;             // how much of the section must be visible
    onEnter?: (id: string) => void; // callback when section enters view
    onLeave?: (id: string) => void; // callback when section leaves view
};

export const useScrollWatcher = ({
    targets,
    threshold = 0.75,
    onEnter,
    onLeave,
}: ScrollWatcherOptions) => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.id;
                    if (entry.isIntersecting) {
                        // update URL hash
                        window.history.replaceState(null, "", `#${id}`);
                        if (onEnter) onEnter(id);
                    } else {
                        if (onLeave) onLeave(id);
                    }
                });
            },
            { threshold }
        );

        targets.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [targets, threshold, onEnter, onLeave]);
};
