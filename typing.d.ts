type Playlist = {
    id: string,
    images: any[],
    name: string,
    owner: Owner,
    uri: string,
    snapshot_id: string,
    tracks: Tracks
}

type Owner = {
    id: string,
    display_name: string,
    uri: string
}

type Tracks = {
    href: string,
    items: ItemTrack[]
}

type ItemTrack = {
    added_at: string,
    primary_color: string,
    track: Track
}

type Track = {
    id: string,
    href: string,
    name: string,
    artists: Artist[],
    album: Album,
    duration_ms: number,
    uri: any,
    external_urls: any
}

type Artists = {
    id: string,
    name: string,
    href: string,
    uri: string
}

type Album = {
    id: string,
    name: string,
    href: string,
    uri: string,
    artists: Artist[],
    images: any[]
}
