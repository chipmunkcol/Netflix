import styled from "styled-components"

function Loading(){
    return (
    <Conatiner>
        <p>Loading</p>
    </Conatiner>
    )
}

export default Loading;

const Conatiner = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.theme.bgColor};
    p{
        color: ${props => props.theme.eColor};
        font-size: 2rem;
    }
`