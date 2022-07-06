import { playlistIdState, playlistState } from '@@atoms';
import { ImageLoader } from '@@components';
import { useSpotify } from '@@hooks';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { shuffle } from 'lodash';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Songs from './Songs.component';

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
    const spotifyApi = useSpotify();

    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState<any>(playlistState);

    const [color, setColor] = useState<any>(null);

    useEffect(() => {
        setColor(shuffle(colors).pop());
        if (spotifyApi.getAccessToken() && playlistId) {
            spotifyApi.getPlaylist(playlistId as string)
                .then((data: any) => { setPlaylist(data.body) })
                .catch((err) => console.log("something went wrong!", err))
        }
    }, [playlistId]);

    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <header className="absolute top-5 right-8">
                <div className="flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2" onClick={() => signOut()}>
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <ImageLoader
                            layout="fill"
                            src={session?.user?.image as string}
                            alt={`avatar-${session?.user?.name}`}
                        />
                    </div>
                    <h2>{session?.user?.name}</h2>
                    <ChevronDownIcon className="h-5 w-5" />
                </div>
            </header>

            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
                <div className="relative h-44 w-44 shadow-2xl">
                    <ImageLoader
                        layout="fill"
                        src={playlist?.images?.[0]?.url}
                        alt={`playlist-${playlist?.name}`}
                    />
                </div>
                <div>
                    <p>PLAYLIST</p>
                    <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
                        {playlist?.name}
                    </h1>
                </div>
            </section>

            <div>
                <Songs />
            </div>
        </div>
    )
}

export default Center