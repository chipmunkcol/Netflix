import styled from "styled-components";
import { useRef, useEffect } from "react"
import { Idata, Iresults } from "../api/api";

export interface IModal {
    clickMovie: Iresults | undefined;
    onclickModal: () => void;
}

const Detail: React.FunctionComponent<IModal> = ({clickMovie, onclickModal}) => {

console.log(clickMovie)
    return(
        <Wrap onClick={onclickModal}>
            <Modal onClick={(e)=>e.stopPropagation()}>
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
height: 80vh;
top: 10%;
position: fixed;
background-color: whitesmoke;
`

export default Detail;