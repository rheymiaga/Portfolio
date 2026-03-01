import { useState, useEffect } from "react";
import { FooterLinks } from "./FooterLinks";
import api from "../../api";

interface Feedback {
    id: number;
    name?: string | null;
    text: string;
    ip_address: string;
    created_at: string;
}

export const Footer = () => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [name, setName] = useState("");
    const [text, setText] = useState("");

    // Fetch feedbacks on mount
    useEffect(() => {
        api.get(`${import.meta.env.VITE_API_URL}/api/feedbacks`)
            .then((res) => {
                if (res.data.data) {
                    setFeedbacks(res.data.data);
                }
            })
            .catch((err) => console.error("Error fetching feedbacks:", err));
    }, []);

    // Submit feedback
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post(
                `${import.meta.env.VITE_API_URL}/api/feedbacks`,
                { name, text },
                { headers: { "Content-Type": "application/json" } }
            );

            if (res.data.data) {
                setFeedbacks((prev) => [res.data.data, ...prev]);
                setName("");
                setText("");
            }
        } catch (err) {
            console.error("Error submitting feedback:", err);
        }
    };

    // Delete feedback
    const handleDelete = async (id: number) => {
        try {
            const res = await api.delete(
                `${import.meta.env.VITE_API_URL}/api/feedbacks/${id}`
            );

            if (res.data.status === 200) {
                setFeedbacks((prev) => prev.filter((fb) => fb.id !== id));
            }
        } catch (err) {
            console.error("Error deleting feedback:", err);
        }
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

                    {/* Feedback Form */}
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
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded text-sm font-medium transition"
                        >
                            Submit Feedback
                        </button>
                    </form>

                    {/* Feedback List */}
                    <div className="space-y-2 mt-4">
                        {feedbacks.map((fb) => (
                            <div
                                key={fb.id}
                                className="bg-neutral-700 p-3 rounded text-sm text-neutral-200 flex justify-between items-start"
                            >
                                <div>
                                    <p className="font-semibold">{fb.name ?? "Anonymous"}</p>
                                    <p>{fb.text}</p>
                                    <p className="text-xs text-neutral-400">
                                        {new Date(fb.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(fb.id)}
                                    className="text-red-400 hover:text-red-600 text-xs ml-4"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t poppins border-neutral-800/50 py-4 text-center text-sm text-neutral-500">
                © Rhey Louie Miaga, {new Date().getFullYear()}
            </div>
        </footer>
    );
};