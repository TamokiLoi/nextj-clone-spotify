import { playlistIdState } from '@@atoms';
import { useSpotify } from '@@hooks';
import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    RssIcon,
} from '@heroicons/react/outline';
import { HeartIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

function Sidebar() {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();

    const [playlists, setPlaylists] = useState<any[]>();
    const [playlistId, setPlaylistId] = useRecoilState<any>(playlistIdState);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists({ limit: 50, offset: 0 })
                .then((data: any) => {
                    setPlaylists(data.body.items);
                    setPlaylistId(data.body.items[0].id)
                })
                .catch((err) => console.log("something went wrong!", err))
        }
    }, [spotifyApi]);

    return (
        <div className="text-gray-500 p-5 border-r border-gray-900 h-screen text-xs lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline pb-36">
            <div className="relative space-y-4">
                {/* {session && (
                    <button
                        onClick={() => signOut()}
                        className="flex items-center space-x-2 hover:text-white">
                        <p>Log Out</p>
                    </button>
                )} */}
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="h-5 w-5" />
                    <p>Search</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className="h-5 w-5" />
                    <p>Your Library</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />
                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Create Playlist</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5 text-blue-500" />
                    <p>Liked Songs</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="h-5 w-5 text-green-500" />
                    <p>Your Episodes</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />

                {/* Playlists */}
                <div className="space-y-4 overflow-y-scroll scrollbar-hide h-[calc(100vh-300px)] pb-5">
                    {playlists?.map((playlist: any) => (
                        <p
                            key={playlist.id}
                            onClick={() => setPlaylistId(playlist.id)}
                            className={`cursor-pointer hover:text-white truncate ${playlistId == playlist.id && 'text-white'}`}>
                            {playlist?.name}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar