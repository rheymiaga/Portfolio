import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import api from "../api";
import { IoLockClosedOutline, IoMailOutline, IoShieldCheckmarkOutline, IoArrowBackOutline } from "react-icons/io5";
import type { User } from "../App";
import Scotch from '../assets/images/SccotchPixelated.png';

type LoginProps = {
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const Login = ({ setUser }: LoginProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const navigate = useNavigate();

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 60, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 60, damping: 20 });

    const rotateX = useTransform(mouseY, [-300, 300], [3, -3]);
    const rotateY = useTransform(mouseX, [-300, 300], [-3, 3]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - (rect.left + rect.width / 2));
        y.set(e.clientY - (rect.top + rect.height / 2));
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await api.post("/api/auth/login", { email, password });
            const { token, admin: adminData } = res.data.data || {};
            if (token && adminData) {
                localStorage.setItem("token", token);
                api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                setUser(adminData);
                navigate("/admin", { replace: true });
            } else {
                setError("Credentials rejected.");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Verification failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="relative flex items-center justify-center min-h-screen bg-[#050505] text-neutral-200 p-6 overflow-hidden selection:bg-white/10"
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="absolute inset-0 opacity-25 grayscale pointer-events-none z-0"
                style={{
                    backgroundImage: `url(${Scotch})`,
                    backgroundSize: '280px',
                    x: useTransform(mouseX, (v) => v * -0.03),
                    y: useTransform(mouseY, (v) => v * -0.03),
                    filter: "contrast(1.2) brightness(0.8)"
                }}
            />

            <div className="absolute top-0 left-1/4 w-150 h-150 bg-blue-500/10 blur-[140px] rounded-full pointer-events-none z-0" />
            <div className="absolute bottom-0 right-1/4 w-150 h-150 bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none z-0" />

            <motion.div
                className="w-full max-w-md z-10"
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="bg-neutral-900/70 border border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
                    <div className="relative z-20">

                        <div className="flex flex-col items-center mb-12">
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.8 }}
                                className="p-4 bg-white/5 border border-white/10 rounded-2xl mb-4"
                            >
                                <IoShieldCheckmarkOutline className="text-white text-3xl" />
                            </motion.div>
                            <h2 className="text-3xl font-bold tracking-tight text-white uppercase">Admin</h2>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-8">
                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center"
                                    >
                                        <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest">{error}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            {[
                                { id: 'email', label: 'Admin Identifier', type: 'email', val: email, set: setEmail, icon: IoMailOutline },
                                { id: 'password', label: 'Security Key', type: 'password', val: password, set: setPassword, icon: IoLockClosedOutline }
                            ].map((field) => (
                                <div key={field.id} className="relative group">
                                    <motion.label
                                        initial={false}
                                        animate={{
                                            y: (focusedField === field.id || field.val) ? -28 : 0,
                                            scale: (focusedField === field.id || field.val) ? 0.8 : 1,
                                            color: (focusedField === field.id || field.val) ? "#ffffff" : "#525252",
                                        }}
                                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                        className="absolute left-12 top-4 pointer-events-none text-sm font-medium origin-left z-30"
                                    >
                                        {field.label}
                                    </motion.label>

                                    <div className={`relative flex items-center bg-white/3 border rounded-2xl transition-all duration-500 ${focusedField === field.id ? 'border-white/30 bg-white/[0.07] ring-1 ring-white/10' : 'border-white/5'}`}>
                                        <field.icon className={`ml-4 text-xl transition-colors duration-300 ${focusedField === field.id ? 'text-white' : 'text-neutral-600'}`} />
                                        <input
                                            type={field.type}
                                            value={field.val}
                                            onChange={(e) => field.set(e.target.value)}
                                            onFocus={() => setFocusedField(field.id)}
                                            onBlur={() => setFocusedField(null)}
                                            required
                                            className="w-full bg-transparent text-white px-4 py-4 focus:outline-none text-sm relative z-20"
                                        />
                                    </div>
                                </div>
                            ))}

                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: "#ffffff" }}
                                whileTap={{ scale: 0.98 }}
                                disabled={loading}
                                className="w-full py-4 bg-neutral-100 text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl transition-all disabled:opacity-50 flex items-center justify-center shadow-xl"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                ) : "Initiate Login"}
                            </motion.button>
                        </form>

                        <div className="mt-10 pt-6 border-t border-white/5 text-center">
                            <Link
                                to="/"
                                className="group inline-flex items-center gap-2 text-[10px] text-neutral-500 hover:text-white transition-all uppercase tracking-[0.3em]"
                            >
                                <IoArrowBackOutline className="group-hover:-translate-x-1 transition-transform" />
                                Return to Portfolio
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};