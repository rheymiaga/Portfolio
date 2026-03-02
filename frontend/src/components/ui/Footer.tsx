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


    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError(null);
                setSuccess(null);
            }, 3000);
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

        try {
            if (remaining <= 0) {
                setError("Daily limit reached.");
                return;
            }

            await api.post(
                "/api/feedbacks",
                { name, text },
                { headers: { "Content-Type": "application/json" } }
            );

            const today = new Date().toDateString();
            const count = parseInt(localStorage.getItem("feedbackCount") || "0", 10) + 1;
            localStorage.setItem("feedbackDate", today);
            localStorage.setItem("feedbackCount", count.toString());

            setRemaining(Math.max(0, 2 - count));

            if (count >= 2) {
                const now = new Date();
                const tomorrow = new Date();
                tomorrow.setHours(24, 0, 0, 0);
                const diff = Math.floor((tomorrow.getTime() - now.getTime()) / 1000);
                setCooldown(diff);
            }

            setName("");
            setText("");
            setSuccess("Thanks for your feedback!");
        } catch (err) {
            console.error("Error submitting feedback:", err);
            setError("Failed to submit feedback");
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
        <footer className="bg-neutral-800 text-white border-t-2 border-t-neutral-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 poppins px-3 max-w-6xl mx-auto">
                {/* Work With Me Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Work With Me</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                        I’m open to projects, commissions, and collaborations, with a focus
                        on contributing meaningful work and delivering creative, professional
                        solutions.
                    </p>
                    <p className="text-neutral-400 text-sm">
                        Get in touch via email or explore my work on GitHub:
                    </p>
                    <FooterLinks />
                </div>

                {/* Feedback Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Feedback</h3>
                    <p className="text-neutral-400 text-sm">
                        I welcome your feedback to enhance my work and future projects.
                    </p>

                    <form className="space-y-3" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Your name (optional)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-neutral-800 text-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <textarea
                            placeholder="Your feedback..."
                            rows={2}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-neutral-800 text-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        ></textarea>
                        <button
                            type="submit"
                            disabled={loading || remaining <= 0}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded text-sm font-medium transition disabled:opacity-50"
                        >
                            {loading ? "Submitting..." : "Submit Feedback"}
                        </button>

                        {error && (
                            <p className="text-red-500 text-sm mt-2 transition-opacity duration-500">
                                {error}
                            </p>
                        )}
                        {success && (
                            <p className="text-green-400 text-sm mt-2 transition-opacity duration-500">
                                {success}
                            </p>
                        )}

                        {remaining > 0 ? (
                            <p className="text-green-400 text-sm mt-2">
                                {remaining} feedback{remaining > 1 ? "s" : ""} left today.
                            </p>
                        ) : (
                            <p className="text-yellow-400 text-sm mt-2">
                                Limit reached. Try again in {formatTime(cooldown)}.
                            </p>
                        )}
                    </form>
                </div>
            </div>

            <div className="border-t poppins border-neutral-800/50 py-4 text-center text-sm text-neutral-500">
                © Rhey Louie Miaga, {new Date().getFullYear()}
            </div>
        </footer>
    );
};
