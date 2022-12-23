import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import styled from "styled-components";
import { getMovies, getPosterImg, Idata } from "../api/main";

function Home () {
    
const { data, isLoading } = useQuery<Idata>(["now_playing"], getMovies)
console.log('data: ', data);

if(isLoading) {
    return null;
}
    return(
        <Wrap> 
            <Banner bgImage={getPosterImg(data?.results[0].backdrop_path || "")}>
                <Title>{data?.results[0].title}</Title>
                <Overview>{data?.results[0].overview}</Overview>
            </Banner>
        </Wrap>
    )
}
const Wrap =styled.div`
`
const Banner = styled.div<{bgImage : string}>`
width: 100vw;
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
`
const Overview = styled.div`
font-size: 24px;
`
export default Home;