import { useState, useEffect, useCallback } from "react";
import { FooterLinks } from "./FooterLinks";
import api from "../../api";

export const Footer = () => {
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [remaining, setRemaining] = useState<number>(2);
    const [cooldown, setCooldown] = useState<number>(0);

    const getDeviceId = () => {
        let id = localStorage.getItem("portfolio_device_id");
        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem("portfolio_device_id", id);
        }
        return id;
    };

    const resetCooldown = useCallback(() => {
        localStorage.removeItem("feedbackExpiry");
        localStorage.setItem("feedbackCount", "0");
        setRemaining(2);
        setCooldown(0);
    }, []);

    useEffect(() => {
        const storedExpiry = localStorage.getItem("feedbackExpiry");
        const storedCount = localStorage.getItem("feedbackCount") || "0";

        if (storedExpiry) {
            const now = Date.now();
            const expiry = parseInt(storedExpiry, 10);

            if (now < expiry) {
                setRemaining(0);
                setCooldown(Math.floor((expiry - now) / 1000));
            } else {
                resetCooldown();
            }
        } else {
            const count = parseInt(storedCount, 10);
            setRemaining(Math.max(0, 2 - count));
        }
    }, [resetCooldown]);

    useEffect(() => {
        if (cooldown <= 0) return;

        const interval = setInterval(() => {
            setCooldown((prev) => {
                if (prev <= 1) {
                    resetCooldown();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [cooldown, resetCooldown]);

    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError(null);
                setSuccess(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim() || loading) return;

        if (remaining <= 0 && cooldown > 0) {
            setError("You are currently on cooldown.");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await api.post("/api/feedbacks", {
                name: name.trim() || null,
                text: text.trim(),
                deviceId: getDeviceId()
            });

            const currentCount = parseInt(localStorage.getItem("feedbackCount") || "0", 10);
            const newCount = currentCount + 1;
            localStorage.setItem("feedbackCount", newCount.toString());

            const newRemaining = Math.max(0, 2 - newCount);
            setRemaining(newRemaining);

            if (newCount >= 2) {
                const twelveHoursInMs = 12 * 60 * 60 * 1000;
                const expiryTime = Date.now() + twelveHoursInMs;
                localStorage.setItem("feedbackExpiry", expiryTime.toString());
                setCooldown(12 * 60 * 60);
            }

            setName("");
            setText("");
            setSuccess("Feedback received! Thanks for helping me grow. ✨");
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to send. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds: number) => {
        if (seconds <= 0) return "0h 0m 0s";
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}h ${m}m ${s}s`;
    };

    return (
        <footer className="bg-[#171717] text-white border-t border-neutral-800 poppins">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-16 px-6 max-w-6xl mx-auto">
                <div className="flex flex-col justify-between">
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium tracking-tight">Work With Me</h3>
                        <p className="text-neutral-400 text-[15px] leading-relaxed max-w-md">
                            I focus on building clean, functional applications and I'm
                            always open to discussing new projects or creative collaborations.
                        </p>
                        <FooterLinks />
                    </div>
                    <div className="mt-8 pt-8 border-t border-neutral-800 hidden md:block">
                        <p className="text-neutral-500 text-xs tracking-widest uppercase">
                            Available for freelance projects
                        </p>
                    </div>
                </div>

                <div className="bg-[#1f1f1f] p-8 rounded-2xl border border-neutral-800 shadow-xl">
                    <h3 className="text-lg font-medium mb-2">Leave Feedback</h3>
                    <p className="text-neutral-400 text-sm mb-6">
                        Your insights help me grow as a developer.
                    </p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Name (Optional)"
                            value={name}
                            disabled={loading || remaining <= 0}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
                        />
                        <textarea
                            placeholder="What's on your mind?"
                            rows={3}
                            value={text}
                            disabled={loading || remaining <= 0}
                            onChange={(e) => {
                                setText(e.target.value);
                                if (error) setError(null);
                            }}
                            className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none disabled:opacity-50"
                        ></textarea>

                        <button
                            type="submit"
                            disabled={loading || remaining <= 0 || !text.trim()}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl text-sm font-semibold transition-all disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed shadow-lg"
                        >
                            {loading ? "Sending..." : remaining <= 0 ? "On Cooldown" : "Send Message"}
                        </button>

                        <div className="min-h-5 flex items-center justify-center">
                            {error && <p className="text-red-400 text-xs text-center">{error}</p>}
                            {success && <p className="text-emerald-400 text-xs font-medium text-center">{success}</p>}
                            {!error && !success && (
                                remaining > 0 ? (
                                    <p className="text-neutral-500 text-xs">
                                        {remaining} attempt{remaining > 1 ? "s" : ""} left
                                    </p>
                                ) : (
                                    <p className="text-amber-500 text-xs flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                                        Cooldown: {formatTime(cooldown)}
                                    </p>
                                )
                            )}
                        </div>
                    </form>
                </div>
            </div>

            <div className="border-t border-neutral-800/50 py-8 text-center">
                <p className="text-neutral-500 text-xs font-light tracking-wide">
                    &copy; {new Date().getFullYear()} RHEY LOUIE MIAGA
                </p>
            </div>
        </footer>
    );
};