import { useMatch, useNavigate, useParams } from "react-router-dom"
import { useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query";
import { getGenre, getPosterImg, Idata, Iresults, searchMovie } from "../api/api";
import IconAdult from "../Image/adult.png"
import IconTeenager from "../Image/teenager.png"
import styled from "styled-components";
import * as Styled from "./components/Slider"
import Detail from "./Detail";


const Search = () => {

const { search } = useParams()
const { data, isLoading } = useQuery<Idata>(["search", search], ()=>searchMovie(search || ""))
console.log('data: ', data);

const [clickMovie, setClickMovie] = useState<Iresults>()

const movieId = useMatch('search/:search/:movieId')
const navigate = useNavigate()
const openModal = (movieId:number) => {
    navigate(`${movieId}`)
}

if(isLoading) {
    return <>Loading</>
}
    return(
        <Wrap> 
        {data?.results.map(movie => 
            <Styled.Poster key={movie.id} style={{marginTop:"50px"}}>
                <Styled.PosterImg 
                bgImage={getPosterImg(movie.backdrop_path || "", "w500")} 
                onClick={()=>{openModal(movie.id); setClickMovie(movie);}}
                />
                <Styled.PosterTitle>{movie.title}</Styled.PosterTitle>
                
                <Styled.OpacityBox>
                    <Styled.FlexBox>
                        <Styled.PosterAdult bgImg={movie.adult ? IconAdult : IconTeenager} />
                        <Styled.PosterVote>평점 {movie.vote_average}점</Styled.PosterVote>
                    </Styled.FlexBox>
                    <Styled.PosterGenre>
                        {movie.genre_ids.map((genre, i) => {
                                if(getGenre.findIndex((v) => v.id === genre) && i < 3){ // 장르 3개까지만 보여주자 & 마지막 장르는 . 제거
                                    return (<div key={Math.random()}>
                                                {getGenre[getGenre.findIndex((v) => v.id === genre)]?.name} 
                                                {i !== movie.genre_ids.length-1 && <span>&#183;</span>} 
                                            </div>)
                                } 
                            })
                        }
                    </Styled.PosterGenre>
                </Styled.OpacityBox>
            </Styled.Poster>
        )}

        {movieId && <Detail clickMovie={clickMovie} />}

        </Wrap>
    )
}

const Wrap = styled.div`
display: grid;
grid-template-columns: repeat(5, 267px);
justify-content: center;
width: 100%;
position: absolute;
top: 11%;
`


export default Search;