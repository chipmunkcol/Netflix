
export function fetchCoins(){
    return fetch('https://api.coinpaprika.com/v1/coins')
            .then((res)=> res.json())
}

export function fetchCoinData(coinId? :string){
    return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            .then((res)=>res.json())
}

export function fetchCoinPrice(coinId? :string){
    return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            .then((res)=>res.json())
}

export function fetchCoinDailyPrice(coinId? :string){
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
            .then((res)=>res.json())
}