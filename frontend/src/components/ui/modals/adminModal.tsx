import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

interface Feedback {
    id: number;
    name?: string | null;
    text: string;
    ip_address: string;
    created_at: string;
}

interface AdminModalProps {
    selectedFeedback: Feedback | null;
    onClose: () => void;
    onDelete: (e: React.MouseEvent, id: number) => void;
}

export const AdminModal = ({ selectedFeedback, onClose, onDelete }: AdminModalProps) => {
    return (
        <AnimatePresence>
            {selectedFeedback && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 20 }}
                        className="bg-neutral-900 w-full space-y-4 max-w-2xl max-h-[90vh] overflow-y-auto rounded-4xl border border-neutral-700 p-6 relative shadow-2xl"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 bg-neutral-800 rounded-full text-neutral-500 hover:text-white transition-all"
                        >
                            <IoClose size={20} />
                        </button>
                        <div className="flex items-center poppins gap-2 lg:gap-3">
                            <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-2xl font-black text-white">
                                {selectedFeedback.name?.[0] || "V"}
                            </div>
                            <div>
                                <h3 className="text-base lg:text-2xl font-black text-white uppercase leading-relaxed">
                                    {selectedFeedback.name || "Anonymous"}
                                </h3>
                                <span className="text-[8px] font-black text-emerald-500/60 uppercase tracking-widest block mt-1">
                                    message
                                </span>
                            </div>
                        </div>

                        <div className="bg-neutral-950 p-6 rounded-2xl border poppins border-white/5 text-sm lg:text-lg text-neutral-300 leading-relaxed whitespace-pre-wrap">
                            {selectedFeedback.text}
                        </div>

                        <div className="flex poppins justify-between items-center gap-6 pt-3 border-t border-white/5">
                            <div className="flex flex-col">
                                <span className="text-[8px] font-black text-neutral-600 uppercase tracking-widest mb-1">Time</span>
                                <span className="text-[10px] text-neutral-400 font-bold">
                                    {new Date(selectedFeedback.created_at).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                            <button
                                onClick={(e) => onDelete(e, selectedFeedback.id)}
                                className=" p-4 bg-neutral-600/10 hover:bg-red-600 text-neutral-500 hover:text-white border border-neutral-500/20 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};