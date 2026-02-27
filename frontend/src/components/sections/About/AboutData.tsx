export const tabContent: Record<string, React.ReactNode> = {
    "AboutSection.tsx": (
        <code className="block font-mono text-sm  text-slate-200">
            {[
                <span>
                    <span className="text-pink-400">export</span>{" "}
                    <span className="text-blue-400">const</span> <span className="text-blue-300">AboutSection</span> = <span className="text-pink-400">()</span> <span className="text-blue-300">{`=>`}</span> <span className="text-yellow-400">{"{"}</span>
                </span>,
                <span className="text-pink-400">{`  return (`}</span>,
                <span className="text-blue-400">{`    <section>`}</span>,
                <>
                    <span className="text-blue-400">{`      <h1>`}</span>
                    <span className="text-slate-200">.....</span>
                    <span className="text-blue-400">{`</h1>`}</span>
                </>,
                <>
                    <span className="text-blue-400">{`      <h2>`}</span>
                    <span className="text-slate-200">....</span>
                    <span className="text-blue-400">{`</h2>`}</span>
                </>,
                <>
                    <span className="text-blue-400">{`      <p>`}</span>
                    <span className="text-slate-200"></span>
                    <span className="text-blue-400">{`</p>`}</span>
                </>,
                <span className="text-blue-400">{`    </section>`}</span>,
                <span className="text-pink-400">{`  );`}</span>,
                <span className="text-yellow-400">{"};"}</span>,
            ].map((line, i) => (
                <div key={i} className="flex w-full group hover:bg-neutral-700 transition-colors">
                    <span className="w-10 text-right pr-3 bg-neutral-800 text-neutral-500 select-none">
                        {i + 1}
                    </span>
                    <span className="pl-2 whitespace-pre">{line}</span>
                </div>
            ))}
        </code>
    ),

    "Info.tsx": (
        <code className="block font-mono text-sm text-slate-200">
            {[
                <span>
                    <span className="text-pink-400">export</span>{" "}
                    <span className="text-blue-400">const</span> <span className="text-blue-300">Info</span> = <span className="text-pink-400">()</span> <span className="text-blue-300">{`=>`}</span> <span className="text-yellow-400">{"{"}</span>
                </span>,
                <span className="text-pink-400">{`  return (`}</span>,
                <span className="text-blue-400">{`    <section>`}</span>,
                <>
                    <span className="text-blue-400">{`      <p>`}</span>
                    <span className="text-slate-200">....</span>
                    <span className="text-blue-400">{`</p>`}</span>
                </>,
                <>
                    <span className="text-blue-400">{`      <p>`}</span>
                    <span className="text-slate-200">....</span>
                    <span className="text-blue-400">{`</p>`}</span>
                </>,
                <span className="text-blue-400">{`    </section>`}</span>,
                <span className="text-pink-400">{`  );`}</span>,
                <span className="text-yellow-400">{"};"}</span>,
            ].map((line, i) => (
                <div key={i} className="flex w-full group hover:bg-neutral-700 transition-colors">
                    <span className="w-10 text-right pr-3 bg-neutral-800 text-neutral-500 select-none">
                        {i + 1}
                    </span>
                    <span className="pl-2 whitespace-pre">{line}</span>
                </div>
            ))}
        </code>
    ),

    "Hobbies.tsx": (
        <code className="block font-mono text-sm text-slate-200">
            {[
                <span>
                    <span className="text-pink-400">export</span>{" "}
                    <span className="text-blue-400">const</span> <span className="text-blue-300">Hobbies</span> = <span className="text-pink-400">()</span> <span className="text-blue-300">{`=>`}</span> <span className="text-yellow-400">{"{"}</span>
                </span>,
                <span className="text-pink-400">{`  return (`}</span>,
                <span className="text-blue-400">{`    <section>`}</span>,
                <span className="text-blue-400">{`      <ul>`}</span>,
                <>
                    <span className="text-blue-400">{`        <li>`}</span>
                    <span className="text-slate-200">...</span>
                    <span className="text-blue-400">{`</li>`}</span>
                </>,
                <>
                    <span className="text-blue-400">{`        <li>`}</span>
                    <span className="text-slate-200">....</span>
                    <span className="text-blue-400">{`</li>`}</span>
                </>,
                <>
                    <span className="text-blue-400">{`        <li>`}</span>
                    <span className="text-slate-200">....</span>
                    <span className="text-blue-400">{`</li>`}</span>
                </>,
                <span className="text-blue-400">{`      </ul>`}</span>,
                <span className="text-blue-400">{`    </section>`}</span>,
                <span className="text-pink-400">{`  );`}</span>,
                <span className="text-yellow-400">{"};"}</span>,
            ].map((line, i) => (
                <div key={i} className="flex w-full group hover:bg-neutral-700 transition-colors">
                    <span className="w-10 text-right pr-3 bg-neutral-800 text-neutral-500 select-none">
                        {i + 1}
                    </span>
                    <span className="pl-2 whitespace-pre">{line}</span>
                </div>
            ))}
        </code>
    ),
};