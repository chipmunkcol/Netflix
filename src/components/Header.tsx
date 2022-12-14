import {useNavigate} from "react-router-dom"

function Header(){

const navigate = useNavigate()


    return(
       <div>
        <ul>
            <li onClick={()=>{navigate('/')}}>Home</li>
            <li onClick={()=>{navigate('/about')}}>About</li>
        </ul>



       </div>
    )
}

export default Header;