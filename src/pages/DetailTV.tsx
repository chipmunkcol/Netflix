import styled from "styled-components";
import * as Styled from "./Detail"
import { getMovie, getPosterImg, Idata, IDetailresults, Iresults } from "../api/api";
import { genresTV } from "../api/apiTv";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import IconAdult from "../Image/adult.png"
import IconTeenager from "../Image/teenager.png"
import IconLike from "../Image/즐겨찾기전.png"
import IconLiked from "../Image/즐겨찾기후.png"
import { deleteTVLocalStorage, saveTVLocalStorage } from "../hooks/hook";
import { useRecoilState, } from "recoil";
import { likeTVState } from "../state/likeTVState";
import { getTV, IdetailTVresults, IresultsTV } from "../api/apiTv";
import { useEffect, useState } from "react";

interface IModalTV {
    clickTV?: IresultsTV;
    clickPosterImg?: string;
}

// 조금 더 캐싱해보자
function DetailTV ({clickTV: movie, clickPosterImg} : IModalTV) {
const { tvId } = useParams()
const navigate = useNavigate()
const {data, isLoading} = useQuery<IdetailTVresults>(["tv_detail", tvId], ()=>getTV(tvId))
// console.log('data: ', data);
console.log(movie)

const [getPost, setGetPost] = useState(clickPosterImg || "")
const [check, setCheck] = useState(false)
console.log('getPost: ', getPost);
useEffect(()=>{
    if(!movie) { 
        setTimeout(() => {
            setGetPost(getPosterImg(data?.backdrop_path || "")); setCheck(true) 
        }, 1000);
    } // url로 바로 들어오는거 대응
},[check])

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
        <Styled.Wrap onClick={()=>{navigate('')}}>
            <Styled.Modal onClick={(e)=>e.stopPropagation()}>
                <Styled.MainImg bgImg={getPost ? getPost : getPosterImg(data?.backdrop_path || "", "w500")}/>
                <Styled.Title>{movie ? movie?.name : data?.name}</Styled.Title>
                <Styled.FlexBox>
                    {/* <Release>{data?.first_air_date?.slice(0,4)}</Release> */}
                    <Styled.Adult bgImg={data?.adult ? IconAdult : IconTeenager} />
                    <Season>시즌 {data?.number_of_seasons}개 </Season>
                {/* 즐겨찾기 여부 확인 */}
                    { LikedArr.findIndex((v)=> v.id === data?.id) === -1 ? 
                    (<Styled.Like 
                    IconLike={IconLike} onClick={()=>{addLike(movie)}}/>) :
                    (<Styled.Like 
                    IconLike={IconLiked} onClick={()=>{deleteLike(movie)}}/>)
                    }

                </Styled.FlexBox>
                <Styled.FlexBox2>
                    {data?.genres.map((genre, i) => {
                            if(genresTV.findIndex((v) => v.id === genre.id) && i < 3){
                                return (<div key={Math.random()}>
                                            {genresTV[genresTV.findIndex((v) => v.id === genre.id)]?.name} 
                                            {(i !== data?.genres.length-1 && i !== 2) && <span>&#183;</span>}
                                        </div>)
                            } 
                        })
                    }
                </Styled.FlexBox2>
                <Styled.Overlay>{data?.overview}</Styled.Overlay>
            </Styled.Modal>
        </Styled.Wrap>
    )
}

const Season = styled.div``


export default DetailTV;