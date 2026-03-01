import { IoIosInformationCircleOutline } from "react-icons/io";

interface WebsiteModalProps {
    showLive: boolean;
    setShowLive: React.Dispatch<React.SetStateAction<boolean>>;
    activeTab: string;
    output: React.ReactNode | null;
}

export const WebsiteModal: React.FC<WebsiteModalProps> = ({ showLive, setShowLive, activeTab, output }) => {
    const host = <span className="text-white">localhost:5173</span>;

    return (
        <>
            {showLive && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-neutral-800 w-11/12 md:w-3/4 lg:w-2/3 rounded-t-lg rounded-b-sm shadow-lg overflow-hidden">
                        <div className="flex items-center bg-neutral-700 px-3 py-2">
                            <div className="flex gap-2 mr-3">
                                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                            </div>

                            <div className="flex-1 flex items-center overflow-auto bg-neutral-700 border border-neutral-500 rounded-full px-2 py-1 text-xs text-neutral-400">
                                <span className="truncate flex items-center gap-1">
                                    <IoIosInformationCircleOutline />
                                    <span>http://{host}/Portfolio/{activeTab}</span>
                                </span>
                            </div>

                            <button
                                onClick={() => setShowLive(false)}
                                className="ml-3 text-neutral-200 hover:bg-red-500 font-bold px-2"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="px-1 pb-1 bg-neutral-700 text-white poppins text-sm h-[70vh]">
                            <div className="p-2 shadow-[inset_0_2px_3px_var(--color-neutral-900)] h-full border border-neutral-600 overflow-y-auto rounded-lg bg-neutral-800">
                                {output ? output : <span className="text-red-400">No output available</span>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};