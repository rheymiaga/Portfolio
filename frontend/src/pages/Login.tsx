import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import api from "../api";
import { IoLockClosedOutline, IoMailOutline, IoArrowBackOutline } from "react-icons/io5";
import icon from '../assets/images/Icon.png'
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
                className="w-full max-w-md z-10 relative group"
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >

                <div className="absolute -inset-2 bg-linear-to-r from-white/10 to-transparent rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="bg-neutral-900/80 border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.7)] relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />

                    <div className="relative z-20 space-y-10">
                        <div className="flex flex-col items-center space-y-6">
                            <motion.div
                                whileHover={{ rotate: 15, scale: 1.1 }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />
                                <div className="relative overflow-hidden w-20 h-20 bg-neutral-800 border border-white/10 rounded-2xl flex items-center justify-center">
                                    <img src={icon} alt="rei icon" className="w-full h-full object-contain rounded-2xl p-2" />
                                </div>
                            </motion.div>

                            <div className="text-center space-y-2">
                                <h2 className="text-2xl font-black tracking-[0.2em] text-white uppercase poppins">
                                    Admin
                                </h2>
                                <p className="text-[10px] text-neutral-500 uppercase tracking-[0.4em] font-medium">
                                    Sign in to continue
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="bg-red-500/5 border border-red-500/20 rounded-2xl py-3 px-4 flex items-center gap-3"
                                    >
                                        <div className="w-1 h-1 bg-red-500 rounded-full animate-ping" />
                                        <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest">{error}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {[
                                { id: 'email', label: 'Email Address', type: 'email', val: email, set: setEmail, icon: IoMailOutline },
                                { id: 'password', label: 'Security Key', type: 'password', val: password, set: setPassword, icon: IoLockClosedOutline }
                            ].map((field) => (
                                <div key={field.id} className="relative group/input">
                                    <motion.label
                                        initial={false}
                                        animate={{
                                            y: (focusedField === field.id || field.val) ? -32 : 0,
                                            scale: (focusedField === field.id || field.val) ? 0.75 : 1,
                                            opacity: (focusedField === field.id || field.val) ? 1 : 0.4,
                                        }}
                                        className="absolute left-12 top-4 pointer-events-none text-xs uppercase tracking-[0.2em] font-bold text-white origin-left z-30"
                                    >
                                        {field.label}
                                    </motion.label>

                                    <div className={`relative flex items-center bg-white/2 border rounded-2xl transition-all duration-500 overflow-hidden ${focusedField === field.id ? 'border-white/40 bg-white/5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]' : 'border-white/5 group-hover/input:border-white/10'}`}>
                                        <field.icon className={`ml-4 text-xl transition-all duration-300 ${focusedField === field.id ? 'text-white scale-110' : 'text-neutral-600'}`} />
                                        <input
                                            type={field.type}
                                            value={field.val}
                                            onChange={(e) => field.set(e.target.value)}
                                            onFocus={() => setFocusedField(field.id)}
                                            onBlur={() => setFocusedField(null)}
                                            required
                                            className="w-full bg-transparent text-white px-4 py-3 focus:outline-none text-sm relative z-20 font-light placeholder-transparent"
                                        />
                                        <div className={`absolute inset-0 bg-linear-to-r from-white/5 to-transparent transition-opacity duration-500 ${focusedField === field.id ? 'opacity-100' : 'opacity-0'}`} />
                                    </div>
                                </div>
                            ))}

                            <motion.button
                                whileHover={{ scale: 1.01, backgroundColor: "#fff" }}
                                whileTap={{ scale: 0.98 }}
                                disabled={loading}
                                className="group relative w-full py-4 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl transition-all disabled:opacity-50 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                            >
                                <span className="relative z-10">{loading ? "" : "Login"}</span>
                                {loading && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                    </div>
                                )}
                                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-linear-to-r from-transparent via-white/40 to-transparent group-hover:animate-shine" />
                            </motion.button>
                        </form>

                        <div className="pt-8 border-t border-white/5 text-center">
                            <Link
                                to="/"
                                className="group inline-flex items-center gap-3 text-[9px] text-neutral-500 hover:text-white transition-all uppercase tracking-[0.4em] font-bold"
                            >
                                <IoArrowBackOutline className="text-xs group-hover:-translate-x-2 transition-transform duration-300" />
                                Return to Portfolio
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};