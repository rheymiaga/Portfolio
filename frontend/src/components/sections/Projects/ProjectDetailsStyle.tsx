
export const SectionHeader = ({ children, shown }: { children: React.ReactNode; shown: boolean }) => (
    <h2
        className={`poppins tracking-wide transition-all duration-500 ease-in-out
      ${shown ? "text-base font-semibold border-b border-white/10 pb-2 mb-4" : "text-sm font-medium opacity-60 mb-2"}`}
    >
        {children}
    </h2>
);

export const IconGrid = ({
    icons,
    names,
    colors,
    shown
}: {
    icons?: React.ReactNode[];
    names?: string[];
    colors?: string[];
    shown: boolean;
}) => (
    <div className="flex flex-wrap gap-2 transition-all duration-500 ease-in-out">
        {icons?.map((icon, i) => (
            <div
                key={i}
                className="flex items-center gap-3 px-5 py-4 rounded-xl bg-neutral-800/50 hover:bg-neutral-700/60 transition-all duration-500 ease-in-out transform hover:scale-105 flex-1"
            >
                <span
                    className={`transition-all duration-500 ease-in-out ${shown ? "text-2xl" : "text-lg opacity-70"}`}
                    style={{ color: colors?.[i] }}
                >
                    {icon}
                </span>
                {names && (
                    <span
                        className={`poppins transition-all duration-500 ease-in-out ${shown ? "text-sm font-medium opacity-90 truncate" : "text-xs opacity-60"}`}
                    >
                        {names[i]}
                    </span>
                )}
            </div>
        ))}
    </div>
);
