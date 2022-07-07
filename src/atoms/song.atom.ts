import { atom } from 'recoil';

export const trackIdState = atom({
    key: 'trackIdAtom', // unique ID (wit respect to other atoms/selectors)
    default: null // default value (aka initial value)
})

export const trackState = atom({
    key: 'trackAtom',
    default: null
})

export const isPlayingState: any = atom({
    key: 'isPlayingAtom',
    default: false
})

export const isPlayerStartState: any = atom({
    key: 'isPlayerStartAtom',
    default: false
})