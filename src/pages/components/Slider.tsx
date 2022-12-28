import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { getPosterImg, Idata, Iresults } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { getGenre } from "../../api/api";
import IconAdult from "../../Image/adult.png"
import IconTeenager from "../../Image/teenager.png"
import IconLike from "../../Image/즐겨찾기전.png"

interface ISlider {
    data?: Idata;
    setClickMovie: React.Dispatch<React.SetStateAction<Iresults | undefined>> ;
    page: number;
    number: number;
}

function Slider ({data, setClickMovie, page, number}: ISlider){

// slider 구현(라이브러리x)
const slideRef = useRef<any>(null);

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
        <SliderMain ref={slideRef} number={number}>
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
    )
}

export const SliderMain = styled.div<{number: number}>`
position: absolute;
top: ${props=>props.number === 1 ? "87%" : props.number === 2? "129%" : "169%" };
width: 100%;
margin: 0 auto;
display: flex;
&:hover {
    button {     // 이거 버튼area 호버 어떻게하냐~
        opacity:1
    }
}
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
export const PosterAdult = styled.li<{ bgImg:string }>`
margin: 0 20px 0 10px;
background-image: url(${props=>props.bgImg});
background-position: center;
background-size: cover;
width: 20px;
height: 20px;
`
export const PosterVote = styled.li``
export const Like = styled.li<{IconLike:string}>`
background-image: url(${props=>props.IconLike});
background-position: center;
background-size: cover;
width: 23px;
height: 17px;
margin-left: 15px;
cursor: pointer;
`
export const PosterGenre = styled.li`
display: flex;
margin: 7px 0 0 10px;
font-size: 14px;
div {
    /* margin-right: 5px; */
}
span {
    margin: 0 5px 0 5px;
    font-weight: 800;
}
`
export default Slider;