import styled from "styled-components";
import { useRef, useEffect, useState } from "react"
import { getGenre, getMovie, getPosterImg, Idata, IDetailresults, Iresults } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import IconAdult from "../Image/adult.png"
import IconTeenager from "../Image/teenager.png"

export interface IModal {
    clickMovie?: Iresults;
}


// 조금 더 캐싱해보자
const Detail: React.FunctionComponent<IModal> = ({clickMovie: movie}) => {
// console.log('movie: ', movie);

const { movieId } = useParams()
const navigate = useNavigate()
const {data, isLoading} = useQuery<IDetailresults>(["movie_detail", movieId], ()=>getMovie(movieId))
//useQuery 이름 지어주는거 매우 중요 ["movie_detail", movieId] movieId로 개별 지정 안해주면 전에꺼 캐싱해옴
console.log('data: ', data);

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

// console.log(movie)
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
const Runtime = styled.div`
`
const Release = styled.div``
const Overlay = styled.div`
width: 92%;
display: flex;
justify-content: center;
margin: 16px auto 0 auto;
`


export default Detail;