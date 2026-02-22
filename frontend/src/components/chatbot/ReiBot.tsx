
import { useState } from "react";
import { RiRobot3Fill } from "react-icons/ri";

export const ReiBot = () => {
    const [openChat, setOpenChat] = useState(false)
    return (
        <>
            <div className=" fixed bottom-10 right-10 rounded z-50">
                <div className="items-center relative backdrop-blur-xl rounded-lg">
                    <span className={`w-2 h-2 bg-green-500 ${openChat ? 'opacity-0' : 'opacity-100 animate-pulse'} transition-all duration-500 ease-in-out  rounded-full absolute`}></span>
                    <button onClick={() => setOpenChat(!openChat)} className="flex p-2 cinzel font-semibold">
                        <RiRobot3Fill className="flex shrink-0 text-white text-2xl hover:scale-105 opacity-90 hover:opacity-100 transform transition-all duration-300 ease-in-out" />
                    </button>
                </div>
            </div>
            {openChat && (
                <div className="fixed bottom-22 right-1/2 translate-x-1/2 sm:translate-0 sm:right-20 sm:bottom-15 bg-gray-800/50 flex flex-col justify-between backdrop-blur-xs rounded border-2 border-white/60 w-80 h-96 z-10">
                    <header className=" px-2 bg-black/90 rounded border-b-2  border-white/60 text-white/50 text-xl flex items-center justify-between gap-1">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-500 animate-pulse rounded-full"></span>
                            <div className=" flex items-center">
                                <RiRobot3Fill />
                                <p>rei </p>
                            </div>
                        </span>
                        <button onClick={() => setOpenChat(false)} className="p-2 cormorant opacity-80 hover:opacity-100 hover:scale-105">x</button>
                    </header>

                    <div>

                    </div>

                    <input type="text" className="min-h-10 bg-black/60 rounded w-full border-t-2 border-white/60 text-white p-2" placeholder="Message rei or ask a question" />
                </div>
            )}
        </>
    )
}
