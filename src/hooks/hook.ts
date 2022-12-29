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