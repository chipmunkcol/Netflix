import { useEffect, useMemo, useState } from "react";
import { Navigate, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import IconSearch from "../Image/search.png"
import { throttle } from 'lodash'

function Header(){

// 스크롤 시 헤더 색 변경
const [scrollY, setScrollY] = useState(false)

const listenScroll = useMemo(() =>      // 스크롤 이벤트 렌더링 진짜 최적화마렵다.. throttle 써도 빡침
    throttle(() => {
    if(window.scrollY > 100 && scrollY === false) {
        setScrollY(true)
    } else if(window.scrollY <= 100 && scrollY === true) {
        setScrollY(false)
    }
},300), [scrollY])

useEffect(()=>{
    window.addEventListener("scroll", listenScroll)
    return () => {
        window.removeEventListener("scroll", listenScroll)
    }
},[listenScroll])

// Nav 클릭 시 이동 & 애니메이션 구현
const navigate = useNavigate()

const HomePage = useMatch('')
const HomeDetailPage = useMatch('movie/:movieId')
const TVPage = useMatch('tv')
const TVDetailPage = useMatch('tv/:tvId')
// search 아이콘 클릭 시 input 애니메이션 
const [clickInput, setClickInput] = useState(false)

// 검색 시 query를 navi로 보냄
const [search, setSearch] = useState("")
useEffect(()=>{
    if(search) {
        navigate(`search/${search}`)
    }
},[search])

    return(
        <Wrap scrollY={scrollY}>
            <Logo src='https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg'/>
            <Nav>
                <Home onClick={()=>{navigate('')}}> 홈 </Home>
                <TV onClick={()=>{navigate('tv')}}> TV </TV>
                <Mine onClick={()=>{navigate('mine')}}> 내가 찜한 콘텐츠 </Mine>
                <Circle circleX={HomePage || HomeDetailPage ? 166 : TVPage || TVDetailPage ? 214 : 315 }/>
            </Nav>
                <SearchIcon Icon={IconSearch} onClick={()=>{setClickInput(prev=>!prev)}}/>
                <SearchInput clickInput={clickInput} onChange={(e)=>{setSearch(e.target.value)}}/>
                <Profile />
        </Wrap>
    )
}

const Wrap = styled.div<{scrollY: boolean}>`
display: flex;
position: fixed;
z-index: 999;
width: 100%;
height: 68px;
/* background-color: rgba(0, 0, 0, 0.5); */
background-color: ${props => props.scrollY ? props.theme.black.darker : "transparent"};
transition: background-color 1s;
`
const Logo = styled.img`
width: 100px;
margin-left: 20px;
margin-right: 40px;
`
const Nav = styled.ul`
display: flex;
align-items: center;
width: 500px;
font-size: 16px;
li{
    margin-right: 30px;
    cursor: pointer;
    &:hover{
        color: ${props=>props.theme.white.darker};
    }
}
`
const Home = styled.li`
`
const Circle = styled.span<{circleX:number}>`
width: 5px;
height: 5px;
border-radius: 3px;
background-color: ${props=>props.theme.red};
opacity: ${props=>props.circleX === 168 ? "0" : "1"};
position: fixed;
top: 50px;
left: ${props=>props.circleX}px;
transition: left 0.5s;
`
const TV = styled.li``
const Mine = styled.li``


const SearchInput = styled.input<{clickInput:boolean}>`
position: absolute;
right: 142px;
top: 21px;
width: ${props=>props.clickInput ? "180px" : "20px"};
opacity: ${props=>props.clickInput ? "1" : "0"};
transition: width 0.5s;
height: 30px;
background-color: transparent;
color: ${p=>p.theme.white.lighter};
border: 1px solid ${p=>p.theme.white.darker};
`
const SearchIcon = styled.div<{Icon:string}>`
z-index: 3;
position: absolute;
right: 153px;
top: 26px;
width: 25px;
height: 25px;
background-image: url(${props=>props.Icon});
background-position: center;
background-size: cover;
cursor: pointer;
`
const Profile = styled.div`
position: absolute;
right: 100px;
top: 20px;
width: 30px;
height: 30px;
border-radius: 50px;
background: linear-gradient(180deg, blue, #7a7ada);
`

export default Header;