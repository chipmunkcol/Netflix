import { Iresults } from './../api/api';
import { atom, selector } from "recoil";

const initialState:Iresults[] = JSON.parse(localStorage.getItem('like') || "")

export const likeState = atom({
    key: 'likeState',
    default: initialState
})

// export const likeSelector = selector({
//     key: 'likeSelector',
//     get: ({get}) => {
//         return get(likeState);
//     },
//     set: ({set}, value ) => {
//         set(likeState, value)
//     }
// })