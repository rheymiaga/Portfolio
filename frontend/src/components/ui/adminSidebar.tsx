import { IoGridOutline, IoLogOutOutline } from "react-icons/io5";
import { LuInbox } from "react-icons/lu";
import icon from '../../assets/images/Icon.png'

interface AdminSidebarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (open: boolean) => void;
    activeTab: "dashboard" | "inbox";
    setActiveTab: (tab: "dashboard" | "inbox") => void;
    unreadCount: number;
    handleLogout: () => void;
    error: string | null;
}

export const AdminSidebar = ({
    isSidebarOpen,
    setIsSidebarOpen,
    activeTab,
    setActiveTab,
    unreadCount,
    handleLogout,
    error
}: AdminSidebarProps) => {
    return (
        <aside className={`
            fixed inset-y-0 left-0 z-70 w-72 bg-neutral-950 border-r border-neutral-800
            lg:static lg:translate-x-0 transition-transform duration-500 ease-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            <div className="p-8 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-12 px-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(0,0,4,0.4)]">
                        <img src={icon} alt="Rhey icon" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-black tracking-[0.2em] text-white uppercase">Rei</span>
                        <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Admin</span>
                    </div>
                </div>

                <nav className="space-y-2 flex-1">
                    {[
                        { id: 'dashboard', label: 'Dashboard', icon: <IoGridOutline size={18} /> },
                        { id: 'inbox', label: 'Inbox', icon: <LuInbox size={18} />, count: unreadCount }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => { setActiveTab(item.id as any); setIsSidebarOpen(false); }}
                            className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all group ${activeTab === item.id
                                ? 'bg-white/5 text-white border border-white/5 shadow-inner'
                                : 'text-neutral-600 hover:text-neutral-300'
                                }`}
                        >
                            <div className="flex items-center gap-4 font-black text-[11px] tracking-widest uppercase">
                                <span className={activeTab === item.id ? "text-emerald-500" : "text-neutral-700"}>
                                    {item.icon}
                                </span>
                                {item.label}
                            </div>
                            {item.count !== undefined && item.count > 0 && (
                                <span className="bg-blue-600 text-[10px] text-white px-2 py-0.5 rounded-md font-black animate-pulse">
                                    {item.count}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>
                <div className="mt-auto pt-6 border-t border-white/5">
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl mb-4">
                            <p className="text-[9px] font-black text-red-500 uppercase">{error}</p>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-5 py-4 text-neutral-600 hover:text-red-500 transition-all font-black text-[11px] tracking-widest uppercase"
                    >
                        <IoLogOutOutline size={20} /> Logout
                    </button>
                </div>
            </div>
        </aside>
    );
};