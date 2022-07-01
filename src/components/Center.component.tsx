import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';

const colors = [
    "from-indigo-400",
    "from-blue-400",
    "from-green-400",
    "from-red-400",
    "from-yellow-400",
    "from-pink-400",
    "from-purple-400",
]

function Center() {
    const { data: session } = useSession();

    const [color, setColor] = useState<any>(null);

    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, []);

    return (
        <div className="flex-grow">
            <header className="absolute top-5 right-8">
                <div className="flex items-center bg-black text-white space-x-3 opacity-90
                    hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        className="rounded-full w-10 h-10"
                        src={session?.user?.image as string}
                        alt={`avatar-${session?.user?.name}`}
                    />
                    <h2>{session?.user?.name}</h2>
                    <ChevronDownIcon className="h-5 w-5" />
                </div>
            </header>

            <section className={`flex items-end space-x-7 bg-gradient-to-b
                to-black ${color} h-80 text-white padding-8 w-full`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {/* <img
                    className="rounded-full w-10 h-10"
                    src={session?.user?.image as string}
                    alt={`avatar-${session?.user?.name}`}
                /> */}
                <h1>hello</h1>
            </section>
        </div>
    )
}

export default Center