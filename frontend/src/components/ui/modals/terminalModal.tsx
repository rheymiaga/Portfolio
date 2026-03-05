import { FiRadio } from "react-icons/fi";

interface TerminalModalProps {
    output: React.ReactNode | null;
    setShowLive: React.Dispatch<React.SetStateAction<boolean>>;
    setOutput: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
    handleRunCode: () => void;
    activeTab: string;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
    output,
    setShowLive,
    setOutput,
    handleRunCode,
    activeTab,
}) => {
    return (
        <>
            <div className={`fixed bottom-0 w-full left-0 bg-neutral-950 text-green-400 font-mono text-sm ${output ? "h-32" : "h-8"} border-t border-neutral-700`}>
                <div className="flex justify-between items-center bg-neutral-950 px-2 py-1 text-xs text-neutral-300 border-b border-neutral-900">
                    <span>{output ? "OUTPUT" : "TERMINAL"}</span>
                    <div className="flex gap-2">
                        <button
                            title="Click to run live server"
                            onClick={() => {
                                setShowLive(true);
                                handleRunCode();
                            }}
                            className="flex gap-1 items-center text-neutral-400 hover:bg-neutral-600 px-2 py-1 rounded text-xs"
                        >
                            <FiRadio /> Go Live
                        </button>

                        <button
                            title="Hide Panel"
                            onClick={() => setOutput(null)}
                            className={`text-neutral-400 ${output ? 'inline' : 'hidden'} hover:bg-neutral-600 rounded-lg font-bold px-2`}
                        >
                            ✕
                        </button>
                    </div>
                </div>
                <div className="p-2 overflow-y-auto h-20">
                    <span>C:\Portfolio\{activeTab}</span>
                    {output}
                    <span className="animate-pulse">...|</span>
                </div>
            </div>
        </>
    );
};