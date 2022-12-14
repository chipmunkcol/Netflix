import {useLocation} from 'react-router'
import { useParams } from 'react-router-dom';

function Coin(){

    const { state } = useLocation()
    const params = useParams().coinId
    const coin = state[Number(params)-1]
    console.log('coin: ', coin);

    return(
        <>
        {coin.name}
        </>
    )
}
export default Coin;