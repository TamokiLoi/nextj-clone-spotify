import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID as string,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
});

export const useSpotify = () => {
    const { data: session, status }: any = useSession();

    useEffect(() => {
        if (session) {
            // If refresh access token attempt fails, direct user to login...
            if (session.error === 'RefreshAccessTokenError') {
                signIn();
            }

            spotifyApi.setAccessToken(session?.user?.accessToken);
        }
    }, [session]);

    return spotifyApi;
}
