import { atom } from 'recoil';

export const playlistState = atom({
    key: 'playlistAtom',
    default: null
})

export const playlistIdState: any = atom({
    key: 'playlistIdAtom',
    default: null
})