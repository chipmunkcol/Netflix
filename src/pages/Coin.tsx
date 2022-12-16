import {Outlet, useLocation, useMatch, useNavigate} from 'react-router'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCoinData, fetchCoinPrice } from '../api/api';

function Coin(){

interface IcoinPrice {
    id:string;
    name:string;
    symbol:string;
    rank:number;
    circulating_supply:number;
    total_supply:number;
    max_supply:number;
    beta_value:number;
    first_data_at:string;
    last_updated:string;
    quotes: {
        USD: {
            price:number;
            volume_24h:number;
            volume_24h_change_24h:number;
            market_cap:number;
            market_cap_change_24h:number;
            percent_change_15m:number;
            percent_change_30m:number;
            percent_change_1h:number;
            percent_change_6h:number;
            percent_change_12h:number;
            percent_change_24h:number;
            percent_change_7d:number;
            percent_change_30d:number;
            percent_change_1y:number;
            ath_price:number;
            ath_date:string;
            percent_from_price_ath:number;
        }
    }
}

interface IcoinData {
    id:string;
    name:string;
    symbol:string;
    rank:number;
    is_new:boolean;
    is_active:boolean;
    type:string;
    logo:string;
    description:string;
    message:string;
    open_source:boolean;
    started_at:string;
    development_status:string;
    hardware_wallet:boolean;
    proof_type:string;
    org_structure:string;
    hash_algorithm:string;
    first_data_at:string;
    last_data_at:string;
}

const { state } = useLocation()
const coin = state;

const { coinId } = useParams()

const { data : coinData } = useQuery<IcoinData>([coinId, "data"], () => fetchCoinData(coinId))
const { data : coinPrice } = useQuery<IcoinPrice>([coinId, "price"], () => fetchCoinPrice(coinId))


const navigate = useNavigate()
const ChartMatch = useMatch('/:coinId/chart')
const PriceMatch = useMatch('/:coidId/price')

    return(
    <Wrap>
        <Title>{coinData?.name}</Title>
        <HeaderBox>
            <Rank>
                <h1>Rank</h1>
                <p>{coinData?.rank}</p>
            </Rank>
            <Symbol>
                <h1>Symbol</h1>
                <p>{coinData?.symbol}</p>
            </Symbol>
            <OpenSource>
                <h1>OpenSource</h1>
                <p>{String(coinData?.open_source)}</p>
                </OpenSource>
        </HeaderBox>
        <Desc>{coinData?.description}</Desc>
        <ContentBox>
            <TotalSupply>
                <h1>TotalSupply :</h1>
                <p>{coinPrice?.total_supply?.toLocaleString()}</p>  
            </TotalSupply>
            <MaxSupply>
                <h1>MaxSupply :</h1>
                <p>{coinPrice?.max_supply?.toLocaleString()}</p>
            </MaxSupply>
        </ContentBox>

        <BtnBox>
            <ChartBtn 
                onClick={()=>{navigate('chart')}}
                isActive={ChartMatch !== null}>
                CHART
            </ChartBtn>
            <PriceBtn 
                onClick={()=>{navigate('price')}}
                isActive={PriceMatch !== null}>PRICE</PriceBtn>
        </BtnBox>
        
        <Outlet context={coinId}/>
        
    </Wrap>
    )
}
export default Coin;

const Wrap = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
`
const Title = styled.div`
    color: ${props => props.theme.eColor};
    font-size: 3rem;
`
const HeaderBox = styled.div`
    width: 27rem;
    height: 3rem;
    margin: 1rem 0 0 0;
    display: flex;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 0.5rem;

    background-color: ${props => props.theme.iBgColor};
    /* color: ${props => props.theme.iTextColor}; */
`
    const Rank = styled.div`
    width: 9rem;
    height: 100%;
    h1 {
        margin-top: 0.3rem;
    }
    p {
        font-size: 0.8rem;
        margin-top: 0.3rem;
    }
    `
    const Symbol = styled(Rank)``
    const OpenSource =styled(Rank)``

const Desc = styled.div`
    width: 27rem;
    margin-top: 1rem;
    font-size: 1rem;
`
const ContentBox = styled.div`
    width: 27rem;
    height: 3rem;
    margin: 1rem 0 0 0;
    display: flex;
    border-radius: 0.5rem;

    background-color: ${props => props.theme.iBgColor};
`
    const TotalSupply = styled.div`
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        h1{
            margin: 0 0 0 1rem;
            font-weight: 600;
        }
        p{
            margin: 0 0 0 1rem;
            font-size: 0.9rem;
        }
    `
    const MaxSupply = styled(TotalSupply)``

const BtnBox = styled.div`
    width: 27rem;
    margin-top: 1rem;

    display: flex;
    justify-content: space-between;
`
    const ChartBtn = styled.div<{isActive : boolean}>`
        width: 45%;
        height: 1.5rem;
        border-radius: 0.3rem;
        align-items: center;
        display: flex;
        justify-content: center; 
        cursor: pointer;

        background-color: ${props => props.theme.iBgColor};
        color: ${props => props.isActive ? props.theme.eColor : props.theme.textColor};
    `
    const PriceBtn = styled(ChartBtn)``