import { useState, useRef, useEffect } from "react";
import { RiRobot3Fill } from "react-icons/ri";
import api from "../../api";

interface Message {
    sender: "user" | "bot";
    text: string;
}

export const ReiBot = () => {
    const [openChat, setOpenChat] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    useEffect(() => {
        if (openChat && messages.length === 0) {
            setMessages([
                {
                    sender: "bot",
                    text: "Hi! I'm Rei, Rhey's AI assistant. Ask me anything about his projects, skills, or even his dog, Scotch! 🚀"
                }
            ]);
        }
    }, [openChat, messages.length]);

    const sendMessage = async () => {
        if (!input.trim() || isTyping) return;

        const userMessage = input;
        setInput("");
        setMessages(prev => [...prev, { sender: "user", text: userMessage }]);
        setIsTyping(true);

        try {
            const res = await api.post("/api/chat", { message: userMessage });

            if (res.data && res.data.reply) {
                setMessages(prev => [...prev, { sender: "bot", text: res.data.reply }]);
            } else {
                throw new Error("Empty response from server");
            }
        } catch (error: any) {
            console.error("Rei Connection Error:", error);

            let errorMessage = "⚠️ Rei is experiencing a brain freeze.";

            if (error.response?.status === 429) {
                errorMessage = "☕ Whoa! I'm moving a bit too fast. Give me a moment to breathe!";
            } else if (error.code === "ERR_NETWORK") {
                errorMessage = "⏳ Network error. The server might be waking up or your internet is offline.";
            } else if (error.response?.data?.reply) {
                errorMessage = error.response.data.reply;
            }

            setMessages(prev => [...prev, { sender: "bot", text: errorMessage }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            <div className="fixed bottom-10 right-10 z-50">
                <button
                    onClick={() => setOpenChat(!openChat)}
                    className="relative flex items-center justify-center p-3 rounded-full bg-neutral-900 shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                    <RiRobot3Fill className="text-white text-2xl" />
                    <span className={`absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full transition-opacity duration-500 ${openChat ? "opacity-0" : "opacity-100 animate-pulse"}`}></span>
                </button>
            </div>

            {openChat && (
                <div className="fixed bottom-24 right-1/2 translate-x-1/2 sm:right-10 sm:translate-0 bg-neutral-800/90 backdrop-blur-md border border-white/30 rounded-lg shadow-xl w-80 h-96 flex flex-col z-40 overflow-hidden">
                    <header className="flex items-center justify-between px-3 py-2 bg-black/80 border-b border-white/30">
                        <div className="flex items-center gap-2 text-white">
                            <span className="w-2 h-2 bg-green-500 animate-pulse rounded-full"></span>
                            <RiRobot3Fill />
                            <p className="font-semibold">Rei</p>
                        </div>
                        <button onClick={() => setOpenChat(false)} className="text-white opacity-70 hover:opacity-100 transition-transform">✕</button>
                    </header>

                    <div ref={chatContainerRef} className="flex-1 p-4 space-y-4 overflow-y-auto text-white text-sm scroll-smooth">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "flex-col gap-2"}`}>
                                {msg.sender === "bot" && (
                                    <div className="flex items-center gap-2">
                                        <RiRobot3Fill className="text-2xl p-1 rounded-full bg-neutral-600 text-green-400" />
                                        <p className="font-semibold text-xs opacity-70">Rei</p>
                                    </div>
                                )}
                                <div className={`p-3 rounded-lg max-w-[85%] shadow-sm ${msg.sender === "user" ? "bg-neutral-600 ml-auto" : "bg-neutral-700/80 mr-auto"}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex flex-col gap-2 animate-in fade-in duration-300">
                                <div className="flex items-center gap-2">
                                    <RiRobot3Fill className="text-2xl p-1 rounded-full bg-neutral-600 text-green-400 animate-bounce" />
                                    <p className="font-semibold text-xs opacity-70">Rei is thinking...</p>
                                </div>
                                <div className="bg-neutral-700/50 rounded-lg p-3 w-20 flex justify-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2 p-3 border-t border-white/30 bg-neutral-900/80">
                        <input
                            type="text"
                            value={input}
                            disabled={isTyping}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && sendMessage()}
                            className="flex-1 px-3 py-2 rounded bg-black/60 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-neutral-500 disabled:opacity-50"
                            placeholder={isTyping ? "Thinking..." : "Ask Rei a question..."}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={isTyping || !input.trim()}
                            className="px-4 py-2 rounded bg-neutral-600 text-white text-sm font-medium hover:bg-neutral-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isTyping ? "..." : "Send"}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};