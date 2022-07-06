import { trackIdState } from '@@atoms';
import { useSpotify } from '@@hooks';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const useSongInfo = () => {
    const spotifyApi = useSpotify();

    const currentTrackId = useRecoilValue(trackIdState);

    const [songInfo, setSongInfo] = useState<any>(null);

    useEffect(() => {
        fetchSongInfo();
    }, [currentTrackId]);

    const fetchSongInfo = async () => {
        if (currentTrackId) {
            const trackInfo = await fetch(
                `https://api.spotify.com/v1/tracks/${currentTrackId}`,
                {
                    headers: {
                        Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                    }
                }
            ).then(res => res.json());

            setSongInfo(trackInfo);
        }
    }

    return songInfo;
}

export default useSongInfo