import { useQuery } from "@tanstack/react-query";
import { useState, } from "react";
import styled from "styled-components";
import * as Styled from "./Home"
import { useMatch } from "react-router-dom";
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
const clickPosterImg = getPosterImg(clickTV?.backdrop_path || "", "w500")

const tvId = useMatch('tv/:tvId')

if(isLoading) {
    return <>Loading</>
}
    return(
        <Styled.Wrap > 
            <Styled.Banner bgImage={getPosterImg(data?.results[2].backdrop_path || "")}>
                <Styled.Title>{data?.results[2].name}</Styled.Title>
                <Styled.Overview>{data?.results[2].overview}</Styled.Overview>

            </Styled.Banner>

            <Styled.STitle>현재 상영중인 드라마</Styled.STitle>
            {/* 슬라이더 number로 position top 조절해줌 */}
            <SliderTV data={data} setClickTV={setClickTV} number={1}/>

            <Styled.STitle2>지금 뜨는 콘텐츠</Styled.STitle2>
            {/* 슬라이더(인기영화 ) */}
            <SliderTV data={dataPopular} setClickTV={setClickTV} number={2}/>


            <Styled.STitle3>오늘 TOP 10 영화</Styled.STitle3>
            {/* 슬라이더(TOP 20 영화 ) */}
            <SliderTVTOP10 data={dataTop} setClickTV={setClickTV} number={3}/>

            {/* TV Detail 컴포넌트(모달) */}
            {tvId && <DetailTV clickTV={clickTV} clickPosterImg={clickPosterImg}/>}

        </Styled.Wrap>
    )
}

export default TV;
