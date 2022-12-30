import { IresultsTV } from './../api/apiTv';
import { Iresults } from './../api/api';

export function saveLocalStorage(movie?:Iresults){
    const likeArr:Iresults[] = JSON.parse(localStorage.getItem('like') || "");
    
    if(movie)
    likeArr.push(movie);
    const newArr = likeArr.filter((v,i)=> likeArr.indexOf(v) === i) // 중복 제거한 arr
    localStorage.setItem('like', JSON.stringify(newArr))
}

export function deleteLocalStorage(movie?:Iresults){
    const likeArr:Iresults[] = JSON.parse(localStorage.getItem('like') || "")
    
    if(movie){
    const a = likeArr.findIndex((v) => v.id === movie.id)
    likeArr.splice(a,1)
    localStorage.setItem('like', JSON.stringify(likeArr))}
}

/// TV localStorage
export function saveTVLocalStorage(movie?:IresultsTV){
    const likeArr:IresultsTV[] = JSON.parse(localStorage.getItem('likeTV') || "");
    
    if(movie)
    likeArr.push(movie);
    const newArr = likeArr.filter((v,i)=> likeArr.indexOf(v) === i) // 중복 제거한 arr
    localStorage.setItem('likeTV', JSON.stringify(newArr))
}

export function deleteTVLocalStorage(movie?:IresultsTV){
    const likeArr:IresultsTV[] = JSON.parse(localStorage.getItem('likeTV') || "")
    
    if(movie){
    const a = likeArr.findIndex((v) => v.id === movie.id)
    likeArr.splice(a,1)
    localStorage.setItem('likeTV', JSON.stringify(likeArr))}
}