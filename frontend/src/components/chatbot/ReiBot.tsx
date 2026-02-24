import { useState } from "react";
import { RiRobot3Fill } from "react-icons/ri";

export const ReiBot = () => {
    const [openChat, setOpenChat] = useState(false);

    return (
        <>

            <div className="fixed bottom-10 right-10 z-50">
                <button
                    onClick={() => setOpenChat(!openChat)}
                    className="relative flex items-center justify-center p-3 rounded-full bg-neutral-900 shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                    <RiRobot3Fill className="text-white text-2xl" />
                    <span
                        className={`absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full transition-opacity duration-500 ${openChat ? "opacity-0" : "opacity-100 animate-pulse"
                            }`}
                    ></span>
                </button>
            </div>

            {openChat && (
                <div className="fixed bottom-24 right-10 bg-neutral-800/90 backdrop-blur-md border border-white/30 rounded-lg shadow-xl w-80 h-96 flex flex-col z-40">
                    <header className="flex items-center justify-between px-3 py-2 bg-black/80 border-b border-white/30 rounded-t-lg">
                        <div className="flex items-center gap-2 text-white">
                            <span className="w-2 h-2 bg-green-500 animate-pulse rounded-full"></span>
                            <RiRobot3Fill />
                            <p className="font-semibold">Rei</p>
                        </div>
                        <button
                            onClick={() => setOpenChat(false)}
                            className="text-white opacity-70 hover:opacity-100 hover:scale-110 transition-transform"
                        >
                            ✕
                        </button>
                    </header>

                    <div className="flex-1 p-4 space-y-4 overflow-y-auto text-white text-sm font-poppins">

                        <div className="text-center bg-red-600 text-white py-2 rounded-md shadow-md">
                            Feature still in development 
                        </div>

                        {/* Bot Message */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <RiRobot3Fill className="flex shrink-0 text-2xl p-1 rounded-full bg-neutral-600 text-green-400" />
                                <p className="font-semibold">Rei</p>
                            </div>
                            <div className="bg-neutral-700/80 rounded-lg p-3 max-w-[80%] text-left shadow-sm">
                                Hello there! How can I assist you today?
                                <span className="block opacity-70 mt-1 text-xs">
                                    (Ask about Rhey's Portfolio)
                                </span>
                            </div>
                        </div>

                        {/* User Message */}
                        <div className="flex justify-end">
                            <div className="bg-neutral-600 rounded-lg p-3 max-w-[80%] shadow-sm">
                                Sample Text Message Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ratione dolor ipsum culpa architecto blanditiis alias fugiat nihil, corporis earum aliquid, corrupti eos voluptate distinctio! Consequuntur, nisi. Officia, esse culpa?
                            </div>
                        </div>
                    </div>


                    <div className="flex items-center gap-2 p-3 border-t border-white/30 bg-neutral-900/80 rounded-b-lg">
                        <input
                            type="text"
                            className="flex-1 px-3 py-2 rounded bg-black/60 text-white text-sm placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-neutral-500 transition"
                            placeholder="Ask Rei a question..."
                        />
                        <button className="px-4 py-2 rounded bg-neutral-600 text-white text-sm font-medium hover:bg-neutral-500 transition">
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
