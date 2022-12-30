import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Detail from "./Detail";

import { useMatch } from "react-router-dom";
import SliderTOP10 from "./components/SliderTOP10";
import { getTVs, IdataTV, IresultsTV } from "../api/apiTv";
import { getPosterImg } from "../api/api";
import SliderTV from "./components/SliderTV";
import DetailTV from "./DetailTV";


function TV () {

const { data, isLoading } = useQuery<IdataTV>(["on_the_air"], getTVs)
// const { data: dataPupular } = useQuery<Idata>(["popularMovie"], getPopularMovie)
// const { data: dataTop } = useQuery<Idata>(["TopMovie"], getTopMovie)
console.log(data);


// Click한 영화를 slider와 모달 컴포넌트에 전달
const [clickTV, setClickTV] = useState<IresultsTV>()
const tvId = useMatch('tv/:tvId')

if(isLoading) {
    return <>Loading</>
}
    return(
        <Wrap > 
            <Banner bgImage={getPosterImg(data?.results[2].backdrop_path || "")}>
                <Title>{data?.results[2].name}</Title>
                <Overview>{data?.results[2].overview}</Overview>

            </Banner>

            <STitle>현재 상영중인 드라마</STitle>
            {/* 슬라이더 number로 position top 조절해줌 */}
            <SliderTV data={data} setClickTV={setClickTV} number={1}/>

            <STitle2>지금 뜨는 콘텐츠</STitle2>
            {/* 슬라이더(인기영화 ) */}
            {/* <Slider data={dataPupular} setClickMovie={setClickMovie} number={2}/> */}


            <STitle3>오늘 TOP 10 영화</STitle3>
            {/* 슬라이더(TOP 20 영화 ) */}
            {/* <SliderTOP10 data={dataTop} setClickMovie={setClickMovie} number={3}/> */}

            {/* TV Detail 컴포넌트(모달) */}
            {tvId && <DetailTV clickTV={clickTV} />}

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
