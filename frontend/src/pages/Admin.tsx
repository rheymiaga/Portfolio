import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { motion, AnimatePresence } from "framer-motion";
import { IoRefresh, IoTrashOutline, IoMenu } from "react-icons/io5";
import { LuActivity } from "react-icons/lu";

// Sub-components
import { AdminAnalytics } from "../components/ui/AnalyticsCard";
import { AdminSidebar } from "../components/ui/adminSidebar";
import { AdminModal } from "../components/ui/modals/adminModal";

interface Feedback {
    id: number;
    name?: string | null;
    text: string;
    ip_address: string;
    created_at: string;
}

export const Admin = ({ setUser }: { setUser: (user: any) => void }) => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"dashboard" | "inbox">("dashboard");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [readIds, setReadIds] = useState<number[]>(() => {
        const saved = localStorage.getItem("read_feedback_ids");
        return saved ? JSON.parse(saved) : [];
    });

    const navigate = useNavigate();
    const unreadCount = useMemo(() => feedbacks.filter(fb => !readIds.includes(fb.id)).length, [feedbacks, readIds]);

    const fetchFeedbacks = async (showLoading = false) => {
        if (showLoading) setLoading(true);
        try {
            const res = await api.get("/api/feedbacks");
            if (res.data.status === 204) setFeedbacks([]);
            else if (res.data.data) setFeedbacks(res.data.data);
            setError(null);
        } catch (err: any) {
            setError("LINK_FAILURE: SERVER_UNREACHABLE");
        } finally { setLoading(false); }
    };

    useEffect(() => {
        fetchFeedbacks(true);
        const interval = setInterval(() => fetchFeedbacks(false), 5000);
        return () => clearInterval(interval);
    }, []);

    const handleSelectFeedback = (fb: Feedback) => {
        setSelectedFeedback(fb);
        if (!readIds.includes(fb.id)) {
            const updatedReadIds = [...readIds, fb.id];
            setReadIds(updatedReadIds);
            localStorage.setItem("read_feedback_ids", JSON.stringify(updatedReadIds));
        }
    };

    const handleDelete = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        if (!window.confirm("CRITICAL: ERASE_RECORD?")) return;
        try {
            await api.delete(`/api/feedbacks/${id}`);
            setFeedbacks(prev => prev.filter(f => f.id !== id));
            if (selectedFeedback?.id === id) setSelectedFeedback(null);
        } catch (err) { setError("ERASE_FAILURE"); }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        api.defaults.headers.common["Authorization"] = "";
        setUser(null);
        navigate("/login", { replace: true });
    };

    return (
        <div className="min-h-screen bg-[#050505] text-neutral-400 flex overflow-hidden poppins selection:bg-blue-500/30">
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-100 bg-[linear-linear(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-linear(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_4px,3px_100%]" />

            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-60 lg:hidden"
                    />
                )}
            </AnimatePresence>

            <AdminSidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                unreadCount={unreadCount}
                handleLogout={handleLogout}
                error={error}
            />

            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-[radial-linear(circle_at_50%_0%,rgba(15,15,15,1)_0%,rgba(5,5,5,1)_100%)]">
                <header className="h-20 lg:h-24 flex items-center justify-between px-6 lg:px-10 shrink-0 border-b border-neutral-800 bg-neutral-950 backdrop-blur-md z-50">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-3 bg-white/5 rounded-xl text-neutral-400">
                            <IoMenu size={24} />
                        </button>
                        <div className="hidden sm:flex items-center gap-2">
                            <span className="text-[10px] font-black text-neutral-700 uppercase tracking-[0.3em]">Portfolio</span>
                            <span className="text-neutral-800">/</span>
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">{activeTab}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] font-black text-neutral-600 uppercase tracking-widest leading-none mb-1">Status</span>
                            <span className={`text-[10px] font-black uppercase italic ${loading ? 'text-red-500 animate-pulse' : 'text-emerald-500'}`}>
                                {loading ? 'Syncing...' : 'Ready'}
                            </span>
                        </div>
                        <button onClick={() => fetchFeedbacks(true)} className="p-3 bg-white/3 border border-white/5 rounded-xl text-neutral-400 hover:bg-white/10 active:scale-90 transition-all">
                            <IoRefresh className={loading ? "animate-spin" : ""} size={18} />
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 lg:p-12 custom-scrollbar">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                            className="max-w-6xl mx-auto"
                        >
                            {activeTab === 'dashboard' ? (
                                <AdminAnalytics feedbacks={feedbacks} />
                            ) : (
                                <div className="space-y-3 pb-24">
                                    {feedbacks.length === 0 ? (
                                        <div className="py-32 text-center border border-dashed border-neutral-800 rounded-4xl">
                                            <LuActivity className="mx-auto text-neutral-800 mb-4" size={40} />
                                            <p className="text-neutral-700 text-[10px] font-black uppercase tracking-[0.4em]">Archive_Empty</p>
                                        </div>
                                    ) : (
                                        [...feedbacks].reverse().map((fb, index) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.03 }}
                                                key={fb.id}
                                                onClick={() => handleSelectFeedback(fb)}
                                                className={`group relative flex items-center gap-4 lg:gap-6 p-4 lg:p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${!readIds.includes(fb.id) ? 'bg-white/3 border-blue-500/30 shadow-xl' : 'border-white/5 opacity-50 hover:opacity-100'}`}
                                            >
                                                <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center font-black shrink-0 text-xs lg:text-sm ${!readIds.includes(fb.id) ? 'bg-blue-600 text-white' : 'bg-neutral-900 text-neutral-600'}`}>
                                                    {fb.name?.[0] || 'V'}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-0.5">
                                                        <h4 className="text-xs lg:text-sm font-black uppercase truncate text-neutral-200">{fb.name || "Anonymous"}</h4>
                                                        {!readIds.includes(fb.id) && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />}
                                                    </div>
                                                    <p className="text-neutral-500 text-[11px] lg:text-xs truncate italic">{fb.text}</p>
                                                </div>
                                                <button onClick={(e) => handleDelete(e, fb.id)} className="p-2 text-neutral-700 hover:text-red-500 transition-colors">
                                                    <IoTrashOutline size={18} />
                                                </button>
                                            </motion.div>
                                        ))
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            <AdminModal
                selectedFeedback={selectedFeedback}
                onClose={() => setSelectedFeedback(null)}
                onDelete={handleDelete}
            />
        </div>
    );
};