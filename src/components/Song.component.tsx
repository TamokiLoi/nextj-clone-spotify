import { trackIdState, isPlayingState } from '@@atoms';
import { ImageLoader } from '@@components';
import { useSpotify } from '@@hooks';
import { useRecoilState } from 'recoil';
import { millisToMinutesAndSeconds } from '../lib';

type Props = {
    track: Track,
    order: number,
}

function Song({ track, order }: Props) {
    const spotifyApi = useSpotify();

    const [currentTrackId, setCurrentTrackId] = useRecoilState<any>(trackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState<boolean>(isPlayingState);

    const playSong = async () => {
        console.log('track', track);
        setCurrentTrackId(track.id);
        setIsPlaying(true);
        try {
            await spotifyApi.play({ uris: [track.uri] })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="grid grid-cols-2 text-gray-500 py-1 px-5 hover:bg-gray-900 rounded-lg" onClick={playSong}>
            <div className="flex items-center space-x-4">
                <div className="w-[20px] text-center">{order + 1}</div>
                <div className="relative h-10 w-10">
                    <ImageLoader
                        layout="fill"
                        src={track?.album?.images?.[0]?.url}
                        alt={`track-${track?.name}`}
                    />
                </div>
                <div>
                    <p className="w-36 lg:w-full text-white truncate">{track?.name}</p>
                    <p className="w-40 cursor-pointer">{track?.artists[0].name}</p>
                </div>
            </div>

            <div className="flex items-center justify-between ml-auto md:ml-0">
                <p className="w-40 lg:w-full hidden md:inline truncate cursor-pointer">{track?.album?.name}</p>
                <p>{millisToMinutesAndSeconds(track?.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song