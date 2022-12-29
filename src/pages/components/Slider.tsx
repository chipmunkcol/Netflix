import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { getPosterImg, Idata, Iresults } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { getGenre } from "../../api/api";
import IconAdult from "../../Image/adult.png"
import IconTeenager from "../../Image/teenager.png"
import IconLike from "../../Image/즐겨찾기전.png"
import SliderBtn from "./SliderBtn";

interface ISlider {
    data?: Idata;
    setClickMovie: React.Dispatch<React.SetStateAction<Iresults | undefined>>;
    number: number;
}

function Slider ({data, setClickMovie, number}: ISlider){

// slider ref로 구현
const slideRef = useRef<any>(null)

const [page, setPage] = useState(0)
const onclickNext = () => {
    if(page > 1) {
        setPage(0)
    } else {
        setPage(prev => prev + 1)
    }
}
const onclickPrev = () => {
    if(page === 0) {
        setPage(prev => prev + 2)
    } else {
        setPage(prev => prev - 1)
    }
}

useEffect(()=>{
    setTimeout(() => {
        slideRef.current.style.transition = "all 0.5s ease-in-out"
        slideRef.current.style.transform = `translateX(-${page}00%)`
    }, 0);  
    // 이거 settime 안쓰고 style null 부분 해결해보자.
},[page])


const navigate = useNavigate()
const openModal = (movieId:number) => {
    navigate(`movie/${movieId}`)
}

    return(
        <Wrap number={number}>
        <SliderMain ref={slideRef} >
            {data?.results.map(movie => 
                <Poster key={movie.id}>
                    <PosterImg 
                    bgImage={getPosterImg(movie.backdrop_path || "", "w500")} 
                    onClick={()=>{openModal(movie.id); setClickMovie(movie);}}
                    />
                    <PosterTitle>{movie.title}</PosterTitle>
                    
                    <OpacityBox>
                        <FlexBox>
                            <PosterAdult bgImg={movie.adult===true ? IconAdult : IconTeenager} />
                            <PosterVote>평점 {movie.vote_average}점</PosterVote>
                            <Like IconLike={IconLike} onClick={()=>{alert('즐겨찾기 추가')}}/>
                        </FlexBox>
                        <PosterGenre>
                            {movie.genre_ids.map((genre, i) => {
                                    if(getGenre.findIndex((v) => v.id === genre) && i < 3){ // 장르 3개까지만 보여주자 & 마지막 장르는 . 제거
                                        return (<div key={Math.random()}>
                                                    {getGenre[getGenre.findIndex((v) => v.id === genre)].name} 
                                                    {i !== movie.genre_ids.length-1 && <span>&#183;</span>} 
                                                </div>)
                                    } 
                                })
                            }
                        </PosterGenre>
                    </OpacityBox>
                </Poster>
            )}
        </SliderMain>

        <SliderBtn onclickNext={onclickNext} onclickPrev={onclickPrev}/>

        </Wrap>
    )
}

const Wrap = styled.div<{number: number}>` // 슬라이더 number에 따라 css 위치 조정
position: absolute;
top: ${props=>props.number === 1 ? "87%" : props.number === 2? "129%" : "169%" };
width: 100%;
height: 250px;
margin: 0 auto;
overflow: hidden;
&:hover {
    li {
        opacity: 1;
    }
}
`

export const SliderMain = styled.div`
position: relative;
width: 100%;
display: flex;
`
export const Poster = styled.div`
width: 253px;
height: 171px;
background-color: ${props=>props.theme.black.darker};
&:hover {
    transition-duration: 1s;
    transition-delay: 0.5s;
    transform: scale(1.2);
    z-index: 5;
    ul {
        opacity: 1;
        transition-duration: 1s;
        transition-delay: 0.5s;
    }
}
`
export const PosterImg = styled.div<{bgImage : string}>`
width: 253px;
height: 155px;
margin-right: 10px;
flex: none;
background-image: url(${props=>props.bgImage});
background-position: top;
background-size: contain;
background-repeat: no-repeat;
` 
export const PosterTitle = styled.div`
position: relative;
top: -10px;
left: 9px;
`
export const OpacityBox = styled.ul`
opacity: 0;
width: 100%;
height: 50px;
background-color: ${props=>props.theme.black.darker};
`
export const FlexBox = styled.div`
display: flex;
padding-top: 2px;
`
export const PosterAdult = styled.div<{ bgImg:string }>`
margin: 0 20px 0 10px;
background-image: url(${props=>props.bgImg});
background-position: center;
background-size: cover;
width: 20px;
height: 20px;
`
export const PosterVote = styled.div``
export const Like = styled.div<{IconLike:string}>`
background-image: url(${props=>props.IconLike});
background-position: center;
background-size: cover;
width: 23px;
height: 17px;
margin-left: 15px;
cursor: pointer;
`
export const PosterGenre = styled.div`
display: flex;
margin: 7px 0 0 10px;
font-size: 14px;
span {
    margin: 0 5px 0 5px;
    font-weight: 800;
}
`
export default Slider;