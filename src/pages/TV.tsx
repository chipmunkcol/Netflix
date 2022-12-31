import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Detail from "./Detail";

import { useMatch } from "react-router-dom";
import SliderTOP10 from "./components/SliderTOP10";
import { getPopularTV, getTOP10TV, getTVs, IdataTV, IresultsTV } from "../api/apiTv";
import { getPosterImg } from "../api/api";
import SliderTV from "./components/SliderTV";
import DetailTV from "./DetailTV";
import SliderTVTOP10 from "./components/SliderTVTOP10";


function TV () {

const { data, isLoading } = useQuery<IdataTV>(["on_the_air"], getTVs)
const { data: dataPopular } = useQuery<IdataTV>(["popularTV"], getPopularTV)
const { data: dataTop } = useQuery<IdataTV>(["TopTV"], getTOP10TV)
console.log(dataPopular);


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
            <SliderTV data={dataPopular} setClickTV={setClickTV} number={2}/>


            <STitle3>오늘 TOP 10 영화</STitle3>
            {/* 슬라이더(TOP 20 영화 ) */}
            <SliderTVTOP10 data={dataTop} setClickTV={setClickTV} number={3}/>

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
color: #fff;
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
color: #fff;
`
const STitle2 = styled.div`
top: 122%;
font-size: 24px;
font-weight: 700;
position: absolute;
left: 20px;`
const STitle3 = styled(STitle2)`
top: 163%;`

export default TV;
