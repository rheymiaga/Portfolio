import { TerminalBtns } from "../buttons/terminalBtns";

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
            {output && (
                <div className="fixed bottom-0 w-full left-0 bg-black text-green-400 font-mono text-sm h-28 border-t border-neutral-700">
                    <div className="flex justify-between items-center bg-neutral-900 px-2 py-1 text-xs text-neutral-300 border-b border-neutral-700">
                        <span>Terminal</span>
                        <div className="flex gap-2">
                            <TerminalBtns
                                setShowLive={setShowLive}
                                setOutput={setOutput}
                                handleRunCode={handleRunCode}
                            />
                        </div>
                    </div>
                    <div className="p-2 overflow-y-auto h-20">
                        <span>C:\Portfolio\{activeTab}</span>
                        {output}
                        <span className="animate-pulse">...|</span>
                    </div>
                </div>
            )}
        </>
    );
};