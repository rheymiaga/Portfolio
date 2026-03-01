import { FaReact } from "react-icons/fa6";
import { IoPlayOutline } from "react-icons/io5";

interface RunBtnsProps {
    tabContent: Record<string, React.ReactNode>;
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    handleRunCode: () => void;
}

export const RunBtns: React.FC<RunBtnsProps> = ({ tabContent, activeTab, setActiveTab, handleRunCode }) => {
    return (
        <>
            {Object.keys(tabContent).map((tab) => (
                <button
                    key={tab}
                    title={`C:\\Portfolio\\ ${tab}`}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-2 gap-1 transition-colors flex items-center ${activeTab === tab
                            ? "bg-neutral-800 text-neutral-100 border-t border-blue-500 border-b-0"
                            : "hover:bg-neutral-700 text-neutral-400 border-r border-b border-neutral-700"
                        }`}
                >
                    <FaReact className="text-cyan-400" /> {tab}
                </button>
            ))}

            <button
                onClick={handleRunCode}
                title="Run Code"
                className="sticky right-0 top-0 shrink-0 p-2.5 bg-neutral-900 hover:bg-neutral-600 ml-auto"
            >
                <IoPlayOutline />
            </button>
        </>
    );
};