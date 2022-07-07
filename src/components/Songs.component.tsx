import { isPlayerStartState, playlistState } from '@@atoms';
import { useSpotify } from '@@hooks';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import Song from './Song.component';

function Songs() {
    const spotifyApi = useSpotify();

    const playlist: any = useRecoilValue(playlistState);
    const isPlayerStart: any = useRecoilValue(isPlayerStartState);

    useEffect(() => {
        if (isPlayerStart) {
            spotifyApi.getMyDevices().then((data) => {
                console.log(data, 'data')
                if (data?.body?.devices.length > 1) {
                    const index = data?.body?.devices.findIndex(item => item.name == 'Web Playback SDK');
                    if (index != -1) {
                        let deviceIds: any = [data?.body?.devices[index].id]
                        spotifyApi.transferMyPlayback(deviceIds as any, { play: true })
                            .then((data) => {
                                console.log(data, 'device start');
                            })
                    }
                }
            })
        }
    }, [isPlayerStart]);

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