interface TerminalBtnsProps {
    setShowLive: React.Dispatch<React.SetStateAction<boolean>>;
    setOutput: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
    handleRunCode: () => void;
}

export const TerminalBtns: React.FC<TerminalBtnsProps> = ({ setShowLive, setOutput, handleRunCode }) => {
    return (
        <>
            <button
            title="Click to run live server"
                onClick={() => {
                    setShowLive(true);
                    handleRunCode();
                }}
                className="text-neutral-400 hover:bg-neutral-600 px-2 py-1 rounded text-xs"
            >
                Go Live
            </button>

            <button
            title="Hide Panel"
                onClick={() => setOutput(null)}
                className="text-neutral-400 hover:bg-neutral-600 rounded-lg font-bold px-2"
            >
                ✕
            </button>
        </>
    );
};