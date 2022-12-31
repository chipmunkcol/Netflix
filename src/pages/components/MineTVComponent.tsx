import * as Styled from "../components/Slider"
import { useNavigate } from "react-router-dom";
import { getGenre, getPosterImg } from "../../api/api";
import IconLiked from "../../Image/즐겨찾기후.png"
import { IresultsTV } from "../../api/apiTv";

interface IMineComponent {
    movie: IresultsTV;
    setClickMovie: React.Dispatch<React.SetStateAction<IresultsTV | undefined>>
}
function MineTVComponent({movie, setClickMovie} : IMineComponent){

const navigate = useNavigate()
const openModal = (movieId:number) => {
    navigate(`tv/${movieId}`)
}


    return(
        <Styled.Poster key={movie.id} style={{marginTop:"16px"}}>
            <Styled.PosterImg 
            bgImage={getPosterImg(movie.backdrop_path || "", "w500")} 
            onClick={()=>{openModal(movie.id); setClickMovie(movie);}}
            />
            <Styled.PosterTitle>{movie.name}</Styled.PosterTitle>
            
            <Styled.OpacityBox>
                <Styled.FlexBox>
                    <Styled.PosterVote>평점 {movie.vote_average}점</Styled.PosterVote>
                    <Styled.Like IconLike={IconLiked} />
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
    )
}

export default MineTVComponent;