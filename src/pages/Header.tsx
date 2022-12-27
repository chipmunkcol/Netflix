import { useEffect, useState } from "react";
import styled from "styled-components";

function Header(){

// 스크롤 시 헤더 색 변경
const [scrollY, setScrollY] = useState(0)
// console.log('scrollY: ', scrollY);

const listenScroll = () => {
    if(window.scrollY < 300) {setScrollY(window.scrollY)}
}
useEffect(()=>{
    window.addEventListener("scroll", listenScroll)
},[scrollY])

    return(
        <Wrap scrollY={scrollY}>
            <Logo src='https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg'/>
            <Nav>
                <li>홈</li>
                <li>영화</li>
                <li>내가 찜한 콘텐츠</li>
            </Nav>
            <Toolbar>
                <Search />
                <Profile />
            </Toolbar>
        </Wrap>
    )
}

const Wrap = styled.div<{scrollY:number}>`
display: flex;
position: fixed;
z-index: 999;
width: 100%;
height: 68px;
/* background-color: rgba(0, 0, 0, 0.5); */
background-color: ${props => props.scrollY > 180 ? props.theme.black.darker : "transparent"};
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
    &:hover{
        color: ${props=>props.theme.white.darker};
    }
}
`
const Toolbar = styled.div`
width: 300px;
display: flex;
align-items: center;
justify-content: flex-end;
position: absolute;
right: 6%;
top: 20px;
`
const Search = styled.input`
width: 180px;
height: 18px;
margin-right: 15px;
`
const Profile = styled.div`
width: 30px;
height: 30px;
border-radius: 50px;
background: linear-gradient(180deg, blue, #7a7ada);
`

export default Header;