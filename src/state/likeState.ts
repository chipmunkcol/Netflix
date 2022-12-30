import { IresultsTV } from './../api/apiTv';
import { Iresults } from './../api/api';
import { atom, selector } from "recoil";

let initialState:Iresults[];
if(localStorage.getItem('like')){
    initialState = JSON.parse(localStorage.getItem('like') || "");
} else {
    initialState = [];
}

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