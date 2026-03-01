import Scotch1 from '../../../assets/images/Scotch1.jpeg'
import Scotch2 from '../../../assets/images/Scotch2.jpeg'
import Scotch3 from '../../../assets/images/Scotch3.jpeg'
import Scotch4 from '../../../assets/images/Scotch4.jpeg'

import { FaCoffee } from 'react-icons/fa';
import { BsStack } from 'react-icons/bs';

interface scotchImagesProps {
    name: string
    img: string
}

const scotchImages: scotchImagesProps[] = [
    {
        name: 'scotch Image1',
        img: Scotch1
    },
    {
        name: 'scotch Image2',
        img: Scotch2
    },
    {
        name: 'scotch Image3',
        img: Scotch3
    },
    {
        name: 'scotch Image4',
        img: Scotch4
    },

]

interface LineProps {
    icon: React.ReactNode
    info: string
}

const codeLines: LineProps[] = [
    {
        icon: <FaCoffee className="shrink-0 flex" />,
        info: " Drinking 3+ coffees a day"
    },
    {
        icon: <BsStack className="shrink-0 flex" />,
        info: "Exploring new tech and tools to grow as a developer"
    },
]

export const ScotchOutput = () => {

    return (
        <div className="flex flex-col gap-1">
            <div className="flex w-full items-center">
                <h1>Scotch</h1>
            </div>
            <div className="flex w-full items-center gap-2 overflow-auto">
                <ul>
                    <li className="flex w-full items-cente">
                        The dog you see in the background image is my Shih Tzu, Scotch.
                    </li>
                    <li className="flex w-full items-center">
                        He is playful, loyal, and I consider him my best friend.
                    </li>
                </ul>

            </div>
            <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 '>
                {scotchImages.map((s) => (
                    <img className='object-contain' src={s.img} alt={s.name} />
                ))}
            </div>
        </div>
    )
}

export const SomeFactsOutput = () => {
    return (
        <div className="flex flex-col gap-1">
            <div className=" flex w-full items-center">
                <h1>Extra Notes</h1>
            </div>
            <div className=" flex w-full items-center">
                <h3>Recently, I've been:</h3>
            </div>
            <div className=" flex w-full items-center gap-2 overflow-auto">
                <ul className=''>
                    {codeLines.map((l) => (
                        <li className='flex w-full items-center gap-1 ' key={l.info}>
                            {l.icon}
                            {l.info}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export const BackgroundOutput = () => {
    return (
        <div className="flex flex-col gap-2 ">
            <h1 className="">Background</h1>
            <p>
                I began my journey as a solo game developer on Roblox during the 2019 pandemic.
                What started as a hobby quickly grew into a passion, and through creating games
                I discovered my interest in software engineering. Over time, I set a personal goal:
                before entering my third year of college, I wanted to become a full-stack developer
                to prepare for my upcoming capstone project. I’m proud to say I achieved that milestone
                ahead of schedule.
            </p>
            <p>
                Now, as I continue my second year and move into my third trimester in March 2026,
                I’m excited to keep building on this foundation. What began as a pastime has evolved
                into a clear career path, and I’m motivated to grow further as a developer and future
                software engineer.
            </p>
        </div>
    )
}