import { atom } from 'recoil';

export const trackIdState = atom({
    key: 'trackIdAtom', // unique ID (wit respect to other atoms/selectors)
    default: null // default value (aka initial value)
})

export const isPlayingState: any = atom({
    key: 'isPlayingAtom',
    default: false
})