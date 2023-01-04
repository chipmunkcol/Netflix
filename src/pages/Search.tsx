import { useMatch, useNavigate, useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { getGenre, getPosterImg, Idata, Iresults } from "../api/api";
import IconAdult from "../Image/adult.png"
import IconTeenager from "../Image/teenager.png"
import IconLike from "../Image/즐겨찾기전.png"
import IconLiked from "../Image/즐겨찾기후.png"
import styled from "styled-components";
import * as Styled from "./components/Slider"
import Detail from "./Detail";
import { useRecoilValue } from "recoil";
import { likeState } from "../state/likeState";
import { useInView } from "react-intersection-observer";
import SearchLazyLoadImg from "./components/SearchLazyLoadImg";

const API_KEY = "a96ecb105f0214953ccc67ed2055f725"
const BASE_URL = "https://api.themoviedb.org/3"

const Search = () => {

const { search } = useParams()
const [data, setData] = useState<Iresults[]>([])
// console.log('data: ', data);

// 무한스크롤
const [ref, inView] = useInView()
const [lastPage, setLastPage] = useState(1)
const [loading, setLoading] = useState(false)
const [page, setPage] = useState(1)
console.log('page: ', page);

const getSearchData = useCallback(async () => {
    setLoading(true);
    const getData:Idata = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko&query=${search}&page=${page}`)
                        .then((res) => res.json())
    setData(prev => [...prev, ...getData.results])
    setTimeout(() => {
        setLoading(false); // settime 안주면 로딩시간이랑 api 불러오는 시간이 겹치는지 page가 2개씩 넘어감 
    }, 1000);
},[page])   // 무한스크롤 page가 변경되면 기존data에 추가하고

const getSearchData2 = useCallback(async() => { // 검색할때는 다시 data 초기화 해야됨
    setPage(1)
    const getData:Idata = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko&query=${search}&page=1`)
    .then((res) => res.json())
    setData(getData.results) 
    setLastPage(getData.total_pages)
    console.log(getData)
},[search]) // 원하는대로 작동은한다만 잘 한건지는 조금 의문이네

useEffect(()=>{
    getSearchData2()
},[getSearchData2])

useEffect(()=>{
    if(page !== 1) // 처음 컴포넌트 마운트시에 api 두번 호출 방지
    getSearchData()
},[getSearchData])

useEffect(()=>{
    if(inView && !loading && page < lastPage ) {   // 사용자가 마지막을 보고있고 & 로딩중이 아니면 다음페이지! 
        setPage(prev => prev + 1)
    }
},[inView, loading])

const [clickMovie, setClickMovie] = useState<Iresults>()
const clickPosterImg = getPosterImg(clickMovie?.backdrop_path || "") 

const movieId = useMatch('search/:search/:movieId')
const navigate = useNavigate()
const openModal = (movieId:number) => {
    navigate(`${movieId}`)
}

const likedArr = useRecoilValue(likeState)

// if(isLoading) {
//     return <>Loading</>
// }
    return(
        <Wrap> 
        {data?.map(movie => 
            <Styled.Poster style={{marginTop:"50px"}}>
                <SearchLazyLoadImg 
                backdrop_path={movie.backdrop_path}
                openModal={openModal}
                setClickMovie={setClickMovie}
                movieId={movie.id}
                movie={movie}
                />
                <Styled.PosterTitle>{movie.title}</Styled.PosterTitle>
                
                <Styled.OpacityBox>
                    <Styled.FlexBox>
                        <Styled.PosterAdult bgImg={movie.adult ? IconAdult : IconTeenager} />
                        <Styled.PosterVote>평점 {movie.vote_average}점</Styled.PosterVote>
                        <Styled.Like IconLike={likedArr.findIndex((v)=>v.id === movie.id) === -1 ? IconLike : IconLiked} />
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

        <InfinityScroll ref={ref}></InfinityScroll> 

        {movieId && <Detail clickMovie={clickMovie} clickPosterImg={clickPosterImg}/>}

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

const InfinityScroll = styled.div`

`


export default Search;