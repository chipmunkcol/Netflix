import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getGenre, getMovies, getPosterImg, Idata, Iresults } from "../api/api";
import Detail from "./Detail";
import IconAdult from "../Image/adult.png"
import IconTeenager from "../Image/teenager.png"
import { useNavigate } from "react-router-dom";

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
const [clickMovie, setClickMovie] = useState<Iresults>()
// console.log('clickMovie: ', clickMovie);
const [modal, setModal] = useState(false)
const navigate = useNavigate()
const openModal = (movieId:number) => {
    setModal(true)
    navigate(`movie/${movieId}`)
}
const closeModal = () => {
    setModal(prev => !prev);
    navigate("")
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
                        <Poster key={movie.id}>
                            <PosterImg 
                            bgImage={getPosterImg(movie.backdrop_path || "", "w500")} 
                            onClick={()=>{openModal(movie.id); setClickMovie(movie);}}
                            />
                            <PosterTitle>{movie.title}</PosterTitle>
                            
                            <OpacityBox>
                                <FlexBox>
                                    <PosterAdult bgImg={movie.adult===true ? IconAdult : IconTeenager} />
                                    <PosterVote>평점 {movie.vote_average}점</PosterVote>
                                </FlexBox>
                                <PosterGenre>
                                    {movie.genre_ids.map((genre, i) => {
                                            if(getGenre.findIndex((v) => v.id === genre) && i < 3){
                                                return (<div key={Math.random()}>
                                                            {getGenre[getGenre.findIndex((v) => v.id === genre)].name} 
                                                            <span>&#183;</span>
                                                        </div>)
                                            } 
                                        })
                                    }
                                </PosterGenre>
                            </OpacityBox>
                        </Poster>
                    )}
                </Slider>

                <ButtonAreaL>
                    <ButtonL className="button" onClick={onclickPrev}>{"<"}</ButtonL>
                </ButtonAreaL>
                <ButtonAreaR>
                    <ButtonR className="button" onClick={onclickNext}>{">"}</ButtonR>
                </ButtonAreaR>

            </Banner>

            {modal && <Detail clickMovie={clickMovie} closeModal={closeModal}/>}

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
const Slider = styled.div`
position: relative;
top: 38%;
width: 100%;
margin: 0 auto;
display: flex;
&:hover {
    button {
        opacity:1
    }
}
`
const Poster = styled.div`
width: 253px;
height: 171px;
background-color: ${props=>props.theme.black.darker};
&:hover {
    transition-duration: 1s;
    transition-delay: 0.5s;
    transform: scale(1.3);
    z-index: 5;
    ul {
        opacity: 1;
        transition-duration: 1s;
        transition-delay: 0.5s;
    }
}
`
const PosterImg = styled.div<{bgImage : string}>`
width: 253px;
height: 155px;
margin-right: 10px;
flex: none;
background-image: url(${props=>props.bgImage});
background-position: top;
background-size: contain;
background-repeat: no-repeat;
` 
const PosterTitle = styled.div`
position: relative;
top: -10px;
left: 9px;
`
const OpacityBox = styled.ul`
opacity: 0;
width: 100%;
height: 70px;
background-color: ${props=>props.theme.black.darker};
`
const FlexBox = styled.div`
display: flex;
padding-top: 10px;
`
const PosterAdult = styled.li<{ bgImg:string }>`
margin: 0 20px 0 10px;
background-image: url(${props=>props.bgImg});
background-position: center;
background-size: cover;
width: 20px;
height: 20px;
`
const PosterVote = styled.li``
const PosterGenre = styled.li`
display: flex;
margin: 10px 0 0 10px;
font-size: 14px;
div {
    /* margin-right: 5px; */
}
span {
    margin: 0 5px 0 5px;
    font-weight: 800;
}
`
const ButtonAreaL = styled.div`
position: absolute;
top: 86.7%;
width: 50px;
height: 170px;
background-color: rgba(0,0,0,0.8);
display: flex;
justify-content: center;
opacity: 1;
`
const ButtonAreaR = styled(ButtonAreaL)`
right: 0;
`
const ButtonL = styled.span`
font-weight: 800;
font-size: 36px;
position: absolute;
z-index: 999;
top: 40%;
opacity: 1;
`
const ButtonR = styled(ButtonL)`
`
export default Home;
