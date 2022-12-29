import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";
import { getMovies, getPopularMovie, getPosterImg, getTopMovie, Idata, Iresults } from "../api/api";
import Detail from "./Detail";
import Slider from "./components/Slider";
import { useMatch } from "react-router-dom";

function Home () {
    
const { data, isLoading } = useQuery<Idata>(["now_playing"], getMovies)
const { data: dataPupular } = useQuery<Idata>(["popularMovie"], getPopularMovie)
const { data: dataTop } = useQuery<Idata>(["TopMovie"], getTopMovie)
console.log('dataTop: ', dataTop);


// Click한 영화를 slider와 모달 컴포넌트에 전달
const [clickMovie, setClickMovie] = useState<Iresults>()
const movieId = useMatch('movie/:movieId')


if(isLoading) {
    return <>Loading</>
}
    return(
        <Wrap > 
            <Banner bgImage={getPosterImg(data?.results[0].backdrop_path || "")}>
                <Title>{data?.results[0].title}</Title>
                <Overview>{data?.results[0].overview}</Overview>
                
            <STitle>현재 상영중인 영화</STitle>
            {/* 슬라이더 number로 position top 조절해줌 */}
                <Slider data={data} setClickMovie={setClickMovie} number={1}/>

            </Banner>
            
            <STitle2>지금 뜨는 콘텐츠</STitle2>
            {/* 슬라이더(인기영화 ) */}
                <Slider data={dataPupular} setClickMovie={setClickMovie} number={2}/>


            <STitle3>오늘 TOP 20 영화</STitle3>
            {/* 슬라이더(TOP 20 영화 ) */}
                <Slider data={dataTop} setClickMovie={setClickMovie} number={3}/>

            {/* 영화 Detail 컴포넌트(모달) */}
            {movieId && <Detail clickMovie={clickMovie} />}

        </Wrap>
    )
}
const Wrap =styled.div`
height: 200vh;
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
const STitle = styled.div`
font-size: 24px;
font-weight: 700;
position: absolute;
top: 79%;
left: 20px;
`
const STitle2 = styled(STitle)`
top: 122%;`
const STitle3 = styled(STitle)`
top: 163%;`

export default Home;
