import { FooterLinks } from "./FooterLinks";

export const Footer = () => {
    return (
        <footer className="bg-neutral-800 text-white border-t-2 border-t-neutral-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 poppins px-3 max-w-6xl mx-auto">

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Work With Me</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                        I’m open to projects, commissions, and collaborations,
                        with a focus on contributing meaningful work and delivering creative, professional solutions.
                    </p>
                    <p className="text-neutral-400 text-sm">
                        Get in touch via email or explore my work on GitHub:
                    </p>
                    <FooterLinks />
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Feedback</h3>
                    <p className="text-neutral-400 text-sm">
                        I welcome your feedback to enhance my work and future projects.
                    </p>
                    <form className="space-y-3">
                        <input
                            type="text"
                            placeholder="Your name (optional)"
                            className="w-full px-3 py-2 rounded bg-neutral-800 text-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <textarea
                            placeholder="Your feedback..."
                            rows={2}
                            className="w-full px-3 py-2 rounded bg-neutral-800 text-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded text-sm font-medium transition"
                        >
                            Submit Feedback
                        </button>
                    </form>
                </div>
            </div>

            <div className="border-t poppins border-neutral-800/50 py-4 text-center text-sm text-neutral-500">
                © Rhey Louie Miaga, {new Date().getFullYear()}
            </div>
        </footer>
    );
};
