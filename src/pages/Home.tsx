import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";
import { getMovies, getPopularMovie, getPosterImg, Idata, Iresults } from "../api/api";
import Detail from "./Detail";
import Slider from "./components/Slider";
import { useMatch } from "react-router-dom";
import SliderBtn from "./components/SliderBtn";

function Home () {
    
const { data, isLoading } = useQuery<Idata>(["now_playing"], getMovies)
const { data: dataPupular } = useQuery(["popularMovie"], getPopularMovie)
// console.log('data: ', data);


// Click한 영화를 slider와 모달 컴포넌트에 전달
const [clickMovie, setClickMovie] = useState<Iresults>()
const movieId = useMatch('movie/:movieId')


const [page, setPage] = useState(0)
const [page2, setPage2] = useState(0)

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
const onclickNext2 = () => {
    if(page2 > 1) {
        setPage2(0)
    } else {
        setPage2(prev => prev + 1)
    }
}
const onclickPrev2 = () => {
    if(page2 === 0) {
        setPage2(prev => prev + 2)
    } else {
        setPage2(prev => prev - 1)
    }
}

if(isLoading) {
    return <>Loading</>
}
    return(
        <Wrap > 
            <Banner bgImage={getPosterImg(data?.results[0].backdrop_path || "")}>
                <Title>{data?.results[0].title}</Title>
                <Overview>{data?.results[0].overview}</Overview>
                
            {/* 슬라이더 & 버튼 컴포넌트 */}
                <Slider data={data} setClickMovie={setClickMovie} page={page} number={1}/>
                <SliderBtn onclickNext={onclickNext} onclickPrev={onclickPrev}/>

            </Banner>
            
            {/* 슬라이더 & 버튼 컴포넌트(인기영화 ) */}
                <Slider data={dataPupular} setClickMovie={setClickMovie} page={page2} number={2}/>
                <SliderBtn onclickNext={onclickNext2} onclickPrev={onclickPrev2}/>

            {/* 영화 Detail 컴포넌트(모달) */}
            {movieId && <Detail clickMovie={clickMovie} />}

        </Wrap>
    )
}
const Wrap =styled.div`
height: 200vh;
overflow: hidden;
`
const Banner = styled.div<{bgImage : string}>`
height: 100vh;
background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)),
                    url(${props => props.bgImage});
background-position: center;
background-size: cover;
display: flex;
flex-direction: column;
justify-content: center;
gap: 20px;
`
const Title = styled.div`
font-size: 64px;
margin-left: 24px;
`
const Overview = styled.div`
font-size: 24px;
margin-left: 24px;
`

export default Home;
