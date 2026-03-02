import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { motion, AnimatePresence } from "framer-motion";
import {
    IoRefresh, IoClose, IoTrashOutline,
    IoTimeOutline, IoLogOutOutline, IoMenu, IoGridOutline, IoGlobeOutline
} from "react-icons/io5";
import { LuMessagesSquare, LuInbox } from "react-icons/lu";
import { AdminAnalytics } from "../components/ui/AnalyticsCard";

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
    const [activeTab, setActiveTab] = useState<"pulse" | "insights">("pulse");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
    const [error, setError] = useState<string | null>(null);

    // PERSISTENCE LOGIC
    const [readIds, setReadIds] = useState<number[]>(() => {
        const saved = localStorage.getItem("read_feedback_ids");
        return saved ? JSON.parse(saved) : [];
    });

    const navigate = useNavigate();
    const unreadCount = feedbacks.filter(fb => !readIds.includes(fb.id)).length;

    const fetchFeedbacks = async (showLoading = false) => {
        if (showLoading) setLoading(true);
        try {
            const res = await api.get("/api/feedbacks");
            if (res.data.status === 204) setFeedbacks([]);
            else if (res.data.data) setFeedbacks(res.data.data);
            setError(null);
        } catch (err: any) {
            setError("Server connection lost.");
        } finally { setLoading(false); }
    };

    useEffect(() => {
        fetchFeedbacks(true);
        const interval = setInterval(() => fetchFeedbacks(false), 15000);
        return () => clearInterval(interval);
    }, []);

    // MARK AS READ LOGIC
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
        if (!window.confirm("Delete record?")) return;
        try {
            await api.delete(`/api/feedbacks/${id}`);
            setFeedbacks(prev => prev.filter(f => f.id !== id));
            if (selectedFeedback?.id === id) setSelectedFeedback(null);
        } catch (err) { setError("Delete failed."); }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        api.defaults.headers.common["Authorization"] = "";
        setUser(null);
        navigate("/login", { replace: true });
    };

    return (
        <div className="min-h-screen bg-[#080808] text-neutral-200 flex overflow-hidden font-sans selection:bg-blue-500/30">

            {/* MOBILE OVERLAY */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-60 lg:hidden"
                    />
                )}
            </AnimatePresence>
            {error}
            {/* SIDEBAR */}
            <aside className={`
                fixed inset-y-0 left-0 z-70 w-64 bg-[#0D0D0F] border-r border-white/5 
                lg:static lg:translate-x-0 transition-all duration-500 ease-[0.2, 1, 0.2, 1]
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-10 px-2">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <LuMessagesSquare className="text-white" size={16} />
                            </div>
                            <span className="text-sm font-bold tracking-tight text-white uppercase">Nexus v1</span>
                        </div>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-neutral-500"><IoClose size={20} /></button>
                    </div>

                    <nav className="space-y-1 flex-1">
                        {[
                            { id: 'pulse', label: 'Dashboard', icon: <IoGridOutline size={18} /> },
                            { id: 'insights', label: 'Inbox', icon: <LuInbox size={18} />, count: unreadCount }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => { setActiveTab(item.id as any); setIsSidebarOpen(false); }}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === item.id ? 'bg-white/5 text-white' : 'text-neutral-500 hover:text-neutral-200 hover:bg-white/2'}`}
                            >
                                <div className="flex items-center gap-3 font-medium text-sm">
                                    {item.icon} {item.label}
                                </div>
                                {item.count !== undefined && item.count > 0 && (
                                    <span className="bg-blue-600 text-[10px] text-white px-1.5 py-0.5 rounded-md font-bold">{item.count}</span>
                                )}
                            </button>
                        ))}
                    </nav>

                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:text-red-400 transition-colors mt-auto font-medium text-sm border-t border-white/5 pt-6">
                        <IoLogOutOutline size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <header className="h-20 flex items-center justify-between px-8 shrink-0 border-b border-white/3">
                    <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 bg-white/5 rounded-lg text-neutral-400"><IoMenu size={22} /></button>

                    <div className="hidden lg:flex items-center gap-2">
                        <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">System</span>
                        <span className="text-[10px] font-bold text-neutral-400">/</span>
                        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{activeTab}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className={`text-[10px] font-bold uppercase tracking-tighter px-2 py-1 rounded border ${loading ? 'text-neutral-500 border-neutral-800' : 'text-green-500 border-green-500/20 bg-green-500/5'}`}>
                            {loading ? 'Syncing...' : 'Connected'}
                        </div>
                        <button onClick={() => fetchFeedbacks(true)} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-neutral-400 transition-all active:scale-95">
                            <IoRefresh className={loading ? "animate-spin" : ""} size={16} />
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === 'pulse' ? (
                                <AdminAnalytics feedbacks={feedbacks} />
                            ) : (
                                <div className="space-y-2 max-w-6xl mx-auto">
                                    {feedbacks.length === 0 ? (
                                        <div className="py-32 text-center border border-dashed border-white/5 rounded-4xl">
                                            <p className="text-neutral-600 text-xs font-bold uppercase tracking-widest italic">Signal archive empty</p>
                                        </div>
                                    ) : (
                                        feedbacks.map((fb) => (
                                            <div
                                                key={fb.id}
                                                onClick={() => handleSelectFeedback(fb)}
                                                className={`group flex items-center gap-5 p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${!readIds.includes(fb.id) ? 'bg-[#121215] border-white/10' : 'bg-transparent border-white/3 opacity-60 hover:opacity-100 hover:bg-white/'}`}
                                            >
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold shrink-0 text-xs ${!readIds.includes(fb.id) ? 'bg-blue-600/10 text-blue-500' : 'bg-neutral-800 text-neutral-500'}`}>
                                                    {fb.name?.[0] || 'V'}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className={`text-sm font-semibold truncate ${!readIds.includes(fb.id) ? 'text-white' : 'text-neutral-400'}`}>
                                                            {fb.name || "Anonymous Visitor"}
                                                        </h4>
                                                        {!readIds.includes(fb.id) && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />}
                                                    </div>
                                                    <p className="text-neutral-500 text-xs truncate mt-0.5">{fb.text}</p>
                                                </div>
                                                <div className="hidden sm:flex flex-col items-end shrink-0 text-[10px] text-neutral-600 font-medium tracking-tighter uppercase">
                                                    <span>{new Date(fb.created_at).toLocaleDateString()}</span>
                                                    <span>{fb.ip_address.slice(0, 15)}</span>
                                                </div>
                                                <button onClick={(e) => handleDelete(e, fb.id)} className="p-2 text-neutral-700 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
                                                    <IoTrashOutline size={18} />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {/* MESSAGE MODAL */}
            <AnimatePresence>
                {selectedFeedback && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }}
                            className="bg-[#0F0F12] w-full max-w-2xl rounded-4xl border border-white/10 p-10 relative overflow-hidden shadow-2xl"
                        >
                            <button onClick={() => setSelectedFeedback(null)} className="absolute top-8 right-8 p-2 text-neutral-500 hover:text-white transition-colors"><IoClose size={24} /></button>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-xl font-bold">
                                    {selectedFeedback.name?.[0] || "V"}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white leading-tight">{selectedFeedback.name || "Visitor"}</h3>
                                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-1">Origin: {selectedFeedback.ip_address}</p>
                                </div>
                            </div>

                            <div className="bg-white/2 p-8 rounded-2xl border border-white/5 text-lg text-neutral-200 leading-relaxed mb-8">
                                {selectedFeedback.text}
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-2">
                                        <IoTimeOutline className="text-blue-500" /> {new Date(selectedFeedback.created_at).toLocaleString()}
                                    </div>
                                    <div className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-2">
                                        <IoGlobeOutline className="text-blue-500" /> Web_Inbound
                                    </div>
                                </div>
                                <button onClick={(e) => handleDelete(e, selectedFeedback.id)} className="w-full sm:w-auto px-6 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">
                                    Delete Record
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};