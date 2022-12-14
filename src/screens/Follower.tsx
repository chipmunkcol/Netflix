import { Outlet, useOutletContext } from 'react-router-dom';

function Follower(){

    interface UserNameType { // 원시타입이 아니라면 type 보다 interface를 애용하자 확장성등에서 이점이 있고 프로젝트마다 통일할 텐데 요즘 더 많이 쓰는 추세
        userName:string
    }
    const { userName } = useOutletContext<UserNameType>()
    console.log(userName)

    return<h1>
        {userName}님의 Follower 보여주기
    </h1>
}
export default Follower;