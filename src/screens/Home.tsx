import { users } from './../db';
import { useNavigate } from 'react-router-dom';

function Home(){

    const navigate = useNavigate()

    return(
    <div>
        <h1>UserPage</h1>
        
        {
            users.map((v)=>
                    <button onClick={()=>{navigate(`/users/${v.id}`)}}>userPage: {v.name}</button>
            )
        }
        
    </div>
    )
}
export default Home;