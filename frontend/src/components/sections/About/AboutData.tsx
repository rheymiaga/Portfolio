



export const tabContent: Record<string, React.ReactNode> = {
    "Background.tsx": (
        <code className="block font-mono text-sm text-slate-200">
            {[
                <span>
                    <span className="text-pink-400">export</span>{" "}
                    <span className="text-blue-400">const</span>{" "}
                    <span className="text-blue-300">Background</span> ={" "}
                    <span className="text-pink-400">()</span>{" "}
                    <span className="text-blue-300">{`=>`}</span>{" "}
                    <span className="text-yellow-400">{"{"}</span>
                </span>,
                <span className="text-pink-400">{`  return (`}</span>,
                <span className="text-blue-400">{`    <section>`}</span>,
                <span className="text-blue-400">{`      <h1>`}</span>,
                <span className="text-slate-200">{"         "}
                    Background
                </span>,
                <span className="text-blue-400">{`      </h1>`}</span>,
                <span className="text-blue-400">{`      <p>`}</span>,
                <span className="text-slate-200">{"         "}
                    I began my journey as a solo game developer on Roblox during the 2019
                </span>,
                <span className="text-slate-200">{"         "}
                    pandemic. What started as a hobby quickly grew into a passion, and
                </span>,
                <span className="text-slate-200">{"         "}
                    through creating games I discovered my interest in software
                </span>,
                <span className="text-slate-200">{"         "}
                    engineering. Over time, I set a personal goal: before entering my
                </span>,
                <span className="text-slate-200">{"         "}
                    third year of college, I wanted to become a full-stack developer to
                </span>,
                <span className="text-slate-200">{"         "}
                    prepare for my upcoming capstone project. I’m proud to say I achieved
                </span>,
                <span className="text-slate-200">{"         "}
                    that milestone ahead of schedule. Now, as I continue my second year
                </span>,
                <span className="text-slate-200">{"         "}
                    and move into my third trimester in March 2026, I’m excited to keep
                </span>,
                <span className="text-slate-200">{"         "}
                    building on this foundation. What began as a pastime has evolved into
                </span>,
                <span className="text-slate-200">{"         "}
                    a clear career path, and I’m motivated to grow further as a developer
                </span>,
                <span className="text-slate-200">{"         "}
                    and future software engineer.
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
                    <span className="w-6 flex shrink-0 text-right pr-2 border-r border-neutral-800 bg-neutral-900 text-neutral-500 select-none">
                        {i + 1}
                    </span>

                    <div className="flex-1">
                        <span className="px-2 whitespace-pre">{line}</span>
                    </div>
                </div>
            ))}
        </code>
    ),
    "SomeFacts.tsx": (
        <code className="block font-mono text-sm  text-slate-200">
            {[
                <span>
                    <span className="text-pink-400">import </span>
                    <span className="text-blue-200"><span className="text-yellow-400">{`{ `}</span>FaCoffee<span className="text-yellow-400">{` }`}</span> <span className="text-pink-400">from</span><span> <span className="text-orange-300">"react-icons/fa"</span>{`;`}</span></span>

                </span>,
                <span>
                    <span className="text-pink-400">export</span>{" "}
                    <span className="text-blue-400">const</span> <span className="text-blue-300">SomeFacts</span> = <span className="text-pink-400">()</span> <span className="text-blue-300">{`=>`}</span> <span className="text-yellow-400">{"{"}</span>
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
                <span className="text-blue-400">{`      <ul>`}</span>,
                <span className="text-blue-400">{`          <li>`}</span>,
                <span>
                    <span className="text-blue-200 mr-4"><span className="text-slate-500">{`              <`}</span><span className="text-emerald-500">FaCoffee</span><span className="text-slate-400">{`/> `}</span><span className="text-white">Drinking 3+ coffees a day</span></span>
                </span>,
                <span className="text-blue-400">{`          </li>`}</span>,
                <span className="text-blue-400">{`          <li>`}</span>,
                <span>
                    <span className="text-blue-200 mr-4"><span className="text-slate-500">{`              <`}</span><span className="text-emerald-500">BsStack</span><span className="text-slate-400">{`/> `}</span><span className="text-white">Exploring new tech and tools to grow as a developer</span></span>
                </span>,
                <span className="text-blue-400">{`          </li>`}</span>,
                <span className="text-blue-400">{`      <ul>`}</span>,
                <span className="text-blue-400">{`    </section>`}</span>,
                <span className="text-pink-400">{`  );`}</span>,
                <span className="text-yellow-400">{"};"}</span>,
            ].map((line, i) => (
                <div
                    key={i}
                    className="flex w-full group hover:bg-neutral-700 transition-colors"
                >
                    <span className="w-6 flex shrink-0 text-right pr-2 border-r border-neutral-800 bg-neutral-900 text-neutral-500 select-none">
                        {i + 1}
                    </span>
                    <div className="flex-1">
                        <span className="pl-2 whitespace-pre">{line}</span>
                    </div>
                </div>
            ))}
        </code>
    ),
    "Scotch.tsx": (
        <code className="block font-mono text-sm text-slate-200">
            {[
                <span>
                    <span className="text-pink-400">import </span>
                    <span className="text-blue-200">
                        <span className="text-yellow-400">{`{ `}</span>
                        scotchImages
                        <span className="text-yellow-400">{` }`}</span>{" "}
                        <span className="text-pink-400">from</span>
                        <span> <span className="text-orange-300">"/Portfolio/scotchImages"</span>{`;`}</span>
                    </span>
                </span>,

                <span>
                    <span className="text-pink-400">export</span>{" "}
                    <span className="text-blue-400">const</span>{" "}
                    <span className="text-blue-300">Scotch</span> ={" "}
                    <span className="text-pink-400">()</span>{" "}
                    <span className="text-blue-300">{`=>`}</span>{" "}
                    <span className="text-yellow-400">{"{"}</span>
                </span>,

                <span className="text-pink-400">{`  return (`}</span>,
                <span className="text-blue-400">{`    <section className="space-y-4">`}</span>,

                <span className="text-slate-200">{"         "}
                    Scotch
                </span>,
                <span className="text-blue-400">{`      </h1>`}</span>,
                <span className="text-blue-400">{`      <p>`}</span>,
                <span className="text-slate-200">{"         "}
                    The dog you see in the background image is my Shih Tzu, Scotch.
                </span>,
                <span className="text-slate-200">{"         "}
                    He is a playful and loyal companion, and I consider him my best friend.
                </span>,
                <span className="text-blue-400">{`      </p>`}</span>,

                <span className="text-blue-400">{`      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">`}</span>,
                <span className="text-blue-400">{`        {scotchImages.map((img, i) => (`}</span>,

                <span className="text-blue-400">{`          <div key={i}>`}</span>,
                <span className="text-blue-400">{`             <img src={img} alt="Scotch the Shih Tzu"/>`}</span>,
                <span className="text-blue-400">{`          </div>`}</span>,

                <span className="text-blue-400">{`        ))}`}</span>,
                <span className="text-blue-400">{`      </div>`}</span>,

                <span className="text-blue-400">{`    </section>`}</span>,
                <span className="text-pink-400">{`  );`}</span>,
                <span className="text-yellow-400">{"};"}</span>,
            ].map((line, i) => (
                <div
                    key={i}
                    className="flex w-full group hover:bg-neutral-700 transition-colors"
                >
                    <span className="w-6 flex shrink-0 text-right pr-2 border-r border-neutral-800 bg-neutral-900 text-neutral-500 select-none">
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


