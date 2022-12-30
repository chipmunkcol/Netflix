import { useMatch,  } from "react-router-dom"
import { useState } from "react"

import styled from "styled-components";
import Detail from "./Detail";
import { useRecoilValue } from "recoil";
import { likeState } from "../state/likeState";
import MineComponent from "./components/MineComponent";
import { Iresults } from "../api/api";
import { likeTVState } from "../state/likeTVState";
import MineTVComponent from "./components/MineTVComponent";
import { IresultsTV } from "../api/apiTv";
import DetailTV from "./DetailTV";


function Mine() {

const data = useRecoilValue(likeState)
const dataTV = useRecoilValue(likeTVState)

const [clickMovie, setClickMovie] = useState<Iresults>()
const [clickTV, setClickTV] = useState<IresultsTV>()

const movieId = useMatch('mine/movie/:movieId')
const tvId = useMatch('mine/tv/:tvId')


if(!data) {
    return (<div style={{fontSize:'48px', textAlign:'center'}}>🎃찜한 콘텐츠가 없습니다🎃</div>)
}
    return(
        <Wrap>
            <Title>MOVIE</Title>
            <Grid1> 
            {data?.map(movie => 
                <MineComponent movie={movie} setClickMovie={setClickMovie}/>
            )}

            </Grid1>

            <Title>TV</Title>
            <Grid2> 
            {dataTV?.map(movie => 
                <MineTVComponent movie={movie} setClickMovie={setClickTV}/>
            )}

            </Grid2>

            {movieId ? <Detail clickMovie={clickMovie} /> : 
                tvId ? <DetailTV clickTV={clickTV}/> : null}

        </Wrap>
    )
}
const Wrap = styled.div`
position: absolute;
top: 10%;
right: 0;
width: 100%;
`
const Grid1 = styled.div`
display: grid;
grid-template-columns: repeat(5, 267px);
justify-content: center;
width: 100%;
position: relative;
`
const Grid2 = styled(Grid1)`
`

const Title = styled.div`
font-size: 32px;
margin: 16px 0 -35px 99px;
`


export default Mine;