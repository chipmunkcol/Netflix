import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query"
import { fetchCoins } from "../api/api";
import { recoilDarkMode } from "../states/recoilTheme";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Loading from "./Loading";

function Coins(){

const navigate = useNavigate()

interface CoinsType {
        id: string,
        name: string,
        symbol: string,
        rank: number,
        is_new: boolean,
        is_active: boolean,
        type: string
    }

const { data , isLoading } = useQuery<CoinsType[]>(["allCoins"], fetchCoins, {notifyOnChangeProps:['data']})
console.log(isLoading);

const isDark = useRecoilValue(recoilDarkMode)
const setIsDark = useSetRecoilState(recoilDarkMode)
const toggleDarkMode = () => { setIsDark(prev => !prev) } 

// if(isLoading){
//   return <Loading />
// }
if(!data){
    return <div>error</div>
} 
    return(
        <Wrap>
            <Title>Coins
                <Button 
                isDark={isDark}
                onClick={toggleDarkMode}
                >Dark Mode</Button>
            </Title>
            <Container>
                {data?.splice(0,100).map(coin=> 
                <Coin onClick={()=>{navigate(`${coin.id}`,{state: coin})}} key={coin.id}>
                    <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                    {coin.name} &rarr;
                </Coin>)}
            </Container>
        </Wrap>
    )
}
export default Coins;

const Wrap = styled.div`
    width: 100vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
`
const Title = styled.div`
    margin: 3rem 0 0 0;
    font-size: 2rem;
    color: ${props => props.theme.eColor}
`

const Button = styled.button<{isDark:boolean}>`
border: none;
border-radius: 0.3rem;

color: ${props => props.isDark ? "#2c3e50" : "white"};
background-color: ${props => props.isDark ? "white" :"#2c3e50"};
`

const Container = styled.div`

`

const Coin = styled.div`
    width: 16rem;
    height: 3rem;
    margin: 1rem 0 0 0;
    border-radius: 0.3rem;
    display: flex;
    align-items: center;

    background-color: ${props => props.theme.textColor};
    color: ${props => props.theme.iTextColor};
    &:hover{
        color: ${props=>props.theme.eColor}
    }
    cursor: pointer;
`

const Img = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    margin: 0 0.5rem;
`