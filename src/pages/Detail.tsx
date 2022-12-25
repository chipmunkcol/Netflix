import styled from "styled-components";
import { Idata, Iresults } from "../api/api";type onclickModal = () => {}

type typeModal = {
    onclickModal: (e: React.MouseEvent<HTMLElement>) => void
}

function Detail({onclickModal} :typeModal){

    return(
        <Wrap onClick={onclickModal}>
            <Modal>
                {/* {movie[0].title} */}
            </Modal>
        </Wrap>
    )
}

const Wrap = styled.div`
width: 100%;
height: 200vh;
position: absolute;
z-index: 3;
top: 0;
margin: 0 auto;
display: flex;
justify-content: center;
background-color: rgba(0,0,0, 0.7);
`
const Modal = styled.div`
width: 850px;
height: 200vh;
position: relative;
top: 10%;
background-color: tomato;
`

export default Detail;