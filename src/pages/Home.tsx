import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { getMovies, getPopularMovie, getPosterImg, getTopMovie, Idata, Iresults } from "../api/api";
import Detail from "./Detail";
import Slider from "./components/Slider";
import { useMatch } from "react-router-dom";
import SliderTOP10 from "./components/SliderTOP10";


function Home () {
    
const { data, isLoading } = useQuery<Idata>(["now_playing"], getMovies)
const { data: dataPupular } = useQuery<Idata>(["popularMovie"], getPopularMovie)
const { data: dataTop } = useQuery<Idata>(["TopMovie"], getTopMovie)
console.log(data);


// Click한 영화를 slider와 모달 컴포넌트에 전달
const [clickMovie, setClickMovie] = useState<Iresults>()
const clickPosterImg = getPosterImg(clickMovie?.backdrop_path || "", "w500") 
const movieId = useMatch('movie/:movieId')


// 내가 찜한 콘텐츠 로컬에 저장하자. (호출 함수 경로 ./hooks/hook)]
useEffect(()=>{
    if(!localStorage.getItem('like')){
        localStorage.setItem('like', JSON.stringify([]))
    }
},[])
useEffect(()=>{
    if(!localStorage.getItem('likeTV')){
        localStorage.setItem('likeTV', JSON.stringify([]))
    } 
},[])

if(isLoading) {
    return <>Loading</>
}
    return(
        <Wrap > 
            <Banner bgImage={getPosterImg(data?.results[0].backdrop_path || "")}>
                <Title>{data?.results[0].title}</Title>
                <Overview>{data?.results[0].overview}</Overview>

            </Banner>

            <STitle>현재 상영중인 영화</STitle>
            {/* 슬라이더 number로 position top 조절해줌 */}
            <Slider data={data} setClickMovie={setClickMovie} number={1}/>

            <STitle2>지금 뜨는 콘텐츠</STitle2>
            {/* 슬라이더(인기영화 ) */}
            <Slider data={dataPupular} setClickMovie={setClickMovie} number={2}/>


            <STitle3>오늘 TOP 10 영화</STitle3>
            {/* 슬라이더(TOP 20 영화 ) */}
            <SliderTOP10 data={dataTop} setClickMovie={setClickMovie} number={3}/>

            {/* 영화 Detail 컴포넌트(모달) */}
            {movieId && <Detail clickMovie={clickMovie} clickPosterImg={clickPosterImg}/>}

        </Wrap>
    )
}
export const Wrap =styled.div`
height: 210vh;
width: 100%;
`
export const Banner = styled.div<{bgImage : string}>`
height: 100vh;
background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)),
                    url(${props => props.bgImage});
background-position: center;
background-size: cover;
display: flex;
flex-direction: column;
justify-content: center;
gap: 20px;
color: #fff;
`
export const Title = styled.div`
font-size: 64px;
margin-left: 4%;
margin-top: -157px;
width: 53vw;
`
export const Overview = styled.div`
font-size: 24px;
margin-left: 4%;
margin-top: 10px;
width: 46vw;
line-height: normal;
height: 14vh;
`
export const STitle = styled.div`
font-size: 24px;
font-weight: 700;
position: absolute;
top: 79%;
left: 20px;
color: #fff;
`
export const STitle2 = styled.div`
top: 122%;
font-size: 24px;
font-weight: 700;
position: absolute;
left: 20px;
`
export const STitle3 = styled(STitle2)`
top: 163%;`

export default Home;
