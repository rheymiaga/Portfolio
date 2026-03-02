import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 15;
            const y = (e.clientY / window.innerHeight - 0.5) * 15;
            const bg = document.getElementById('scotch-bg');
            if (bg) {
                bg.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

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
                setError("Access key rejected. System mismatch.");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Verification failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen text-gray-100 p-6 overflow-hidden poppins">

            <motion.div
                id="scotch-bg"
                className="absolute inset-0 bg-cover bg-center opacity-5 pointer-events-none grayscale will-change-transform"
                style={{ backgroundImage: `url(${Scotch})` }}
            />

            <div className="absolute top-[-10%] left-[-10%] w-lg h-128 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-lg h-128 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                className="w-full max-w-md z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="bg-[#0D0D0D]/40 border border-white/10 shadow-2xl rounded-[2.5rem] p-10 backdrop-blur-3xl relative">

                    <div className="flex flex-col items-center mb-10">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            whileHover={{ rotate: 15 }}
                            className="p-4 bg-linear-to-br from-white/10 to-transparent rounded-2xl mb-5 border border-white/10 shadow-xl"
                        >
                            <IoShieldCheckmarkOutline className="text-white text-3xl" />
                        </motion.div>
                        <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white to-neutral-500">
                            Portal Login
                        </h2>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-8">
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-red-500/10 border border-red-500/20 rounded-xl p-3"
                                >
                                    <p className="text-red-400 text-xs font-medium text-center">{error}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Email Field */}
                        <div className="relative group">
                            <motion.label
                                initial={false}
                                animate={{
                                    y: (focusedField === 'email' || email) ? -32 : 0,
                                    x: (focusedField === 'email' || email) ? -38 : 0,
                                    scale: (focusedField === 'email' || email) ? 0.85 : 1,
                                    color: (focusedField === 'email' || email) ? '#f9fafb' : '#4b5563'
                                }}
                                className="absolute left-12 top-4 pointer-events-none text-sm font-medium z-10"
                            >
                                Email Address
                            </motion.label>
                            <div className={`relative flex items-center bg-white/5 border rounded-2xl transition-all duration-300 ${focusedField === 'email' ? 'border-white/30 bg-white/10' : 'border-white/5'}`}>
                                <IoMailOutline className={`absolute left-4 text-xl transition-colors duration-300 ${focusedField === 'email' ? 'text-white' : 'text-neutral-600'}`} />
                                <input
                                    type="email"
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-transparent text-white pl-12 pr-4 py-4 focus:outline-none text-sm"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="relative group">
                            <motion.label
                                initial={false}
                                animate={{
                                    y: (focusedField === 'password' || password) ? -32 : 0,
                                    x: (focusedField === 'password' || password) ? -38 : 0,
                                    scale: (focusedField === 'password' || password) ? 0.85 : 1,
                                    color: (focusedField === 'password' || password) ? '#f9fafb' : '#4b5563'
                                }}
                                className="absolute left-12 top-4 pointer-events-none text-sm font-medium z-10"
                            >
                                Security Keyphrase
                            </motion.label>
                            <div className={`relative flex items-center bg-white/5 border rounded-2xl transition-all duration-300 ${focusedField === 'password' ? 'border-white/30 bg-white/10' : 'border-white/5'}`}>
                                <IoLockClosedOutline className={`absolute left-4 text-xl transition-colors duration-300 ${focusedField === 'password' ? 'text-white' : 'text-neutral-600'}`} />
                                <input
                                    type="password"
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-transparent text-white pl-12 pr-4 py-4 focus:outline-none text-sm"
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: "#f3f4f6" }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                            className="w-full py-4 bg-white text-black font-bold rounded-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            ) : (
                                "Verify Identity"
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-10 pt-6 border-t border-white/5 flex flex-col items-center gap-4">
                        <Link
                            to="/"
                            className="group flex items-center gap-2 text-[11px] text-neutral-500 hover:text-white transition-all uppercase tracking-[0.2em]"
                        >
                            <IoArrowBackOutline className="group-hover:-translate-x-1 transition-transform" />
                            Return to Portfolio
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};