import styled from "styled-components";
import { useRef, useEffect, useState } from "react"
import { getGenre, getMovie, getPosterImg, Idata, IDetailresults, Iresults } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import IconAdult from "../Image/adult.png"
import IconTeenager from "../Image/teenager.png"
import IconLike from "../Image/즐겨찾기전.png"
import IconLiked from "../Image/즐겨찾기후.png"
import { deleteLocalStorage, deleteTVLocalStorage, saveLocalStorage, saveTVLocalStorage } from "../hooks/hook";
import { useRecoilState, useRecoilValue } from "recoil";
import { likeState  } from "../state/likeState";
import { likeTVState } from "../state/likeTVState";
import { getTV, IdetailTVresults, IresultsTV } from "../api/apiTv";

interface IModalTV {
    clickTV?: IresultsTV;
}

// 조금 더 캐싱해보자
function DetailTV ({clickTV: movie} : IModalTV) {

const { tvId } = useParams()
const navigate = useNavigate()
const {data, isLoading} = useQuery<IdetailTVresults>(["tv_detail", tvId], ()=>getTV(tvId))
console.log('data: ', data);

// local에 저장한 찜한 콘텐츠 체크
const [LikedArr, setLikeArr] = useRecoilState(likeTVState)
// console.log('LikedArr: ', LikedArr);

const addLike = (movie?:IresultsTV) => {
    if(movie){
    alert('내가 찜한 콘텐츠에 추가🎈');
    saveTVLocalStorage(movie);    // saveLocalStorage의 인자 type을 선택적으로 받게 수정해줘야됨! 
    setLikeArr([...LikedArr, movie])}
}
const deleteLike = (movie?:IresultsTV) => {
    alert('내가 찜한 콘텐츠에서 삭제🖐');
    deleteTVLocalStorage(movie);
    let copy = [...LikedArr]; // 불변성 조심하자(ts에 안걸리는)스프레드 연산자 깜빡해서 엄청 해맸네
    let index = LikedArr.findIndex((v)=> v.id === data?.id)
    copy.splice(index, 1)
    setLikeArr(copy)  
}


if(isLoading){
    return <>Loading</>
}

    return(
        <Wrap onClick={()=>{navigate('')}}>
            <Modal onClick={(e)=>e.stopPropagation()}>
                <MainImg bgImg={getPosterImg(data?.backdrop_path || "", "w500")}/>
                <Title>{movie ? movie?.name : data?.name}</Title>
                <FlexBox>
                    {/* <Release>{data?.first_air_date?.slice(0,4)}</Release> */}
                    <Adult bgImg={data?.adult ? IconAdult : IconTeenager} />
                    <Season>시즌 {data?.number_of_seasons}개 </Season>
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
color: #fff;
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
const Season = styled.div``
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
color: ${p=>p.theme.white.lighter};
`


export default DetailTV;