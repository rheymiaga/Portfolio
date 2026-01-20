import { useScrollWatcher } from "../Hooks/useScrollWatcher";
import { NavLinks } from "../../components/NavBar/NavLinks/NavLinks";
import type { ReactNode } from "react";

type ScrollWatcherProps = {
    children: ReactNode;
    threshold?: number;
    onEnter?: (id: string) => void;
    onLeave?: (id: string) => void;
};

export const ScrollWatcher = ({
    children,
    threshold = 0.75,
    onEnter,
    onLeave,
}: ScrollWatcherProps) => {
    // Use the reusable hook with NavLinks as targets
    useScrollWatcher({
        targets: NavLinks.map((link) => link.anchor.replace("#", "")),
        threshold,
        onEnter,
        onLeave,
    });

    return <>{children}</>;
};
