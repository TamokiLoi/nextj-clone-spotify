import { isPlayingState, trackIdState, trackState } from '@@atoms';
import { ImageLoader } from '@@components';
import { useSpotify } from '@@hooks';
import { VolumeUpIcon as VolumeOffIcon } from '@heroicons/react/outline';
import {
    FastForwardIcon,
    PauseIcon,
    PlayIcon, RefreshIcon, ReplyIcon,
    RewindIcon, SwitchHorizontalIcon, VolumeUpIcon
} from '@heroicons/react/solid';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useSongInfo from 'src/hooks/useSongInfo.hook';

declare global {
    interface Window { onSpotifyWebPlaybackSDKReady: any; Spotify: any }
}

const STATE_TRACK: any = [
    { value: 'context' },
    { value: 'track' },
    { value: 'off' },
]

function Player() {
    const spotifyApi = useSpotify();

    const [currentTrackId, setCurrentTrackId] = useRecoilState<any>(trackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState<boolean>(isPlayingState);
    const [currentTrack, setTrack] = useRecoilState<any>(trackState);

    const [volume, setVolume] = useState<any>(50);
    const [reapeatState, setRepeatState] = useState<string>(STATE_TRACK[2].value);
    const [shuffleState, setShuffleState] = useState<boolean>(false);
    const [player, setPlayer] = useState(undefined);
    const [device, setDevice] = useState(undefined);
    const [devices, setDevices] = useState<any[]>([]);
    const [isDevice, setIsDevice] = useState<boolean>(false);

    const songInfo: Track = useSongInfo();

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            if (!songInfo) {
                fetchCurrentSong();
                setVolume(50);
            }
        }
        if (currentTrackId) {
            spotifyApi.getMyDevices().then((data) => {
                console.log(data, 'data')
                if (data?.body?.devices.length > 1) {
                    playSong()
                    const index = data?.body?.devices.findIndex(item => item.name == 'Web Playback SDK');
                    if (index != -1) {
                        let deviceIds: any = [data?.body?.devices[index].id]
                        // if (isDevice) {
                        //     playSong()
                        // } else {
                        //     spotifyApi.transferMyPlayback(deviceIds as any, { play: true })
                        //         .then((data) => {
                        //             setIsDevice(true);
                        //             console.log(data, 'device start');
                        //         })
                        // }
                    }
                }
            })
        }
    }, [currentTrackId]);

    useEffect(() => {
        if (volume > 0 && volume < 100) debouncedAdjustVolume(volume);
    }, [volume]);

    const playSong = async () => {
        try {
            await spotifyApi.play({ uris: [currentTrack.uri], })
        } catch (error) {
            console.log(error);
        }
    }

    const debouncedAdjustVolume = useCallback(
        debounce((volume: number) => {
            try {
                if (!currentTrackId) return;
                spotifyApi.setVolume(volume).catch((err) => { })
            } catch (error) {
                console.log(error);
            }
        }, 500), []
    );

    const fetchCurrentSong = () => {
        try {
            spotifyApi.getMyCurrentPlayingTrack()
                .then((data: any) => {
                    if (data) {
                        console.log('now playing', data?.body?.item);
                        setCurrentTrackId(data?.body?.item?.id);

                        spotifyApi.getMyCurrentPlaybackState()
                            .then((data: any) => {
                                console.log('is playing', data?.body);
                                setIsPlaying(data?.body?.is_playing)
                                setRepeatState(data?.body?.repeat_state);
                                setShuffleState(data?.body?.shuffle_state);
                            })
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    const handlePlayPause = () => {
        try {
            spotifyApi.getMyCurrentPlaybackState()
                .then((data: any) => {
                    if (data?.body?.is_playing) {
                        spotifyApi.pause();
                        setIsPlaying(false);
                    } else {
                        spotifyApi.play();
                        setIsPlaying(true);
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    const handleForwardOrPreSong = (isNext = false) => {
        const url = isNext ? spotifyApi.skipToNext() : spotifyApi.skipToPrevious()
        try {
            Promise.all([url])
                .then(() => {
                    fetchCurrentSong();
                });
        } catch (error) {
            console.log(error);
        }
    }

    const handleRepeatSong = () => {
        const index = STATE_TRACK.findIndex((item: any) => item.value.toLowerCase() as string == reapeatState.toLowerCase() as string);
        if (index > -1) {
            try {
                spotifyApi.setRepeat(STATE_TRACK[index >= 2 ? 0 : index + 1].value)
                    .then(() => {
                        setTimeout(() => {
                            fetchCurrentSong()
                        }, 500);
                    })
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleShuffleSongs = () => {
        try {
            spotifyApi.setShuffle(!shuffleState)
                .then(() => {
                    fetchCurrentSong();
                })
        } catch (error) {
            console.log(error);
        }
    }

    // console.log(songInfo)

    return (
        <>
            {currentTrackId && (
                <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
                    {/* Left */}
                    <div className="flex items-center space-x-4">
                        <div className="relative h-10 w-10 hidden md:inline-flex">
                            <ImageLoader
                                layout="fill"
                                src={songInfo?.album?.images?.[0]?.url}
                                alt={`track-${songInfo?.name}`}
                            />
                        </div>

                        <div>
                            <h3>{songInfo?.name}</h3>
                            <p>{songInfo?.artists?.[0]?.name}</p>
                        </div>
                    </div>

                    {/* Center */}
                    <div className="flex items-center justify-evenly">
                        <SwitchHorizontalIcon
                            onClick={handleShuffleSongs}
                            className={`btn-icon ${shuffleState && 'text-green-500'}`} />
                        <RewindIcon
                            onClick={() => handleForwardOrPreSong(false)}
                            className="btn-icon" />
                        {isPlaying ? (
                            <PauseIcon onClick={handlePlayPause} className="btn-icon w-10 h-10" />
                        ) : (
                            <PlayIcon onClick={handlePlayPause} className="btn-icon w-10 h-10" />
                        )}
                        <FastForwardIcon
                            onClick={() => handleForwardOrPreSong(true)}
                            className="btn-icon" />
                        {reapeatState == STATE_TRACK[1].value && (
                            <>
                                <ReplyIcon
                                    onClick={handleRepeatSong}
                                    className="btn-icon text-green-500" />
                            </>
                        )}
                        {reapeatState != STATE_TRACK[1].value && (
                            <>
                                <RefreshIcon
                                    onClick={handleRepeatSong}
                                    className={`btn-icon ${reapeatState == STATE_TRACK[0].value && 'text-green-500'}`} />
                            </>
                        )}
                    </div>

                    {/* Right */}
                    <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
                        <VolumeOffIcon onClick={() => volume > 0 && setVolume(volume - 10)} className="btn-icon" />
                        <input
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            min={0}
                            max={100}
                            type="range"
                            className="w-14 md:w-28"
                        />
                        <VolumeUpIcon onClick={() => volume < 100 && setVolume(volume + 10)} className="btn-icon" />
                    </div>
                </div>
            )}
        </>
    )
}

export default Player