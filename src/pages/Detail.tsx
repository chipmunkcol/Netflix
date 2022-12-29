import styled from "styled-components";
import { useRef, useEffect, useState } from "react"
import { getGenre, getMovie, getPosterImg, Idata, IDetailresults, Iresults } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import IconAdult from "../Image/adult.png"
import IconTeenager from "../Image/teenager.png"
import IconLike from "../Image/즐겨찾기전.png"
import IconLiked from "../Image/즐겨찾기후.png"
import { deleteLocalStorage, saveLocalStorage } from "../hooks/hook";
import { useRecoilState, useRecoilValue } from "recoil";
import { likeState } from "../state/likeState";

export interface IModal {
    clickMovie?: Iresults;
}

// 조금 더 캐싱해보자
function Detail ({clickMovie: movie} : IModal) {
// console.log('movie: ', movie);

const { movieId } = useParams()
const navigate = useNavigate()
const {data, isLoading} = useQuery<IDetailresults>(["movie_detail", movieId], ()=>getMovie(movieId))
//useQuery 이름 지어주는거 매우 중요 ["movie_detail", movieId] movieId로 개별 지정 안해주면 전에꺼 캐싱해옴

const [getPost, setGetPost] = useState(getPosterImg(movie?.backdrop_path || "", "w500"))
const [check, setCheck] = useState(false)
function getPostOriginal (){
    const Caching = getPosterImg(movie?.backdrop_path || "") //고화질 이미지 불러오는 동안 기존 사진 보여주자
    setTimeout(() => {
        setGetPost(Caching)
    }, 1000);
}

useEffect(()=>{
    if(movie) { 
        getPostOriginal() 
    } else { 
        setTimeout(() => {
            setGetPost(getPosterImg(data?.backdrop_path || "")); setCheck(true) 
        }, 1000);
    } // url로 바로 들어오는거 대응
},[check])

// local에 저장한 찜한 콘텐츠 체크
const [LikedArr, setLikeArr] = useRecoilState(likeState)
const addLike = (movie?:Iresults) => {
    alert('내가 찜한 콘텐츠에 추가🎈');
    saveLocalStorage(movie);
    if(movie)
    setLikeArr([...LikedArr, movie])
}
const deleteLike = (movie?:Iresults) => {
    alert('내가 찜한 콘텐츠에서 삭제🖐');
    deleteLocalStorage(movie);
    let copy = [...LikedArr]; // 불변성 조심하자(ts에 안걸리는)스프레드 연산자 깜빡해서 엄청 해맸네
    let index = LikedArr.findIndex((v)=> v.id === data?.id)
    copy.splice(index, 1)
    setLikeArr(copy)  
}


    return(
        <Wrap onClick={()=>{navigate('')}}>
            <Modal onClick={(e)=>e.stopPropagation()}>
                <MainImg bgImg={getPost}/>
                <Title>{movie ? movie?.title : data?.title}</Title>
                <FlexBox>
                    <Release>{data?.release_date.slice(0,4)}</Release>
                    <Adult bgImg={data?.adult ? IconAdult : IconTeenager} />
                    {data?.runtime && 
                        <Runtime>
                            {Math.trunc(data?.runtime / 60)}시간
                            { data?.runtime - Math.trunc(data?.runtime / 60)*60}분
                        </Runtime>}
                {/* 즐겨찾기 여부 확인 */}
                    { LikedArr.findIndex((v)=> v.id === data?.id) === -1 ? 
                    (<Like 
                    IconLike={IconLike} onClick={()=>{addLike(movie)}}/>) :
                    (<Like 
                    IconLike={IconLiked} onClick={()=>{deleteLike(movie)}}/>)
                    }

                </FlexBox>
                <FlexBox2>
                    {data?.genres.map((genre, i) => {
                            if(getGenre.findIndex((v) => v.id === genre.id) && i < 3){
                                return (<div key={Math.random()}>
                                            {getGenre[getGenre.findIndex((v) => v.id === genre.id)]?.name} 
                                            {i !== data?.genres.length-1 && <span>&#183;</span>}
                                        </div>)
                            } 
                        })
                    }
                </FlexBox2>
                <Overlay>{data?.overview}</Overlay>
            </Modal>
        </Wrap>
    )
}

const Wrap = styled.div`
width: 100%;
height: 200vh;
position: absolute;
z-index: 10;
top: 0;
margin: 0 auto;
display: flex;
justify-content: center;
background-color: rgba(0,0,0, 0.7);
`
const Modal = styled.div`
width: 850px;
height: 80vh;
top: 10%;
position: fixed;
background-color: ${props=>props.theme.black.lighter};
border-radius: 10px;
`
const MainImg =styled.div<{bgImg : string}>`
background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)),
                    url(${props=>props.bgImg});
background-position: center;
background-size: cover;
width: 100%;
height: 60vh;
`
const Title = styled.div`
position: absolute;
top: 46%;
left: 60px;
font-size: 38px;
`
const FlexBox = styled.div`
display: flex;
position: absolute;
top: 56%;
margin: 10px 0 0 60px;
`
const FlexBox2 = styled(FlexBox)`
top: 61%;
span {
    margin: 0 5px 0 5px;
}
`
const Adult = styled.div<{ bgImg:string }>`
margin: 0 20px 0 10px;
background-image: url(${props=>props.bgImg});
background-position: center;
background-size: cover;
width: 20px;
height: 20px;
`
const Like = styled.div<{IconLike:string}>`
background-image: url(${props=>props.IconLike});
background-position: center;
background-size: cover;
width: 30px;
height: 30px;
margin: -8px 0 0 8px;
cursor: pointer;
`
const Runtime = styled.div`
`
const Release = styled.div``
const Overlay = styled.div`
width: 92%;
height: 112px;
overflow: hidden;
display: flex;
justify-content: center;
margin: 16px auto 0 auto;
`


export default Detail;