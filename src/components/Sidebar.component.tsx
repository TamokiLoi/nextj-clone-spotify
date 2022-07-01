import { useSpotify } from '@@hooks';
import {
    HeartIcon,
    HomeIcon,
    LibraryIcon,
    PlusCircleIcon,
    RssIcon,
    SearchIcon
} from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

function Sidebar() {
    const { data: session, status } = useSession();
    const spotifyApi = useSpotify();

    const [playlists, setPlaylists] = useState<any[]>();
    const [playlistId, setPlaylistId] = useState<string>('');

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists()
                .then((data: any) => {
                    setPlaylists(data.body.items);
                });
        }
    }, [session, spotifyApi]);

    return (
        <div className="text-gray-500 p-5 text-sm border-r border-gray-900
            overflow-y-scroll scrollbar-hide h-screen">
            <div className="space-y-4">
                {session && (
                    <button
                        onClick={() => signOut()}
                        className="flex items-center space-x-2 hover:text-white">
                        <p>Log Out</p>
                    </button>
                )}
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
                    <HeartIcon className="h-5 w-5" />
                    <p>Liked Songs</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="h-5 w-5" />
                    <p>Your Episodes</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />

                {/* Playlists */}
                {playlists?.map((playlist: any) => (
                    <p
                        key={playlist.id}
                        onClick={() => setPlaylistId(playlist.id)}
                        className="cursor-pointer hover:text-white">
                        {playlist?.name}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default Sidebar