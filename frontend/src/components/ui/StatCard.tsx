import { motion } from "framer-motion";
import { LuActivity } from "react-icons/lu";

interface StatCardProps {
    value: number;
    label: string;
    icon: React.ReactNode;
    color: "white" | "dark";
    delay?: number;
}

export const StatCard = ({ value, label, icon, color, delay = 0 }: StatCardProps) => {
    const isDark = color === "dark";

    return (
        <motion.div
            initial={{ rotateX: -25, y: 50, opacity: 0, translateZ: -100 }}
            animate={{ rotateX: 0, y: 0, opacity: 1, translateZ: 0 }}
            whileHover={{
                y: -8,
                rotateX: 5,
                boxShadow: isDark
                    ? "0 40px 80px -15px rgba(0,0,0,0.8), 0 0 20px rgba(16, 185, 129, 0.1)"
                    : "0 40px 80px -15px rgba(0,0,0,0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", damping: 18, stiffness: 100, delay }}
            className={`overflow-hidden p-0.5 rounded-[2.5rem] bg-linear-to-r ${isDark ? "from-neutral-900 via-neutral-600 to-neutral-900" : "from-neutral-400 via-white to-neutral-400"}`}
        >
            <div className={`
                relative flex items-center gap-6 p-6 lg:p-8 rounded-[2.5rem] border 
                ${isDark
                    ? "bg-neutral-900 border-white/10 text-white"
                    : "bg-white border-neutral-200 text-black"}
            `}>
                <div className={`absolute inset-0 pointer-events-none opacity-20 ${isDark
                    ? "bg-radial-at-t from-emerald-500/20 to-transparent"
                    : "bg-radial-at-t from-neutral-200 to-transparent"
                    }`} />

                <div className="relative shrink-0">
                    <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className={`
                        w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center shadow-2xl
                        ${isDark
                                ? "bg-white text-black shadow-white/5"
                                : "bg-neutral-900 text-white shadow-black/10"}
                    `}
                    >
                        {icon}
                    </motion.div>
                    <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 ${isDark ? "bg-emerald-500 border-[#080808]" : "bg-emerald-400 border-white"
                        } animate-pulse`} />
                </div>

                <div className="flex flex-col justify-center gap-1 relative z-10">
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-5xl lg:text-6xl font-[1000] tracking-tighter leading-none">
                            {value}
                        </h3>
                        <LuActivity
                            size={18}
                            className={`${isDark ? "text-emerald-500" : "text-emerald-600"} opacity-80`}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <div className={`h-0.5 w-4 rounded-full ${isDark ? "bg-emerald-500/50" : "bg-black/20"}`} />
                        <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDark ? "text-white/40" : "text-black/40"
                            }`}>
                            {label}
                        </p>
                    </div>
                </div>
                <span className="absolute top-4 right-6 text-[8px] font-mono opacity-10 font-black tracking-tighter">
                    rei
                </span>
            </div>
        </motion.div>
    );
};