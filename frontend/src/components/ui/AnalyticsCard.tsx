import { useMemo, useRef } from "react";
import { AreaChart } from "@tremor/react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LuTerminal, LuCpu, LuInbox, LuZap } from "react-icons/lu";
import { StatCard } from "./StatCard";

interface Feedback {
    id: number;
    name?: string | null;
    text: string;
    ip_address: string;
    created_at: string;
}

export const AdminAnalytics = ({ feedbacks }: { feedbacks: Feedback[] }) => {
    const readIds = JSON.parse(localStorage.getItem("read_feedback_ids") || "[]");
    const containerRef = useRef<HTMLDivElement>(null);

    // --- 3D Mouse Parallax Logic ---
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const stats = useMemo(() => {
        const now = new Date();
        const today = feedbacks.filter(fb => new Date(fb.created_at).toDateString() === now.toDateString()).length;
        const unread = feedbacks.filter(fb => !readIds.includes(fb.id)).length;
        return { total: feedbacks.length, today, unread };
    }, [feedbacks, readIds]);

    const chartData = useMemo(() => {
        const days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();

        const counts = feedbacks.reduce((acc: Record<string, number>, fb) => {
            const dateStr = fb.created_at.split('T')[0];
            acc[dateStr] = (acc[dateStr] || 0) + 1;
            return acc;
        }, {});

        return days.map(date => ({
            date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            "feedbacks": counts[date] || 0,
        }));
    }, [feedbacks]);

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={{
                show: { transition: { staggerChildren: 0.1 } }
            }}
            className="flex flex-col xl:flex-row gap-6 lg:gap-8 mb-12"
            style={{ perspective: "2000px" }}
        >
            <motion.div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                variants={{
                    hidden: { rotateX: 10, y: 40, opacity: 0 },
                    show: { rotateX: 0, y: 0, opacity: 1 }
                }}
                className="flex-[2.5] bg-linear-to-r from-neutral-900 via-neutral-700 to-neutral-900 border border-white/10 rounded-[3rem] p-1 relative shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] overflow-hidden group"
            >
                <motion.div
                    className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `radial-gradient(600px circle at var(--x) var(--y), rgba(16, 185, 129, 0.08), transparent 40%)`
                    } as any}
                />

                <div className="relative z-10 bg-neutral-900 h-full rounded-[2.9rem] p-6 lg:p-8 flex flex-col">
                    <div className="flex justify-between items-start space-y-6">
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                                    <LuTerminal className="text-emerald-400" size={16} />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500">Analytics</p>
                            </div>
                            <h2 className="text-white text-3xl font-bold tracking-tighter uppercase italic">
                                Feedbacks
                            </h2>
                        </div>

                        <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                <span className="text-[9px] font-mono text-emerald-500 uppercase font-bold">Live</span>
                            </div>
                        </div>
                    </div>

                    <div
                        className="w-full mt-auto h-72 lg:h-auto lg:flex-1"
                        style={{ transform: "translateZ(50px)" }}
                    >
                        <AreaChart
                            className="h-full w-full"
                            data={chartData}
                            index="date"
                            categories={["feedbacks"]}
                            colors={["emerald"]}
                            showGridLines={false}
                            showYAxis={false}
                            showLegend={false}
                            curveType="monotone"
                            animationDuration={2000}
                        />
                    </div>
                </div>
            </motion.div>


            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-6 lg:gap-8">
                <StatCard value={stats.total} label="Total" icon={<LuCpu size={24} />} color="dark" delay={0.2} />
                <StatCard value={stats.unread} label="Unread" icon={<LuInbox size={24} />} color="white" delay={0.3} />
                <StatCard value={stats.today} label="Today" icon={<LuZap size={24} />} color="dark" delay={0.4} />
            </div>
        </motion.div>
    );
};