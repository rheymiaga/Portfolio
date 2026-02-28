



export const tabContent: Record<string, React.ReactNode> = {
    "AboutSection.tsx": (
        <code className="block font-mono text-sm  text-slate-200">
            {[
                <span>
                    <span className="text-pink-400">import </span>
                    <span className="text-blue-200"><span className="text-yellow-400">{`{ `}</span>FaCoffee<span className="text-yellow-400">{` }`}</span> <span className="text-pink-400">from</span><span> <span className="text-orange-300">"react-icons/fa"</span>{`;`}</span></span>

                </span>,
                <span>
                    <span className="text-pink-400">export</span>{" "}
                    <span className="text-blue-400">const</span> <span className="text-blue-300">aboutMe</span> = <span className="text-pink-400">()</span> <span className="text-blue-300">{`=>`}</span> <span className="text-yellow-400">{"{"}</span>
                </span>,
                <span className="text-pink-400">{`  return (`}</span>,
                <span className="text-blue-400">{`    <section>`}</span>,
                <span className="text-blue-400">{`      <h1>`}</span>,
                <span className="text-slate-200">          Extra Notes</span>
                , <span className="text-blue-400">{`      </h1>`}</span>,

                <span className="text-blue-400">{`      <h3>`}</span>,
                <span className="text-slate-200">          Recently, I've been:</span>,
                <span className="text-blue-400">{`      </h3>`}</span>,
                ,

                <span className="text-blue-400">{`      <p>`}</span>,
                <span>
                    <span className="text-blue-200 mr-4"><span className="text-slate-500">{`        <`}</span><span className="text-emerald-500">FaCoffee</span><span className="text-slate-400">{`/> `}</span><span className="text-white">Drinking 3+ coffees a day on average</span></span>
                </span>,
                <span className="text-blue-400">{`      </p>`}</span>,
                <span className="text-blue-400">{`    </section>`}</span>,
                <span className="text-pink-400">{`  );`}</span>,
                <span className="text-yellow-400">{"};"}</span>,
            ].map((line, i) => (
                <div
                    key={i}
                    className="flex w-full group hover:bg-neutral-700 transition-colors"
                >
                    <span className="w-10 flex shrink-0 text-right pr-3 bg-neutral-800 text-neutral-500 select-none">
                        {i + 1}
                    </span>
                    <div className="flex-1">
                        <span className="pl-2 whitespace-pre">{line}</span>
                    </div>
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
                <div
                    key={i}
                    className="flex w-full group hover:bg-neutral-700 transition-colors"
                >
                    <span className="w-10 flex shrink-0 text-right pr-3 bg-neutral-800 text-neutral-500 select-none">
                        {i + 1}
                    </span>

                    <div className="flex-1 ">
                        <span className="pl-2 whitespace-pre">{line}</span>
                    </div>
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
                <div
                    key={i}
                    className="flex w-full group hover:bg-neutral-700 transition-colors"
                >

                    <span className="w-10 flex shrink-0 text-right pr-3 bg-neutral-800 text-neutral-500 select-none">
                        {i + 1}
                    </span>


                    <div className="flex-1">
                        <span className="pl-2 whitespace-pre">{line}</span>
                    </div>
                </div>
            ))}
        </code>
    ),

};


