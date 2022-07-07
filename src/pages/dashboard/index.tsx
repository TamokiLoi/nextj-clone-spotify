import { deviceIdState, isPlayerStartState } from '@@atoms';
import { Center, Meta, Player, Sidebar } from '@@components';
import { useSpotify } from '@@hooks';
import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

type Props = {
    session: any
}

const Dashboard = ({ session }: Props) => {

    const spotifyApi = useSpotify();

    const [isplayerStart, setIsPlayerStart] = useRecoilState<any>(isPlayerStartState);
    const [deviceId, setDeviceId] = useRecoilState<any>(deviceIdState);

    useEffect(() => {
        if (window) {
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;

            document.body.appendChild(script);

            window.onSpotifyWebPlaybackSDKReady = () => {

                const player = new window.Spotify.Player({
                    name: 'Web Playback SDK',
                    getOAuthToken: (cb: any) => { cb(spotifyApi.getAccessToken()); },
                    volume: 1
                });

                player.addListener('ready', ({ device_id }: any) => {
                    console.log('Ready with Device ID', device_id);
                    setIsPlayerStart(true);
                    setDeviceId(device_id);
                });

                player.addListener('not_ready', ({ device_id }: any) => {
                    console.log('Device ID has gone offline', device_id);
                });


                player.connect();
            };
        }
    }, []);

    return (
        <>
            <Meta title={`Dashboard Page`} />
            <div className="bg-black h-screen overflow-hidden">
                <main className="flex">
                    <Sidebar />
                    <Center />
                </main>
                <div className="sticky bottom-0">
                    <Player />
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    return {
        props: {
            session
        },
    };
};

export default Dashboard
