import * as React from "react";
import styled from "styled-components";
import { getPosterImg, Iresults } from "../../api/api";
import load이미지 from "../../Image/noImage.jpg"

interface ILazyLoad {
    backdrop_path: string;
    openModal: (movieId:number) => void;
    setClickMovie: React.Dispatch<React.SetStateAction<Iresults | undefined>>
    movieId: number;
    movie: Iresults;
}
function SearchLazyLoadImg ({backdrop_path, openModal, setClickMovie, movieId, movie}: ILazyLoad) {

const [loading, setLoading] = React.useState(false)
const imgRef = React.useRef(null)
const observerRef = React.useRef<IntersectionObserver>();

React.useEffect(() => {
    observerRef.current = new IntersectionObserver(intersectionObserver); // 인스턴스 생성
    imgRef.current && observerRef.current.observe(imgRef.current); // 이미지태그 관찰 시작
}, [])

// IntersectionObserver 설정
const intersectionObserver = (entries: IntersectionObserverEntry[], end: IntersectionObserver) => {
    entries.forEach((entry)=> {
        if (entry.isIntersecting) { // 관찰되고 있는 entry가 보여지게 되면
            end.unobserve(entry.target); // 관찰 종료
            setLoading(true); 
        }
    })
}

return(
        <Img 
        ref={imgRef} 
        src={loading ? getPosterImg(backdrop_path) : load이미지}
        onClick={()=>{openModal(movieId); setClickMovie(movie);}}
        />
    )
}

const Img = styled.img`
width: 253px;
height: 155px;
margin-right: 10px;

` 


export default SearchLazyLoadImg;