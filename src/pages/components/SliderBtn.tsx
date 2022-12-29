import styled from "styled-components"

interface ISlderBtn{
    onclickPrev: ()=>void;
    onclickNext: ()=>void;
}

function SliderBtn ({onclickPrev, onclickNext}:ISlderBtn) {
    return(
        <>
        <ButtonAreaL onClick={onclickPrev}>
            <ButtonL className="button" >{"<"}</ButtonL>
        </ButtonAreaL>
        <ButtonAreaR onClick={onclickNext}>
            <ButtonR className="button" >{">"}</ButtonR>
        </ButtonAreaR>
        </>
    )
}

const ButtonAreaL = styled.li`
position: absolute;
top: 0%;
width: 50px;
height: 170px;
background-color: rgba(0,0,0,0.8);
display: flex;
justify-content: center;
opacity: 0;
cursor: pointer;
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