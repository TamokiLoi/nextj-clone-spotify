import { playlistState } from '@@atoms';
import { useRecoilValue } from 'recoil';
import Song from './Song.component';

function Songs() {
    const playlist: any = useRecoilValue(playlistState);
    return (
        <>
            <div className="flex flex-col space-y-1 px-8 pb-28 text-white">
                {playlist?.tracks?.items?.map((itemTrack: ItemTrack, i: number) => (
                    <Song key={itemTrack?.track?.id} track={itemTrack?.track} order={i} />
                ))}
            </div>
        </>
    )
}

export default Songs