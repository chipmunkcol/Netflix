import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getMovies, getPosterImg, Idata } from "../api/api";
import Detail from "./Detail";

function Home () {
    
const { data, isLoading } = useQuery<Idata>(["now_playing"], getMovies)
console.log('data: ', data);


// slider 구현(바닐라JS)
const [page, setPage] = useState(0)
const slideRef = useRef<any>(null);

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

useEffect(()=>{
    setTimeout(() => {
        slideRef.current.style.transition = "all 0.5s ease-in-out"
        slideRef.current.style.transform = `translateX(-${page}00%)`
    }, 0);  
    // 이거 settime 안쓰고 style null 부분 해결해보자.
},[page])

// Modal 구현
const [modal, setModal] = useState(false)
const onclickModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setModal(prev => !prev);
}
if(isLoading) {
    return <>Loading</>
}
    return(
        <Wrap > 
            <Banner bgImage={getPosterImg(data?.results[0].backdrop_path || "")}>
                <Title>{data?.results[0].title}</Title>
                <Overview>{data?.results[0].overview}</Overview>
                
                <Slider ref={slideRef}>
                    {data?.results.map(movie => 
                        <Poster 
                        bgImage={getPosterImg(movie.backdrop_path || "", "w500")} 
                        key={movie.id}
                        onClick={onclickModal}
                        >
                            <PosterTitle>{movie.title}</PosterTitle>
                        </Poster>)}
                </Slider>
                <ButtonR className="button" onClick={onclickNext}>{">"}</ButtonR>
                <ButtonL className="button" onClick={onclickPrev}>{"<"}</ButtonL>
            </Banner>

            {modal && <Detail onclickModal={onclickModal}/>}

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
&:hover {
    .button {
        opacity:1
    }
}
`
const Poster = styled.div<{bgImage : string}>`
width: 230px;
height: 200px;
margin-right: 10px;
flex: none;
background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)), 
url(${props=>props.bgImage});
background-position: 50% 50%;
background-size: contain;
background-repeat: no-repeat;
&:hover {
    transition-duration: 1s;
    transition-delay: 0.5s;
    transform: scale(1.3);
}
` 
const PosterTitle = styled.div`
`
const ButtonL = styled.button`
font-weight: 800;
font-size: 36px;
position: absolute;
z-index: 999;
top: 91%;
opacity: 1;
`
const ButtonR = styled(ButtonL)`
right: 25px;
`
export default Home;
