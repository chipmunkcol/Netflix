import styled from "styled-components";
import { useRef, useEffect, useState } from "react"
import { getMovie, getPosterImg, Idata, Iresults } from "../api/api";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import IconAdult from "../Image/adult.png"
import IconTeenager from "../Image/teenager.png"

export interface IModal {
    clickMovie?: Iresults;
    closeModal?: () => void;
}

const Detail: React.FunctionComponent<IModal> = ({clickMovie: movie, closeModal}) => {

const { movieId } = useParams()
console.log('movieId: ', movieId);

const {data, isLoading} = useQuery(["movie_detail"], ()=>getMovie(movieId))
console.log('data: ', data);

const [getPost, setGetPost] = useState(getPosterImg(movie?.backdrop_path || "", "w500"))

async function getPostOriginal (){
    const a = getPosterImg(movie?.backdrop_path || "")
    setTimeout(() => {
        setGetPost(a)
    }, 1000);
}
useEffect(()=>{
    getPostOriginal()
},[])

// console.log(movie)
    return(
        <Wrap onClick={closeModal}>
            <Modal onClick={(e)=>e.stopPropagation()}>
                <MainImg bgImg={getPost}/>
                <Title>{movie?.title}</Title>
                <FlexBox>
                    <Release>{movie?.release_date.slice(0,4)}</Release>
                    <Adult bgImg={movie?.adult ? IconAdult : IconTeenager} />
                </FlexBox>
                
                <Overlay>{movie?.overview}</Overlay>
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
position: relative;
top: -50px;
left: 10px;
font-size: 38px;
`
const FlexBox = styled.div`
display: flex;
`
const Adult = styled.div<{ bgImg:string }>`
margin: 0 20px 0 10px;
background-image: url(${props=>props.bgImg});
background-position: center;
background-size: cover;
width: 20px;
height: 20px;
`
const Release = styled.div``
const Overlay = styled.div``


export default Detail;