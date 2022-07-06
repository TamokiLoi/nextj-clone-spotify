import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-follow-modify",
    "user-follow-read",
    "user-read-recently-played",
    "user-read-playback-position",
    "user-top-read",
    "playlist-read-collaborative",
    "playlist-modify-public",
    "playlist-read-private",
    "playlist-modify-private",
    "app-remote-control",
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-library-modify",
    "user-library-read",
].join(',');

const params = { scope: scopes };

const queryParamString = new URLSearchParams(params).toString();

const LOGIN_URL = "https://accounts.spotify.com/authorize?" + queryParamString.toString();

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID as string,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
});

export default spotifyApi;

export { LOGIN_URL };