import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import styled from "styled-components";
import { getMovies, getPosterImg, Idata } from "../api/api";

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
                
                <Slider>
                    {data?.results.map(posterImg => 
                        <Poster bgImage={getPosterImg(posterImg.backdrop_path || "", "w500")}>
                            
                        </Poster>)}
                </Slider>
            </Banner>
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
padding: 20px;
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
const Slider = styled.div`
position: relative;
top: 30%;
width: 97%;
margin: 0 auto;
display: flex;
overflow: hidden;
`
const Poster = styled.div<{bgImage : string}>`
width: 230px;
height: 200px;
margin-right: 10px;
flex: none;
background-image: url(${props=>props.bgImage});
background-position: 50% 50%;
background-size: contain;
background-repeat: no-repeat;
` 
export default Home;
