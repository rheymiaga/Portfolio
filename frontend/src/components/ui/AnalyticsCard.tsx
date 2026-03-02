import { useMemo } from "react";
import { AreaChart } from "@tremor/react";
import { motion } from "framer-motion";
import { LuInbox, LuActivity, LuArrowUpRight } from "react-icons/lu";

interface Feedback {
    id: number;
    name?: string | null;
    text: string;
    ip_address: string;
    created_at: string;
}

export const AdminAnalytics = ({ feedbacks }: { feedbacks: Feedback[] }) => {
    const chartData = useMemo(() => {
        const days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();

        const counts = feedbacks.reduce((acc: Record<string, number>, fb) => {
            const date = fb.created_at.split('T')[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        return days.map(date => ({
            date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            "Messages": counts[date] || 0,
        }));
    }, [feedbacks]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10"
        >
            {/* --- MAIN TRAFFIC CARD --- */}
            <div className="md:col-span-2 relative group overflow-hidden bg-[#0D0D0F] border border-white/4 rounded-[2.5rem] p-8 shadow-2xl">
                {/* Subtle Glow Effect */}
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Live Pulse</p>
                            </div>
                            <h2 className="text-white text-3xl font-bold tracking-tight">Signal History</h2>
                        </div>
                        <div className="p-3 bg-white/3 border border-white/5 rounded-2xl">
                            <LuActivity className="text-blue-500" size={20} />
                        </div>
                    </div>

                    <div className="mt-auto">
                        <AreaChart
                            className="h-56 -ml-4 -mb-2"
                            data={chartData}
                            index="date"
                            categories={["Messages"]}
                            colors={["blue"]}
                            showXAxis={true}
                            showGridLines={false}
                            showYAxis={false}
                            showLegend={false}
                            curveType="natural"
                            showTooltip={true}
                        />
                    </div>
                </div>
            </div>

            {/* --- TOTAL COUNTER CARD --- */}
            <div className="relative group overflow-hidden bg-white rounded-[2.5rem] p-8 flex flex-col justify-between transition-transform duration-500 hover:scale-[1.01]">
                <div className="flex justify-between items-center">
                    <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-[-5deg] transition-transform duration-500">
                        <LuInbox className="text-white" size={28} />
                    </div>
                    <LuArrowUpRight className="text-black/20 group-hover:text-black transition-colors" size={24} />
                </div>

                <div className="mt-12">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 mb-2 ml-1">Archive Size</p>
                    <h3 className="text-8xl font-black tracking-tighter text-black leading-none">
                        {feedbacks.length}
                    </h3>
                </div>

                <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-black/40 uppercase">System Active</span>
                    <span className="text-[10px] font-mono text-black/20">00:24:MS</span>
                </div>
            </div>
        </motion.div>
    );
};