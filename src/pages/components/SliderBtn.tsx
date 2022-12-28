import styled from "styled-components"

interface ISlderBtn{
    onclickPrev: ()=>void;
    onclickNext: ()=>void;
}

function SliderBtn ({onclickPrev, onclickNext}:ISlderBtn) {
    return(
        <>
        <ButtonAreaL>
            <ButtonL className="button" onClick={onclickPrev}>{"<"}</ButtonL>
        </ButtonAreaL>
        <ButtonAreaR>
            <ButtonR className="button" onClick={onclickNext}>{">"}</ButtonR>
        </ButtonAreaR>
        </>
    )
}

const ButtonAreaL = styled.div`
position: absolute;
top: 86.7%;
width: 50px;
height: 170px;
background-color: rgba(0,0,0,0.8);
display: flex;
justify-content: center;
opacity: 1;
`
const ButtonAreaR = styled(ButtonAreaL)`
right: 0;
`
const ButtonL = styled.span`
font-weight: 800;
font-size: 36px;
position: absolute;
z-index: 999;
top: 40%;
opacity: 1;
`
const ButtonR = styled(ButtonL)`
`

export default SliderBtn;