import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Detail from "./Detail";

import { useMatch } from "react-router-dom";
import SliderTOP10 from "./components/SliderTOP10";
import { getTv, IdataTV } from "../api/apiTv";
import { getPosterImg } from "../api/api";


function TV () {

const { data, isLoading } = useQuery<IdataTV>(["on_the_air"], getTv)
// const { data: dataPupular } = useQuery<Idata>(["popularMovie"], getPopularMovie)
// const { data: dataTop } = useQuery<Idata>(["TopMovie"], getTopMovie)
console.log(data);


// Click한 영화를 slider와 모달 컴포넌트에 전달
// const [clickMovie, setClickMovie] = useState<Iresults>()
// const movieId = useMatch('movie/:movieId')


// 내가 찜한 콘텐츠 로컬에 저장하자. (호출 함수 경로 ./hooks/hook)]
useEffect(()=>{
    if(!localStorage.getItem('like')){
        localStorage.setItem('like', JSON.stringify([]))
    } 
},[])

if(isLoading) {
    return <>Loading</>
}
    return(
        <Wrap > 
            <Banner bgImage={getPosterImg(data?.results[2].backdrop_path || "")}>
                <Title>{data?.results[2].name}</Title>
                <Overview>{data?.results[2].overview}</Overview>

            </Banner>

            <STitle>현재 상영중인 영화</STitle>
            {/* 슬라이더 number로 position top 조절해줌 */}
            

            <STitle2>지금 뜨는 콘텐츠</STitle2>
            {/* 슬라이더(인기영화 ) */}
            {/* <Slider data={dataPupular} setClickMovie={setClickMovie} number={2}/> */}


            <STitle3>오늘 TOP 10 영화</STitle3>
            {/* 슬라이더(TOP 20 영화 ) */}
            {/* <SliderTOP10 data={dataTop} setClickMovie={setClickMovie} number={3}/> */}

            {/* 영화 Detail 컴포넌트(모달) */}
            {/* {movieId && <Detail clickMovie={clickMovie} />} */}

        </Wrap>
    )
}
const Wrap =styled.div`
height: 210vh;
width: 100%;
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
width: 53vw;
`
const Overview = styled.div`
font-size: 24px;
margin-left: 24px;
width: 46vw;
height: 14vh;
overflow: hidden;
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

export default TV;
