import { useState, useEffect } from "react";
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

    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError(null);
                setSuccess(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    useEffect(() => {
        const storedDate = localStorage.getItem("feedbackDate");
        const storedCount = localStorage.getItem("feedbackCount");
        const today = new Date().toDateString();

        if (storedDate === today && storedCount) {
            const count = parseInt(storedCount, 10);
            setRemaining(Math.max(0, 2 - count));

            if (count >= 2) {
                const now = new Date();
                const tomorrow = new Date();
                tomorrow.setHours(24, 0, 0, 0);
                const diff = Math.floor((tomorrow.getTime() - now.getTime()) / 1000);
                setCooldown(diff);
            }
        } else {
            localStorage.setItem("feedbackDate", today);
            localStorage.setItem("feedbackCount", "0");
            setRemaining(2);
            setCooldown(0);
        }
    }, []);

    useEffect(() => {
        if (cooldown > 0) {
            const interval = setInterval(() => {
                setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [cooldown]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const deviceId = getDeviceId();

        try {
            if (remaining <= 0) {
                setError("Daily limit reached for this device.");
                return;
            }

            await api.post(
                "/api/feedbacks",
                { name, text, deviceId },
                { headers: { "Content-Type": "application/json" } }
            );

            const today = new Date().toDateString();
            const count = parseInt(localStorage.getItem("feedbackCount") || "0", 10) + 1;
            localStorage.setItem("feedbackDate", today);
            localStorage.setItem("feedbackCount", count.toString());

            setRemaining(Math.max(0, 2 - count));
            setName("");
            setText("");
            setSuccess("Thank you! Your feedback has been received.");
        } catch (err: any) {
            const msg = err.response?.data?.message || "Failed to submit feedback";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}h ${m}m ${s}s`;
    };

    return (
        <footer className="bg-[#171717] text-white border-t border-neutral-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-16 px-6 max-w-6xl mx-auto">

                <div className="flex flex-col justify-between poppins">
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium tracking-tight">Work With Me</h3>
                        <p className="text-neutral-400 text-[15px] leading-relaxed max-w-md">
                            I’m open to projects, commissions, and collaborations, with a focus
                            on contributing meaningful work and delivering creative, professional
                            solutions.
                        </p>
                        <FooterLinks />
                    </div>
                    <div className="mt-8 pt-8 border-t border-neutral-800 hidden md:block">
                        <p className="text-neutral-500 text-xs poppins tracking-widest uppercase">
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
                        <div>
                            <input
                                type="text"
                                placeholder="Name (Optional)"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="What's on your mind?"
                                rows={3}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || remaining <= 0}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-indigo-900/20"
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>

                        <div className="min-h-5">
                            {error && (
                                <p className="text-red-400 text-xs animate-pulse">{error}</p>
                            )}
                            {success && (
                                <p className="text-emerald-400 text-xs font-medium">{success}</p>
                            )}
                            {!error && !success && (
                                remaining > 0 ? (
                                    <p className="text-neutral-500 text-xs">
                                        {remaining} attempt{remaining > 1 ? "s" : ""} available today
                                    </p>
                                ) : (
                                    <p className="text-amber-500 text-xs">
                                        Resets in {formatTime(cooldown)}
                                    </p>
                                )
                            )}
                        </div>
                    </form>
                </div>
            </div>

            <div className="border-t poppins border-neutral-800/50 py-8 text-center">
                <p className="text-neutral-500 text-xs font-light tracking-wide">
                    &copy; {new Date().getFullYear()} RHEY LOUIE MIAGA
                </p>
            </div>
        </footer>
    );
};