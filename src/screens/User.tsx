import { useState } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom"
import { users } from './../db';
import Follower from "./Follower";

function User(){

    const { userId } = useParams()
    const navigate = useNavigate()

    return(
        <div>
            <h2>{users[Number(userId)-1].name} 페이지입니다</h2>
            
            <button onClick={()=>{navigate('follower')}}>Follwer 보기</button>
            <Outlet context={{userName : users[Number(userId)-1].name}}/>
        </div>
    )
}

export default User;