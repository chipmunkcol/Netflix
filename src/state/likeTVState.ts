import { atom } from 'recoil';
import { IresultsTV } from './../api/apiTv';

let initialState2:IresultsTV[];
if(localStorage.getItem('likeTV')){
    initialState2 = JSON.parse(localStorage.getItem('likeTV') || "");
} else {
    initialState2 = [];
}

export const likeTVState = atom({
    key: 'likeTVState',
    default: initialState2
})